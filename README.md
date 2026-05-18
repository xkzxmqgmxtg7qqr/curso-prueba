# Inferencia para Ingeniería — recurso interactivo modular

## Requisitos
- Navegador moderno (ES Modules)
- (Opcional) Google Sheet + Apps Script si se desea persistencia remota

## Qué incluye
- Portada y ruta de aprendizaje para cursos de ingeniería.
- Teoría aplicada sobre distribuciones muestrales, intervalos de confianza y pruebas de hipótesis.
- Simulador de distribución muestral para visualizar el error estándar.
- Práctica autocorregible con problemas de manufactura, sensores, calidad, energía y confiabilidad.
- Registro local de intentos con retroalimentación inmediata.

## Archivo de entrada
- `index.html` conecta toda la aplicación: estilos, MathJax, router, vistas, bancos de ejercicios, calificador y almacenamiento.
- Si el navegador bloquea módulos ES al abrir el archivo directamente, sirve la carpeta con un servidor local o publícala en GitHub Pages.

## Desarrollo local
- Abrir `index.html` directamente en el navegador (o servir con una extensión de live server en VS Code).

## Despliegue en GitHub Pages
1. Crear repositorio público, subir estos archivos.
2. En Settings → Pages → Source: Deploy from a branch; Branch: main; Folder: root.
3. Abrir la URL `https://TU_USUARIO.github.io/TU_REPO/`.

## Guardado de intentos
- Por defecto, guarda en `localStorage`.
- Para enviar a Google Sheets: publica `Code.gs` como app web y añade un fetch en `storage.js` con la URL.

## Extender el banco de ítems
- Agregar archivos `bank_*.js` con objetos `{id, nivel, unidad, titulo, enunciado(p), params(), pista(p), solucion(p)}`.
- Registrar el banco en `bank_inferencia.js`.
- La solución puede devolver `respuesta` para indicar el valor esperado; si no existe, el calificador usa `prob`, `c`, `z`, `z2` o `z1`.

## Licencia
Uso docente.
