# Recurso interactivo modular — Distribuciones muestrales

## Requisitos
- Navegador moderno (ES Modules)
- (Opcional) Google Sheet + Apps Script si se desea persistencia remota

## Desarrollo local
- Abrir `index.html` directamente en el navegador (o servir con una extensión de live server en VS Code).

## Despliegue en GitHub Pages
1. Crear repositorio público, subir estos archivos.
2. En Settings → Pages → Source: Deploy from a branch; Branch: main; Folder: root.
3. Abrir la URL `https://TU_USUARIO.github.io/TU_REPO/`.

## Guardado de intentos
- Por defecto, guarda en `localStorage`.
- Para enviar a Google Sheets: publica `apps_script/Code.gs` como app web y añade un fetch en `modules/storage.js` con la URL.

## Extender el banco de ítems
- Agregar archivos `bank_*.js` con objetos `{id, nivel, enunciado(p), params(), pista(p), solucion(p)}`.
- Ajustar `router.js` para mezclar bancos según unidad.

## Licencia
Uso docente.
