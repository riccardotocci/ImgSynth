// Get references to HTML elements
const ipInput = document.getElementById("ipAddress");
let captureInterval;
const snapshotImg = document.getElementById("esp32feed");

function processImageesp32() {
    const canvas_esp32 = document.getElementById('canvas');
    const ctx = canvas_esp32.getContext('2d');
    canvas_esp32.width = snapshotImg.naturalWidth;
    canvas_esp32.height = snapshotImg.naturalHeight;
    ctx.drawImage(snapshotImg, 0, 0);

    // Esegui le analisi
    const hslValues = getRandomHSLFromCanvas(ctx, canvas_esp32.width, canvas_esp32.height);
    displayColorsAndWaveforms(hslValues);
    applyBackgroundGradient(hslValues);

    // Calcola il contrasto normalizzato
    const normalizedContrast = calculateContrast(ctx, canvas_esp32);

    // Calcola la media di S e L
    const { averageS, averageL } = calculateAverageSL(hslValues);

    // Calcola nitidezza
    const sharpness = calculateSharpness(canvas_esp32, ctx);

    // Calcola rumore
    const noiseLevel = calculateNoise(canvas_esp32, ctx);

    // Calcola profondità
    const depthValue = calculateDepthValue(canvas_esp32, ctx);

    console.log(`Media Saturazione (S): ${averageS}`);
    console.log(`Media Luminosità (L): ${averageL}`);
    console.log(`Nitidezza: ${sharpness}`);
    console.log(`Rumore: ${noiseLevel}`);
    console.log(`Profondità: ${depthValue}`);
    console.log(`Contrasto normalizzato: ${normalizedContrast}`);

    // Salva i risultati delle analisi
    const imageAnalysis = {
        averageS,
        averageL,
        sharpness,
        noiseLevel,
        depthValue,
        normalizedContrast,
    };
    const dominantColors = hslValues;

    // Normalizza i parametri
    const normalizedParameters = transformParameters(imageAnalysis);
    console.log("Parametri normalizzati:", normalizedParameters);

    // Aggiorna il preset
    adjustPresetFromImage(imageAnalysis, dominantColors);

    // Visualizza i risultati nel DOM
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
}

document.getElementById("liveStreamButton").addEventListener("click", () => {
    console.log("Button clicked!");
    const button = document.getElementById("liveStreamButton");
    const esp32Url = `http://${ipInput.value}`;
    console.log("ESP32 URL:", esp32Url);

   

    if (captureInterval) {
        console.log("Stopping stream...");
        clearInterval(captureInterval);
        captureInterval = null;
        button.textContent = "Start Stream";
    } else {
        console.log("Starting stream...");
        try {
            const captureAndAnalyze = () => {
                console.log("Fetching image...");
                snapshotImg.src = `${esp32Url}/capture?${new Date().getTime()}`;
                snapshotImg.crossOrigin = "Anonymous";

                snapshotImg.onload = () => {
                    console.log("Immagine caricata con successo.");

                    // Analizza direttamente dal canvas
                    processImageesp32();
                };

                // Gestisci errori di caricamento immagine
                snapshotImg.onerror = () => {
                    console.error("Errore durante il caricamento dell'immagine.");
                    alert("Failed to load the image from the ESP32.");
                    clearInterval(captureInterval);
                    captureInterval = null;
                    button.textContent = "Start Stream";
                };
            };

            captureAndAnalyze();
            captureInterval = setInterval(captureAndAnalyze, 10000);
            button.textContent = "Stop Stream";
        } catch (error) {
            console.error("Stream error:", error);
        }
    }
});

