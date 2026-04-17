# manriquegarcia.com

Sitio web personal de Manrique Garcia, construido con [Astro](https://astro.build).

## Tecnología

- **Framework**: Astro 4.x (generación estática)
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
├── layouts/       # Layouts base y de posts
├── pages/         # Páginas y rutas
│   ├── posts/     # Publicaciones en Markdown
│   ├── index.astro
│   ├── about.astro
│   └── blog.astro
└── styles/        # Estilos globales
```

## Despliegue

El sitio se despliega automáticamente en AWS Amplify al hacer push a la rama `main`.
