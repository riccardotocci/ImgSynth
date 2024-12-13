function calculateDepth(mat) {
    let sum = 0;
    const totalPixels = mat.rows * mat.cols;

    for (let i = 0; i < mat.rows; i++) {
        for (let j = 0; j < mat.cols; j++) {
            // Amplifica i gradienti per enfatizzare i dettagli
            const gradient = Math.abs(mat.data[i * mat.cols + j]) * 2;
            if (gradient > 40) sum += Math.min(gradient, 255); // Limita al massimo valore
        }
    }

    // Normalizza il valore su una scala 0-1
    const maxGradient = 255; // Valore massimo teorico per pixel
    return sum / (totalPixels * maxGradient);
}
function calculateDepthValue(canvas,ctx){
        try {
            // Carica i dati immagine in OpenCV
            let src = cv.imread(canvas);
            let gray = new cv.Mat();
            let sobelX = new cv.Mat();
            let sobelY = new cv.Mat();
            let sobel = new cv.Mat();

            // Converti l'immagine in scala di grigi
            cv.cvtColor(src, gray, cv.COLOR_RGBA2GRAY, 0);

            // Applica il filtro Sobel per calcolare i gradienti
            console.log("Applicazione filtro Sobel...");
            cv.Sobel(gray, sobelX, cv.CV_16S, 1, 0, 3, 1, 0, cv.BORDER_DEFAULT);
            cv.Sobel(gray, sobelY, cv.CV_16S, 0, 1, 3, 1, 0, cv.BORDER_DEFAULT);

            // Combina i gradienti X e Y
            cv.addWeighted(sobelX, 0.5, sobelY, 0.5, 0, sobel);

            // Calcola il valore di profondità
            const depthValue = calculateDepth(sobel);
            console.log("Valore profondità calcolato:", depthValue);
            return depthValue;

        } catch (error) {
            console.error("Errore durante l’elaborazione:", error);
        }
};





