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
            console.warn("Shared filter not compatible, directly connecting to the destination.");
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
        console.warn("Slider.js not found. Noise slider configuration skipped.");
    }
}

// Resto delle funzioni per gestire il rumore
function updateNoiseSource(type) {
    if (noiseSource) {
        try {
            noiseSource.stop();
        } catch (error) {
            console.warn("Error stopping the previous noise:", error);
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
    } catch (error) {
        console.warn("Error starting the noise:", error);
    }
}

function stopNoise() {
    if (noiseSource) {
        try {
            noiseSource.stop();
        } catch (error) {
            console.warn("Error stopping the noise:", error);
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
    } else {
        console.warn("Noise gain node not found.");
    }
});

