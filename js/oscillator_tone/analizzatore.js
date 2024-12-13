const canvasAn = document.getElementById("analyserCanvas");
const canvasContextAn = canvasAn.getContext("2d");

function drawSpectrum() {
    const width = canvas.width;
    const height = canvas.height;
    const data = analyser.getValue(); // Ottieni i dati FFT dall'analizzatore

    // Pulisci il canvas
    canvasContextAn.clearRect(0, 0, width, height);

    // Disegna il grafico FFT
    const barWidth = width / data.length;
    data.forEach((value, index) => {
        const barHeight = (value + 140) * (height / 140); // Normalizza i valori
        const x = index * barWidth;

        // Colore dinamico basato sull'ampiezza
        const color = `hsl(${(index / data.length) * 360}, 100%, 50%)`;
        canvasContextAn.fillStyle = color;

        // Disegna la barra
        canvasContextAn.fillRect(x, height - barHeight, barWidth, barHeight);
    });

    requestAnimationFrame(drawSpectrum); // Ripeti il rendering
}

// Avvia il rendering dello spettro
drawSpectrum();
