# Mariam's Nail Quest 💅

Videojuego web de ilustración cartoon de 3 minijuegos (3-5 min). HTML5 + CSS3 + JavaScript puro, sin dependencias ni recursos externos.

## Ejecutar
Abre `index.html` en el navegador, o usa un servidor local: `python3 -m http.server` y entra a `http://localhost:8000`.

## Publicar en GitHub Pages
1. Sube `index.html`, `style.css`, `art.js`, `game.js` y `README.md` a la raíz de un repositorio.
2. En GitHub: **Settings → Pages**.
3. En *Build and deployment* elige **Deploy from a branch**, rama `main`, carpeta `/ (root)` y guarda.
4. Espera un minuto y abre `https://TU-USUARIO.github.io/NOMBRE-DEL-REPO/`.

## Personalizar personajes
Todo el dibujo está en `art.js` (ilustración vectorial en Canvas, separada de la lógica de `game.js`). Los personajes son las funciones `mariam()`, `mariana()` y `simon()` (colores dentro de cada una); manos y uñas están en `hands()`, `finger()` y `nail()`; los estilos de uña (sanas/dañadas y diseños) en `NSTYLE`, `DS` y `BD`.

## Niveles
1. **El ataque del TikTok**: toca 5 diseños bonitos; los feos o dejar escapar uno bueno quitan una vida.
2. **Operación salvar las uñas**: mantén el dedo en la zona verde; fuera de ella sube el riesgo.
3. **La foto perfecta**: centra las uñas en el rectángulo dorado del marco, llena la precisión y pulsa CAPTURAR. Es un nivel sin vidas a propósito, para que sea fácil de completar.

## Pruebas manuales (no probado aún en dispositivos reales)
- [ ] Abre en Safari (iPhone) y Chrome (Android) en vertical; la página no se desplaza al arrastrar el dedo.
- [ ] Rota el teléfono / cambia el tamaño: el juego se reajusta sin reiniciarse.
- [ ] Menú → CÓMO JUGAR → VOLVER funciona.
- [ ] Nivel 1: tocar 5 bonitos gana; tocar un feo o perder uno bueno resta vida; con 0 vidas aparece la derrota.
- [ ] REINTENTAR NIVEL reinicia el nivel y devuelve la puntuación a la que tenía al empezarlo (sin duplicar puntos).
- [ ] Nivel 2: dentro de la zona sube MANI y baja RIESGO; fuera sube RIESGO; riesgo lleno quita una vida; Simón flexiona con riesgo alto; completar pasa al nivel 3.
- [ ] Nivel 3: seguir las uñas llena PRECISIÓN y activa CAPTURAR; tocar al TikTok intruso lo espanta; capturar muestra flash, foto y pantalla final.
- [ ] Final: aparecen "¡FOTO PERFECTA!", los tres personajes, puntos, clasificación y JUGAR OTRA VEZ reinicia todo.
- [ ] El botón 🔊/🔇 activa y desactiva el sonido; el juego funciona sin sonido.
- [ ] Reiniciar varias veces no acelera el juego (un único bucle de animación).
