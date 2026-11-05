# Sala Arcade

Recreativa web con 10 juegos (Galaga, Pac-Man, Donkey Kong, Frogger, Asteroids, Snake, Breakout, Pong, Tetris y Ruleta), tienda de skins y logros.

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

