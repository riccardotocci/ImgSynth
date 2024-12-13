    let img; // Variabile per memorizzare l'immagine caricata
    let imageAnalysis;
    let dominantColors;
    
    document.getElementById('imageInput').addEventListener('change', function (event) {
      const file = event.target.files[0];
      if (!file) return;

      img = new Image();
      img.src = URL.createObjectURL(file);
      img.crossOrigin = "Anonymous";

      img.onload = () => {
        processImage();
        document.getElementById('recalculateButton').style.display = 'inline-block';
      };
    });


    function calculateAverageSL(hslValues) {
      if (!hslValues || hslValues.length === 0) {
        console.error("Nessun valore HSL disponibile per calcolare la media.");
        return { averageS: 0, averageL: 0 };
      }
    
      let totalS = 0;
      let totalL = 0;
    
      hslValues.forEach(({ hsl }) => {
        totalS += hsl[1]; // Somma Saturazione
        totalL += hsl[2]; // Somma Luminosità
      });
    
      const averageS = totalS / hslValues.length; // Media Saturazione
      const averageL = totalL / hslValues.length; // Media Luminosità
    
      return { averageS: averageS.toFixed(2), averageL: averageL.toFixed(2) };
    }

    document.getElementById('recalculateButton').addEventListener('click', processImage);

    function getRandomHSLFromCanvas(ctx, width, height, squareSize = 25, numSamples = 3) {
      const hslValues = [];
      const positions = [];

      for (let i = 0; i < numSamples; i++) {
        let validPosition = false;
        let x, y;

        while (!validPosition) {
          x = Math.floor(Math.random() * (width - squareSize));
          y = Math.floor(Math.random() * (height - squareSize));

          validPosition = positions.every(([px, py]) => {
            const distance = Math.sqrt((px - x) ** 2 + (py - y) ** 2);
            return distance >= squareSize;
          });
        }

        positions.push([x, y]);

        const imageData = ctx.getImageData(x, y, squareSize, squareSize);
        const data = imageData.data;

        let totalR = 0, totalG = 0, totalB = 0;
        const pixelCount = squareSize * squareSize;

        for (let j = 0; j < data.length; j += 4) {
          totalR += data[j];
          totalG += data[j + 1];
          totalB += data[j + 2];
        }

        const avgR = totalR / pixelCount;
        const avgG = totalG / pixelCount;
        const avgB = totalB / pixelCount;

        const [h, s, l] = chroma(avgR, avgG, avgB).hsl();
        hslValues.push({
          color: chroma(avgR, avgG, avgB).hex(),
          hsl: [Math.round(h || 0), Math.round((s || 0) * 100), Math.round((l || 0) * 100)],
        });
      }

      return hslValues;
    }

    function calculateContrast(ctx, canvas) {
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;
      const luminance = [];

      for (let i = 0; i < data.length; i += 4) {
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];

          const lum = chroma(r, g, b).luminance();
          luminance.push(lum);
      }

      const meanLum = luminance.reduce((acc, val) => acc + val, 0) / luminance.length;
      const contrast = Math.sqrt(
          luminance.reduce((acc, val) => acc + Math.pow(val - meanLum, 2), 0) / luminance.length
      );

      return Math.min(Math.max((contrast / 0.5) * 100, 0), 100); // Normalized contrast
  }

    function processImage() {
      if (!img) return;
  
      const canvas = document.getElementById('canvas');
      const ctx = canvas.getContext('2d');
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
  
      const hslValues = getRandomHSLFromCanvas(ctx, canvas.width, canvas.height);
      displayColorsAndWaveforms(hslValues);
      applyBackgroundGradient(hslValues);
      
      // Calcola il contrasto normalizzato
      const normalizedContrast = calculateContrast(ctx, canvas);
  
      // Calcola la media di S e L
      const { averageS, averageL } = calculateAverageSL(hslValues);
  
      // Calcola nitidezza
      const sharpness = calculateSharpness(canvas, ctx);
  
      // Calcola rumore
      const noiseLevel = calculateNoise(canvas, ctx);
  
      // Calcola profondità
      const depthValue = calculateDepthValue(canvas, ctx);
  
      console.log(`Media Saturazione (S): ${averageS}`);
      console.log(`Media Luminosità (L): ${averageL}`);
      console.log(`Nitidezza: ${sharpness}`);
      console.log(`Rumore: ${noiseLevel}`);
      console.log(`Profondità: ${depthValue}`);
      console.log(`Contrasto normalizzato: ${normalizedContrast}`);
  
      // Visualizza le medie nel DOM
      const resultDiv = document.getElementById("result");
      if (resultDiv) {
          resultDiv.innerHTML = `
              <p>Media Saturazione (S): ${averageS}%</p>
              <p>Media Luminosità (L): ${averageL}%</p>
              <p>Nitidezza: ${sharpness.toFixed(2)}</p>
              <p>Rumore: ${noiseLevel.toFixed(2)}</p>
              <p>Profondità: ${depthValue.toFixed(2)}</p>
              <p>Contrasto normalizzato: ${normalizedContrast.toFixed(2)}</p>
          `;
      }
  
      // Salva i dati analizzati
      imageAnalysis = { averageS, averageL, sharpness, noiseLevel, depthValue, normalizedContrast};
      dominantColors = hslValues;
      console.log('Dominant Colors:', dominantColors);    
  }
  



