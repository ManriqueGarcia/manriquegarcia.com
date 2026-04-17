# manriquegarcia.com

Guía de Asturias: restaurantes, sidrerías, bares, hoteles, lugares que visitar y diccionario asturiano.

## Tecnología

- **Framework**: Astro 6.x (generación estática)
- **Hosting**: AWS Amplify
- **Dominio**: manriquegarcia.com

## Desarrollo local

```bash
npm install
npm run dev        # Servidor de desarrollo en localhost:4321
npm run build      # Genera el sitio estático en ./dist/
npm run preview    # Vista previa del build local
```

## Estructura

```
src/
├── layouts/       # Layout base compartido
├── pages/         # Páginas del sitio
│   ├── index.astro
│   ├── restaurantes.astro
│   ├── bares.astro
│   ├── visitar.astro
│   ├── hoteles.astro
│   └── diccionario.astro
└── styles/        # Estilos globales
```

## Despliegue

El sitio se despliega automáticamente en AWS Amplify al hacer push a la rama `main`.
