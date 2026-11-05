# Sala Arcade

Recreativa web con 10 juegos (Galaga, Pac-Man, Donkey Kong, Frogger, Asteroids, Snake, Breakout, Pong, Tetris y Ruleta), tienda de skins y logros.
Proyecto de **Alicia Moreno Contreras** · UVUS: **mfr3597**.

No necesita instalar nada ni servidor: son archivos HTML, CSS y JavaScript normales.

## Estructura

```
sala-arcade/
├── index.html              ← página principal (menú, tienda, logros y zona de juego)
├── README.md               ← este archivo
├── css/
│   └── style.css           ← todos los estilos
├── js/
│   ├── core.js             ← variables globales, datos guardados y sonido
│   ├── games/              ← un archivo por juego
│   │   ├── galaga.js
│   │   ├── pacman.js
│   │   ├── snake.js
│   │   ├── breakout.js
│   │   ├── pong.js
│   │   ├── tetris.js
│   │   ├── donkey-kong.js
│   │   ├── frogger.js
│   │   ├── asteroids.js
│   │   └── roulette.js
│   ├── economy.js          ← fichas que se ganan al superar niveles
│   ├── shop.js             ← tienda de skins y vistas previas
│   ├── achievements.js     ← logros y sus avisos
│   └── main.js             ← menú, controles, bucle del juego
└── assets/
    └── donkey-kong.png     ← sprite del mono
```

El orden de los `<script>` al final de `index.html` importa: primero `core.js`, luego los juegos y al final `economy.js`, `shop.js`, `achievements.js` y `main.js`.

## Probarlo en tu ordenador

Haz doble clic en `index.html` y se abre en el navegador.

## Subirlo a GitHub Pages (para que lo jueguen tus amigos)

Necesitas una cuenta gratuita en <https://github.com>. El repositorio tiene que ser **público** para usar Pages gratis.

### Opción A · Sin instalar nada (desde la web de GitHub)

1. Entra en GitHub y pulsa **+** (arriba a la derecha) → **New repository**.
2. Ponle nombre, por ejemplo `sala-arcade`, marca **Public** y pulsa **Create repository**.
3. En la página del repositorio vacío pulsa **uploading an existing file**.
4. Descomprime el ZIP y arrastra **el contenido de la carpeta `sala-arcade`**: `index.html`, `README.md` y las carpetas `css`, `js` y `assets`. Importante: `index.html` debe quedar en la raíz del repositorio, no dentro de otra carpeta.
5. Baja y pulsa **Commit changes**.
6. Ve a **Settings** → **Pages** (menú de la izquierda).
7. En **Build and deployment**, en *Source* elige **Deploy from a branch**; en *Branch* elige `main` y la carpeta `/ (root)`; pulsa **Save**.
8. Espera uno o dos minutos y recarga la página de Pages. Arriba aparecerá la dirección de tu web:
   `https://TU_USUARIO.github.io/sala-arcade/`
9. Pásale ese enlace a tus amigos.

### Opción B · Con Git (terminal)

```bash
cd sala-arcade
git init
git add .
git commit -m "Sala Arcade"
git branch -M main
git remote add origin https://github.com/TU_USUARIO/sala-arcade.git
git push -u origin main
```

Después activa Pages igual que en la opción A (pasos 6 a 8).

### Para actualizar la web más adelante

Cambia los archivos (en la web de GitHub: entra al archivo → icono del lápiz → **Commit changes**; o con Git: `git add . && git commit -m "cambios" && git push`). Pages se actualiza solo en uno o dos minutos. Si no ves los cambios, recarga con `Ctrl + F5`.

### Otras opciones gratuitas

- **Netlify Drop** (<https://app.netlify.com/drop>): arrastras la carpeta y te da un enlace al instante.
- **Cloudflare Pages** o **Vercel**: también sirven para webs estáticas como esta.

## Cosas a tener en cuenta

- Las **fichas, skins, logros y récords se guardan en el navegador de cada persona** (localStorage). Cada amigo tendrá su propio progreso y no se comparte entre dispositivos.
- La fuente de estilo arcade (Press Start 2P) se descarga de Google Fonts, así que hace falta internet para verla; sin conexión se usa una fuente de respaldo.
- Cualquiera que tenga el enlace verá el nombre y el UVUS que aparecen en el menú. Si no quieres que sean públicos, bórralos de `index.html` (línea con `class="author"`) antes de subirlo.
