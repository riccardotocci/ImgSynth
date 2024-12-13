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
        updateNoiseSource(document.getElementById("noiseType").value);
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
    // Seleziona tutti gli elementi con classe carousel-cell
    const carouselCells = document.querySelectorAll(".carouselnoise .carousel-cell");

    // Aggiungi un listener di clic a ciascun elemento
    carouselCells.forEach((cell) => {
        cell.addEventListener("click", () => {
            // Ottieni il valore del tipo di rumore
            const noiseType = cell.getAttribute("value");

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

            // Evidenzia l'elemento selezionato (stile attivo)
            carouselCells.forEach((cell) => cell.classList.remove("active"));
            cell.classList.add("active");
        });
    });
});
function setNoiseTypeFromArgument(noiseType) {
    const carouselCells = document.querySelectorAll(".carouselnoise .carousel-cell");

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

    // Evidenzia l'elemento selezionato (stile attivo)
    carouselCells.forEach((cell) => {
        if (cell.getAttribute("value") === noiseType) {
            cell.classList.add("active");
        } else {
            cell.classList.remove("active");
        }
    });
}


