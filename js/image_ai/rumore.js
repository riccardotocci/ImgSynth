

let result_rumore = document.getElementById('result_rumore');

function onOpenCvReady() {
  console.log('OpenCV.js è pronto!');
}

function calculateNoise(canvas,ctx){
      // Convert image to OpenCV Mat
      let src = cv.imread(canvas);
      let gray = new cv.Mat();
      cv.cvtColor(src, gray, cv.COLOR_RGBA2GRAY, 0);

      // Apply Gaussian blur to reduce noise
      let blurred = new cv.Mat();
      cv.GaussianBlur(gray, blurred, new cv.Size(5, 5), 0);

      // Calculate the noise as the difference between original and blurred image
      let noise = new cv.Mat();
      cv.absdiff(gray, blurred, noise);

      // Compute the standard deviation
      let mean = new cv.Mat();
      let stddev = new cv.Mat();
      cv.meanStdDev(noise, mean, stddev);
      let noiseLevel = stddev.data64F[0]; // Standard deviation of noise

      // Normalize noise level to 0-100
      const MAX_NOISE_LEVEL = 50; // Adjust based on typical max noise observed
      const SCALE_FACTOR = 2; // Amplifies the noise for better scaling
      let normalizedNoise = Math.min(100, (noiseLevel * SCALE_FACTOR / MAX_NOISE_LEVEL) * 100);
      return normalizedNoise;
};