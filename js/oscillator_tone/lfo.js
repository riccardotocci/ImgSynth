// Funzione per configurare i controlli di un parametro di una sorgente
function setupModMatrixControl(sourceName, paramName, controlId) {
    const control = document.getElementById(controlId);
    if (control) {
        control.addEventListener("input", (e) => {
            const value = parseFloat(e.target.value);
            updateModMatrixParameter(sourceName, paramName, value);
        });
        console.log(`Controllo ${controlId} configurato per ${sourceName} ${paramName}`);
    } else {
        console.warn(`Controllo ${controlId} non trovato per ${sourceName} ${paramName}`);
    }
}

// Configura i controlli per LFO1
setupModMatrixControl("LFO1", "frequency", "lfo1Frequency");
setupModMatrixControl("LFO1", "min", "lfo1Min");
setupModMatrixControl("LFO1", "max", "lfo1Max");
setupModMatrixControl("LFO1", "amplitude", "lfo1Amplitude");

// Configura i controlli per LFO2
setupModMatrixControl("LFO2", "frequency", "lfo2Frequency");
setupModMatrixControl("LFO2", "min", "lfo2Min");
setupModMatrixControl("LFO2", "max", "lfo2Max");
setupModMatrixControl("LFO2", "amplitude", "lfo2Amplitude");


