function applyBackgroundGradient(hslValues) {
    if (hslValues.length < 3) return; // Assicura che ci siano almeno 3 colori

    let offset = 0;       // Posizione iniziale del gradiente
    let direction = 1;    // Direzione dell'animazione (1 = avanti, -1 = indietro)

    function animateGradient() {
        // Incrementa o decrementa la posizione in base alla direzione
        offset += direction;

        // Inverte la direzione se raggiunge i limiti (0% o 100%)
        if (offset >= 100 || offset <= 0) {
            direction *= -1; // Cambia direzione
        }

        // Ottieni i colori
        const gradientColors = hslValues.slice(0, 3).map(colorInfo => colorInfo.color);

        // Crea un gradiente lineare
        const gradient = `linear-gradient(to right, ${gradientColors.join(', ')})`;

        // Applica il gradiente con posizione dinamica
        document.body.style.background = `${gradient}`;
        document.body.style.backgroundSize = "300% 100%"; // Triplica la larghezza del gradiente
        document.body.style.backgroundPosition = `${offset}% 0`; // Muove il gradiente

        // Ripeti l'animazione
        requestAnimationFrame(animateGradient);
    }

    animateGradient(); // Avvia l'animazione
}


