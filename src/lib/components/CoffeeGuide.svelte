<script>
	const coffees = [
		{
			name: 'Café de desayuno',
			subtitle: 'Tazón grande',
			desc: 'No existe esta medida en otros lugares',
			cupWidth: 100,
			cupHeight: 80,
			handleSize: 22,
			coffeePercent: 30,
			milkPercent: 70,
			isBowl: true,
		},
		{
			name: 'Café mediano',
			subtitle: 'Café con leche normal',
			desc: 'Lo que en el resto de España es un café con leche',
			cupWidth: 78,
			cupHeight: 70,
			handleSize: 18,
			coffeePercent: 45,
			milkPercent: 55,
			isBowl: false,
		},
		{
			name: 'Café con leche',
			subtitle: 'Tamaño cortado',
			desc: 'Ojo: aquí tiene la medida de un cortado',
			cupWidth: 62,
			cupHeight: 56,
			handleSize: 15,
			coffeePercent: 55,
			milkPercent: 45,
			isBowl: false,
		},
		{
			name: 'Cortado',
			subtitle: 'Café solo + gota de leche',
			desc: 'Café solo con una mancha de leche',
			cupWidth: 52,
			cupHeight: 46,
			handleSize: 12,
			coffeePercent: 85,
			milkPercent: 15,
			isBowl: false,
		},
	];

	const cx = 110;
	const milkColor = '#f5e6d0';
	const coffeeColor = '#5c3d2e';

	/**
	 * @param {{ cupWidth: number; cupHeight: number; handleSize: number; coffeePercent: number; milkPercent: number; isBowl: boolean; name: string }} c
	 */
	function cupGeometry(c) {
		const w = c.cupWidth;
		const h = c.cupHeight;
		const ty = c.isBowl ? 52 : 48;
		const by = ty + h;
		const taper = c.isBowl ? 0.34 : 0.4;
		const innerTopPad = 9;
		const innerBottomPad = 8;
		const sidePad = 7;
		const tyi = ty + innerTopPad;
		const byi = by - innerBottomPad;
		const halfTop = w / 2 - sidePad;
		const halfBot = w * taper - sidePad * 0.85;
		const clipD = `M ${cx - halfTop} ${tyi} L ${cx + halfTop} ${tyi} L ${cx + halfBot} ${byi} L ${cx - halfBot} ${byi} Z`;
		const outerD = `M ${cx - w / 2} ${ty} L ${cx + w / 2} ${ty} L ${cx + w * taper} ${by} L ${cx - w * taper} ${by} Z`;
		const liquidH = Math.max(1, byi - tyi);
		const milkH = (c.milkPercent / 100) * liquidH;
		const coffeeH = (c.coffeePercent / 100) * liquidH;
		const foamY = byi - milkH;
		const saucerRx = w / 2 + 14;
		const saucerRy = 7;
		const handleX0 = cx + w / 2 - 2;
		const handleY0 = ty + h * 0.32;
		const handleX1 = cx + w / 2 + c.handleSize;
		const handleY1 = ty + h * 0.52;
		const steamBaseY = ty - 4;
		return {
			w,
			h,
			ty,
			by,
			taper,
			clipD,
			outerD,
			milkH,
			coffeeH,
			tyi,
			byi,
			foamY,
			halfTop,
			halfBot,
			saucerRx,
			saucerRy,
			handleX0,
			handleY0,
			handleX1,
			handleY1,
			steamBaseY,
		};
	}
</script>

<div class="coffee-guide">
	{#each coffees as c}
		{@const id = c.name.replace(/\s/g, '')}
		{@const g = cupGeometry(c)}
		<article class="coffee-card">
			<div class="coffee-svg-wrap">
				<svg viewBox="0 0 220 200" class="coffee-svg" aria-hidden="true">
					<defs>
						<clipPath id={id}>
							<path d={g.clipD} />
						</clipPath>
					</defs>

					<!-- saucer -->
					<ellipse
						cx={cx}
						cy={g.by + 9}
						rx={g.saucerRx}
						ry={g.saucerRy}
						fill="#e8e2da"
						stroke="#d8d0c6"
						stroke-width="1"
					/>

					<!-- handle (behind cup fill) -->
					<path
						d={`M ${g.handleX0} ${g.handleY0} Q ${g.handleX1} ${(g.handleY0 + g.handleY1) / 2} ${g.handleX0} ${g.handleY1}`}
						fill="none"
						stroke="#c9c3ba"
						stroke-width="5"
						stroke-linecap="round"
					/>

					<!-- cup body -->
					<path
						d={g.outerD}
						fill="#faf7f2"
						stroke="#cfc8be"
						stroke-width="2"
						stroke-linejoin="round"
					/>

					{#if c.isBowl}
						<ellipse
							cx={cx}
							cy={g.ty + 3}
							rx={c.cupWidth / 2 - 2}
							ry="9"
							fill="#f3eee8"
							stroke="#cfc8be"
							stroke-width="1.5"
						/>
					{/if}

					<!-- liquid clip group -->
					<g clip-path={`url(#${id})`}>
						<rect
							x={cx - 90}
							y={g.byi - g.milkH}
							width="180"
							height={g.milkH}
							fill={milkColor}
						/>
						<rect
							x={cx - 90}
							y={g.byi - g.milkH - g.coffeeH}
							width="180"
							height={g.coffeeH}
							fill={coffeeColor}
						/>
					</g>

					<!-- foam line -->
					<path
						d={`M ${cx - g.halfTop + 4} ${g.foamY} Q ${cx} ${g.foamY - 2} ${cx + g.halfTop - 4} ${g.foamY}`}
						fill="none"
						stroke="#f0e4d4"
						stroke-width="2.5"
						stroke-linecap="round"
						opacity="0.95"
					/>

					<!-- cup inner rim highlight -->
					<path
						d={g.outerD}
						fill="none"
						stroke="#e5dfd6"
						stroke-width="1.2"
						opacity="0.7"
					/>

					<!-- steam -->
					<g stroke="#c8c2bc" stroke-width="1.6" fill="none" stroke-linecap="round" opacity="0.55">
						<path
							d={`M ${cx - 18} ${g.steamBaseY} Q ${cx - 22} ${g.steamBaseY - 16} ${cx - 16} ${g.steamBaseY - 32}`}
						/>
						<path d={`M ${cx} ${g.steamBaseY - 4} Q ${cx + 4} ${g.steamBaseY - 20} ${cx} ${g.steamBaseY - 38}`} />
						<path
							d={`M ${cx + 18} ${g.steamBaseY} Q ${cx + 22} ${g.steamBaseY - 16} ${cx + 16} ${g.steamBaseY - 32}`}
						/>
					</g>
				</svg>
			</div>

			<h3 class="coffee-name">{c.name}</h3>
			<p class="coffee-subtitle">{c.subtitle}</p>
			<p class="coffee-desc">{c.desc}</p>

			<div class="coffee-legend">
				<span class="legend-swatch coffee"></span>
				<span class="legend-text">Café {c.coffeePercent}%</span>
				<span class="legend-swatch milk"></span>
				<span class="legend-text">Leche {c.milkPercent}%</span>
			</div>
		</article>
	{/each}
</div>

<style>
	.coffee-guide {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
		gap: 1.5rem;
		margin: 2rem 0;
	}

	.coffee-card {
		background: var(--color-card, #fff);
		border: 1px solid var(--color-border, #e8e4de);
		border-radius: var(--radius, 12px);
		padding: 1.25rem 1.25rem 1.5rem;
		transition:
			box-shadow 0.3s,
			transform 0.3s;
	}

	.coffee-card:hover {
		box-shadow: 0 6px 22px rgba(0, 0, 0, 0.07);
		transform: translateY(-3px);
	}

	.coffee-svg-wrap {
		display: flex;
		justify-content: center;
		margin-bottom: 0.75rem;
	}

	.coffee-svg {
		width: 100%;
		max-width: 240px;
		height: auto;
	}

	.coffee-name {
		font-family: 'DM Serif Display', Georgia, serif;
		font-size: 1.2rem;
		margin: 0 0 0.35rem;
		color: var(--color-text, #2c2c2c);
	}

	.coffee-subtitle {
		font-size: 0.88rem;
		color: var(--color-accent, #1a6b3c);
		font-weight: 600;
		margin: 0 0 0.5rem;
	}

	.coffee-desc {
		font-size: 0.9rem;
		color: var(--color-text-muted, #6b6b6b);
		line-height: 1.55;
		margin: 0 0 1rem;
	}

	.coffee-legend {
		display: flex;
		align-items: center;
		flex-wrap: wrap;
		gap: 0.35rem 0.75rem;
		font-size: 0.82rem;
		color: var(--color-text-muted, #6b6b6b);
	}

	.legend-swatch {
		width: 12px;
		height: 12px;
		border-radius: 3px;
		display: inline-block;
	}

	.legend-swatch.coffee {
		background: #5c3d2e;
	}

	.legend-swatch.milk {
		background: #f5e6d0;
		border: 1px solid #e5d8c8;
	}

	.legend-text {
		margin-right: 0.25rem;
	}
</style>
