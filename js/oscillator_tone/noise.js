let noiseSource = null;
let noiseGainNode = null;

// Configura e collega il rumore
function setupNoise() {
    if (!noiseGainNode) {
        noiseGainNode = new Tone.Gain();

        // Collegamento al filtro o direttamente all'output
        if (sharedFilter && sharedFilter.input) {
            noiseGainNode.connect(sharedFilter);
        } else if (sharedFilter instanceof Tone.Filter) {
            noiseGainNode.connect(sharedFilter);
        } else {
            noiseGainNode.toDestination();
            console.warn("Filtro condiviso non compatibile, collegamento diretto alla destinazione.");
        }

        console.log("Nodo di guadagno del rumore configurato e collegato.");
    }

    // Integra slider configurato in `slider.js`
    if (typeof sliderConfigs !== "undefined") {
        sliderConfigs.noiseVolume.onChange = (value) => {
            noiseGainNode.gain.value = Math.pow(10, value / 20);
            document.getElementById("noiseVolumeValue").innerText = value.toFixed(1);
        };
    } else {
        console.warn("Slider.js non trovato. Configurazione dello slider del rumore saltata.");
    }
}

// Resto delle funzioni per gestire il rumore
function updateNoiseSource(type) {
    if (noiseSource) {
        try {
            noiseSource.stop();
        } catch (error) {
            console.warn("Errore nel fermare il rumore precedente:", error);
        }
        noiseSource.disconnect();
    }

    noiseSource = new Tone.Noise(type || "white");
    noiseSource.connect(noiseGainNode);
}

function playNoise() {
    if (!noiseSource) {
        updateNoiseSource(document.getElementById("noiseType").value || "white");
    }
    try {
        noiseSource.start();
        console.log("Noise started.");
    } catch (error) {
        console.warn("Errore nell'avviare il rumore:", error);
    }
}

function stopNoise() {
    if (noiseSource) {
        try {
            noiseSource.stop();
            console.log("Noise stopped.");
        } catch (error) {
            console.warn("Errore nel fermare il rumore:", error);
        }
    }
}

// Inizializzazione quando il DOM è pronto
document.addEventListener("DOMContentLoaded", () => {
    setupNoise();
});

document.addEventListener("DOMContentLoaded", () => {
    // Seleziona l'elemento <select>
    const noiseSelect = document.querySelector("#noiseTypeSelect");

    // Aggiungi un listener di cambiamento (change) al <select>
    noiseSelect.addEventListener("change", () => {
        // Ottieni il valore selezionato
        const noiseType = noiseSelect.value;

        // Verifica se la funzione updateNoiseSource è definita
        if (typeof updateNoiseSource === "function") {
            try {
                updateNoiseSource(noiseType); // Aggiorna il tipo di rumore
                console.log(`Tipo di rumore aggiornato a: ${noiseType}`);
            } catch (error) {
                console.error("Errore durante l'aggiornamento del rumore:", error);
            }
        } else {
            console.error("Funzione updateNoiseSource non trovata.");
        }
    });
});

function setNoiseTypeFromArgument(noiseType) {
    const noiseSelect = document.querySelector("#noiseTypeSelect");

    if (noiseSelect) {
        // Aggiorna il valore del <select>
        noiseSelect.value = noiseType;

        // Aggiorna il tipo di rumore
        if (typeof updateNoiseSource === "function") {
            try {
                updateNoiseSource(noiseType);
                console.log(`Tipo di rumore aggiornato a: ${noiseType}`);
            } catch (error) {
                console.error("Errore durante l'aggiornamento del rumore:", error);
            }
        } else {
            console.error("Funzione updateNoiseSource non trovata.");
        }
    } else {
        console.error("Elemento <select> con id 'noiseTypeSelect' non trovato.");
    }
}

document.addEventListener("DOMContentLoaded", () => {
    if (noiseGainNode) {
        noiseGainNode.gain.value = Math.pow(10, -60 / 20);
        document.getElementById("noiseVolumeValue").innerText = (-60).toFixed(1);
        console.log("Volume del rumore inizializzato a -60 dB.");
    } else {
        console.warn("Nodo di guadagno del rumore non trovato.");
    }
});

