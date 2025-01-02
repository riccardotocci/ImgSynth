// HTML structure expected:
// <input type="file" id="imageInput" />
// <div id="canvas-container" style="display: none;">
//   <canvas id="mainCanvas"></canvas>
// </div>

// Global variables
let bottomImg, topImg;
let canvas_sketch, ctx_sketch;
let img_p5;

// Event listener for file input
document.getElementById('imageInput').addEventListener('change', (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img_p5 = new Image();
      img_p5.onload = () => {
        // Create canvas and context
        canvas_sketch = document.getElementById('mainCanvas');
        canvas_sketch.width = img_p5.width;
        canvas_sketch.height = img_p5.height;
        ctx_sketch = canvas_sketch.getContext('2d');

        // Draw color version (bottom image)
        bottomImg = document.createElement('canvas');
        const bottomCtx = bottomImg.getContext('2d');
        bottomImg.width = img_p5.width;
        bottomImg.height = img_p5.height;
        bottomCtx.drawImage(img_p5, 0, 0);

        // Create black and white version (top image)
        topImg = document.createElement('canvas');
        const topCtx = topImg.getContext('2d');
        topImg.width = img_p5.width;
        topImg.height = img_p5.height;
        topCtx.drawImage(img_p5, 0, 0);

        // Convert to grayscale
        const imageData = topCtx.getImageData(0, 0, img_p5.width, img_p5.height);
        const pixels = imageData.data;
        for (let i = 0; i < pixels.length; i += 4) {
          const gray = (pixels[i] + pixels[i + 1] + pixels[i + 2]) / 3;
          pixels[i] = gray;     // Red
          pixels[i + 1] = gray; // Green
          pixels[i + 2] = gray; // Blue
        }
        topCtx.putImageData(imageData, 0, 0);

        // Display the canvas and render the black-and-white image
        document.getElementById('canvas-container').style.display = 'block';
        ctx_sketch.drawImage(topImg, 0, 0);
      };
      img_p5.src = e.target.result;
    };
    reader.readAsDataURL(file);
  }
});

function isSoundPlaying() {
    const data = analyser.getValue();
    const normalizedData = data.map(value => (value + 140) * (1 / 140)); // Normalizza i dati
    return normalizedData.some(value => value > 0.1); // Usa una soglia normalizzata
}


// Clock a 0.2 secondi per aggiornare automaticamente il canvas
setInterval(() => {
  if (isSoundPlaying()) {
    // Genera coordinate casuali nel canvas
    const randomX = Math.random() * canvas_sketch.width;
    const randomY = Math.random() * canvas_sketch.height;

    // Copia una piccola area casuale dall'immagine a colori al canvas in bianco e nero
    const size = 20; // Dimensione della "spazzola"
    ctx_sketch.drawImage(
      bottomImg,
      randomX - size / 2,
      randomY - size / 2,
      size,
      size,
      randomX - size / 2,
      randomY - size / 2,
      size,
      size
    );
  } else {
    // Puoi aggiungere una logica opzionale per "spegnere" il canvas quando il suono si ferma
    console.log("Nessun suono rilevato, in attesa...");
  }
}, 50); // Intervallo di 200 ms

