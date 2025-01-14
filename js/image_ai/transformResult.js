function transformParameters(results) {
    const normalizedParameters = {};

    // Funzione per normalizzare un valore
    const normalize = (value, min, max) => {
        if (value === null || value === undefined || isNaN(value)) return 0; // Valori non validi diventano 0
        if (value < min) return 0; // Valori al di sotto del minimo diventano 0
        if (value > max) return 100; // Valori al di sopra del massimo diventano 100
        return Math.round(((value - min) / (max - min)) * 100); // Normalizzazione lineare e arrotondamento
    };

    // Normalizzazione dei parametri specifici
    normalizedParameters["saturazione"] = normalize(results.averageS, 0, 100);
    normalizedParameters["luminosità"] = normalize(results.averageL, 0, 100);
    normalizedParameters["nitidezza"] = normalize(results.sharpness, 0, 100);
    normalizedParameters["rumore"] = normalize(results.noiseLevel, 0, 50);
    normalizedParameters["profondità"] = normalize(results.depthValue, 0, 1);

    // Log per il debug
    console.log("Parametri normalizzati:", normalizedParameters);

    return normalizedParameters;
}

