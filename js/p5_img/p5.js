// Variabili globali
let img; // Immagine di base
let fft, amplitude; // Analizzatori audio
let oscillators = []; // Array di oscillatori

// Caricamento immagine personalizzata
document.getElementById('imageInput').addEventListener('change', function (event) {
    const file = event.target.files[0];
    if (!file) return;

    img = new Image();
    img.src = URL.createObjectURL(file);
    img.crossOrigin = "Anonymous";

    img.onload = () => {
        let canvas = document.getElementById('canvas'); // Canvas per immagine
        let ctx = canvas.getContext('2d');
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height); // Disegna immagine
        processImage(); // Elabora immagine
        document.getElementById('recalculateButton').style.display = 'inline-block';
    };
});

// Elabora e disegna l'immagine sul canvas
function processImage() {
    fft = new p5.FFT();
    amplitude = new p5.Amplitude();

    // Configura 3 oscillatori
    oscillators.forEach((osc) => osc.stop()); // Ferma eventuali oscillatori esistenti
    oscillators = [];

    for (let i = 0; i < 3; i++) {
        let osc = new p5.Oscillator();
        osc.setType(['sine', 'square', 'triangle'][i % 3]);
        osc.freq(random(200, 800)); // Frequenza casuale
        osc.amp(0.5); // Ampiezza fissa
        osc.start();
        oscillators.push(osc);
    }
}

// Recalcola immagine e suoni
document.getElementById('recalculateButton').addEventListener('click', () => {
    processImage();
});

// Disegna effetto grafico basato sul suono
function draw() {
    if (!img) return; // Aspetta caricamento immagine

    let canvas = document.getElementById('canvas'); // Canvas per output
    let ctx = canvas.getContext('2d');

    // Ottieni dati audio
    let spectrum = fft.analyze(); // Spettro frequenze
    let level = amplitude.getLevel(); // Ampiezza

    let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let pixels = imageData.data;

    // Effetto 1: Distorsione basata sulla frequenza
    for (let i = 0; i < pixels.length; i += 4) {
        let freqIndex = i % spectrum.length;
        let shift = map(spectrum[freqIndex], 0, 255, -20, 20);

        pixels[i] = constrain(pixels[i] + shift, 0, 255); // Rosso
        pixels[i + 1] = constrain(pixels[i + 1] - shift, 0, 255); // Verde
        pixels[i + 2] = constrain(pixels[i + 2] + shift, 0, 255); // Blu
    }

    // Effetto 2: Oscillazione basata sull'ampiezza
    let brightnessShift = map(level, 0, 1, 0, 50);
    for (let j = 0; j < pixels.length; j += 4) {
        pixels[j] = constrain(pixels[j] + brightnessShift, 0, 255); // Rosso
        pixels[j + 1] = constrain(pixels[j + 1] - brightnessShift, 0, 255); // Verde
        pixels[j + 2] = constrain(pixels[j + 2] + brightnessShift, 0, 255); // Blu
    }

    ctx.putImageData(imageData, 0, 0); // Aggiorna canvas
}
