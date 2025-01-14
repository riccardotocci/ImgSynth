// Funzione di mappatura dei valori
function mapRange(value, inputMin, inputMax, outputMin, outputMax) {
    if (value === null || value === undefined) {
        console.error(`Valore non definito per mapRange: ${value}`);
        return outputMin; // Fallback
    }
    if (isNaN(value)) {
        console.error(`Valore non basso per mapRange: ${value}`);
        return outputMin; // Fallback
    }
    const clampedValue = Math.min(Math.max(value, inputMin), inputMax);
    return ((clampedValue - inputMin) * (outputMax - outputMin)) / (inputMax - inputMin) + outputMin;
}

function mapRangeInverse(value, outMin, outMax, inMin, inMax) {
    if (value === null || value === undefined) {
        console.error(`Valore non definito per mapRange: ${value}`);
        return outMax; // Fallback
    }
    if (isNaN(value)) {
        console.error(`Valore non basso per mapRange: ${value}`);
        return outMax; // Fallback
    }
    return (value - outMin) * (inMax - inMin) / (outMax - outMin) + inMin;
}

// Funzione di mappatura dei valori in forma logaritmica
function mapRangeLog(value, inputMin, inputMax, outputMin, outputMax) {
    if (value === null || value === undefined) {
        console.error(`Valore non definito per mapRangeLog: ${value}`);
        return outputMin; // Fallback
    }
    if (isNaN(value)) {
        console.error(`Valore non basso per mapRangeLog: ${value}`);
        return outputMin; // Fallback
    }
    const clampedValue = Math.min(Math.max(value, inputMin), inputMax);
    const normalizedValue = (clampedValue - inputMin) / (inputMax - inputMin);
    const logValue = Math.log10(normalizedValue + 1); // Logaritmo base 10
    return logValue * (outputMax - outputMin) + outputMin;
}

// Funzione per determinare il tipo di filtro in base al contrasto
function getFilterType(luminosità) {
    if (luminosità> 75) return "highpass";
    if (luminosità > 50) return "bandpass";
    return "lowpass";
}

// Funzione per determinare il tipo di filtro in base al contrasto
function getrolloffType(nitidezza) {
    console.log("Rolloff", nitidezza);
    if (nitidezza > 75) return -96;
    if (nitidezza > 50) return -48;
    if (nitidezza > 25) return -24;
    return -12 ;
}

// Funzione per determinare il tipo di filtro in base al contrasto
function getToneString(averageS) {
    if (averageS > 66) return "saw";
    if (averageS > 33) return "square";
    return "sine";
}
