#!/usr/bin/env bash
# Deploy puxa-chat Lambda and HTTP API routes (API Gateway v2).
# Usage: ./deploy.sh <GROQ_API_KEY> [LAMBDA_EXECUTION_ROLE_ARN]
# On first create, pass an IAM role ARN (or set LAMBDA_ROLE_ARN) with AWSLambdaBasicExecutionRole.

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

REGION="${AWS_REGION:-eu-west-1}"
FUNCTION_NAME="puxa-chat"
API_ID="8u1htcpsr1"
ZIP_FILE="${SCRIPT_DIR}/function.zip"

if [ -z "${1:-}" ]; then
  echo "Usage: $0 <GROQ_API_KEY> [LAMBDA_EXECUTION_ROLE_ARN]" >&2
  echo "  LAMBDA_ROLE_ARN can be set instead of the second argument (required on first create)." >&2
  exit 1
fi

GROQ_API_KEY="$1"
export GROQ_API_KEY
LAMBDA_ROLE_ARN="${LAMBDA_ROLE_ARN:-${2:-}}"

write_env_file() {
  local path="$1"
  python3 -c "import json, os; print(json.dumps({'Variables': {'GROQ_API_KEY': os.environ['GROQ_API_KEY']}}))" >"$path"
}

zip_function() {
  rm -f "$ZIP_FILE"
  zip -j "$ZIP_FILE" index.mjs
}

ACCOUNT_ID="$(aws sts get-caller-identity --query Account --output text)"
LAMBDA_ARN="arn:aws:lambda:${REGION}:${ACCOUNT_ID}:function:${FUNCTION_NAME}"

ENV_TMP="$(mktemp)"
trap 'rm -f "$ENV_TMP"' EXIT
write_env_file "$ENV_TMP"

if aws lambda get-function --function-name "$FUNCTION_NAME" --region "$REGION" &>/dev/null; then
  echo "Updating existing function: $FUNCTION_NAME"
  zip_function
  aws lambda update-function-code \
    --function-name "$FUNCTION_NAME" \
    --zip-file "fileb://${ZIP_FILE}" \
    --region "$REGION"
  aws lambda wait function-updated --function-name "$FUNCTION_NAME" --region "$REGION"
  aws lambda update-function-configuration \
    --function-name "$FUNCTION_NAME" \
    --timeout 30 \
    --memory-size 256 \
    --environment "file://${ENV_TMP}" \
    --region "$REGION"
else
  if [ -z "$LAMBDA_ROLE_ARN" ]; then
    echo "Error: function does not exist. Provide LAMBDA_EXECUTION_ROLE_ARN as second argument or set LAMBDA_ROLE_ARN." >&2
    exit 1
  fi
  echo "Creating function: $FUNCTION_NAME"
  zip_function
  aws lambda create-function \
    --function-name "$FUNCTION_NAME" \
    --runtime nodejs20.x \
    --role "$LAMBDA_ROLE_ARN" \
    --handler index.handler \
    --zip-file "fileb://${ZIP_FILE}" \
    --timeout 30 \
    --memory-size 256 \
    --environment "file://${ENV_TMP}" \
    --region "$REGION"
fi

echo "Ensuring API Gateway can invoke Lambda..."
set +e
ADD_PERM_ERR="$(aws lambda add-permission \
  --function-name "$FUNCTION_NAME" \
  --statement-id "apigateway-${API_ID}-invoke" \
  --action lambda:InvokeFunction \
  --principal apigateway.amazonaws.com \
  --source-arn "arn:aws:execute-api:${REGION}:${ACCOUNT_ID}:${API_ID}/*/*/*" \
  --region "$REGION" 2>&1)"
ADD_PERM_RC=$?
set -e
if [ "$ADD_PERM_RC" -ne 0 ]; then
  if echo "$ADD_PERM_ERR" | grep -q 'ResourceConflictException'; then
    echo "Lambda permission already present."
  else
    echo "$ADD_PERM_ERR" >&2
    exit 1
  fi
fi

INTEGRATION_ID="$(aws apigatewayv2 get-integrations \
  --api-id "$API_ID" \
  --region "$REGION" \
  --query "Items[?IntegrationUri==\`${LAMBDA_ARN}\`].IntegrationId | [0]" \
  --output text)"

if [ -z "$INTEGRATION_ID" ] || [ "$INTEGRATION_ID" = "None" ]; then
  echo "Creating API integration for $FUNCTION_NAME..."
  INTEGRATION_ID="$(aws apigatewayv2 create-integration \
    --api-id "$API_ID" \
    --integration-type AWS_PROXY \
    --integration-uri "$LAMBDA_ARN" \
    --payload-format-version 2.0 \
    --region "$REGION" \
    --query IntegrationId \
    --output text)"
fi

ensure_route() {
  local route_key="$1"
  local existing
  existing="$(aws apigatewayv2 get-routes \
    --api-id "$API_ID" \
    --region "$REGION" \
    --query "Items[?RouteKey==\`${route_key}\`].RouteId | [0]" \
    --output text)"
  if [ -n "$existing" ] && [ "$existing" != "None" ]; then
    echo "Route already exists: $route_key"
    return 0
  fi
  echo "Creating route: $route_key"
  aws apigatewayv2 create-route \
    --api-id "$API_ID" \
    --route-key "$route_key" \
    --target "integrations/${INTEGRATION_ID}" \
    --region "$REGION"
}

ensure_route "POST /chat"
ensure_route "OPTIONS /chat"

echo "Done. Lambda: $LAMBDA_ARN"
