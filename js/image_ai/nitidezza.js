let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');
let result = document.getElementById('result');

console.log('cv:', cv); // Verifica che OpenCV.js sia caricato
console.log('Canvas:', canvas); // Verifica il canvas
console.log('Immagine caricata:', cv.imread(canvas)); // Testa cv.imread


function onOpenCvReady() {
  if (typeof cv === 'undefined') {
    console.error('OpenCV.js non è stato caricato correttamente.');
    return;
  }
  console.log('OpenCV.js è pronto.');
}


function calculateSharpness(canvas, ctx){
    try {

      // Converti l'immagine in un Mat di OpenCV
      let src = cv.imread(canvas);
      let gray = new cv.Mat();
      cv.cvtColor(src, gray, cv.COLOR_RGBA2GRAY, 0);

      // Applica il filtro Laplaciano
      let laplacian = new cv.Mat();
      cv.Laplacian(gray, laplacian, cv.CV_64F);

      // Calcola la varianza del Laplaciano
      let mean = new cv.Mat();
      let stddev = new cv.Mat();
      cv.meanStdDev(laplacian, mean, stddev);
      let variance = stddev.data64F[0] ** 2;

      // Calcola la nitidezza relativa
      let totalPixels = src.cols * src.rows;
      let relativeSharpness = variance / totalPixels;

      // Scala la nitidezza in 0-100
      const SCALE_FACTOR = 20000; // Regola in base alle necessità
      let normalizedSharpness = Math.min(100, relativeSharpness * SCALE_FACTOR);
      console.log('Normalized Sharpness:', normalizedSharpness);

      // Cleanup delle risorse OpenCV
      src.delete();
      gray.delete();
      laplacian.delete();
      mean.delete();
      stddev.delete();

      return normalizedSharpness;
    } catch (error) {
      console.error('Errore durante l’elaborazione:', error);
      alert('Si è verificato un errore durante l’elaborazione dell’immagine.');
    }
};