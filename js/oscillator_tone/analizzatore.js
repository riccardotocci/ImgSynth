const canvasAn = document.getElementById("analyserCanvas");
const canvasContextAn = canvasAn.getContext("2d");

function drawSpectrum() {
    const width = canvasAn.width;
    const height = canvasAn.height;
    const data = analyser.getValue(); // Ottieni i dati FFT dall'analizzatore

    // Pulisci il canvas
    canvasContextAn.clearRect(0, 0, width, height);

    // Disegna il grafico FFT
    const barWidth = width / data.length;
    data.forEach((value, index) => {
        const barHeight = (value + 140) * (height / 140); // Normalizza i valori
        const x = Math.log10(index + 1) * barWidth * data.length / Math.log10(data.length + 1);

        // Colore dinamico basato sull'ampiezza
        const color = `hsl(${Math.log10(index + 1) * 360 / Math.log10(data.length + 1)}, 100%, 50%)`;
        canvasContextAn.fillStyle = color;

        // Disegna la barra
        canvasContextAn.fillRect(x, height - barHeight, barWidth, barHeight);
    });

    requestAnimationFrame(drawSpectrum); // Ripeti il rendering
}

// Avvia il rendering dello spettro
drawSpectrum();
