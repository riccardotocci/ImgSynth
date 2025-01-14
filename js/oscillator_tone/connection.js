oscillators.forEach((osc, index) => {
    if (osc.gain && osc.panner) {
        osc.gain.connect(osc.panner); 

        osc.panner.connect(dryGain);
        osc.panner.connect(sharedFilter);

        console.log(`Oscillatore ${index + 1} collegato al filtro condiviso.`);
    } else {
        console.error(`Oscillatore ${index + 1}, Filtro o Mixer non configurati.`);
    }
});

dryGain.connect(mixNode);

sharedFilter.connect(wetGain);
wetGain.connect(mixNode);

mixNode.connect(Tone.Destination);

Tone.Destination.connect(analyser);

// Funzione per aggiornare la catena audio quando si attivano/disattivano effetti
function updateEffectChain(effects) {
    // Disconnetti tutto dalla destinazione
    mixNode.disconnect();

    // Ricostruisci la catena audio basandoti sugli effetti attivi
    let currentNode = mixNode;

    effects.forEach(({ isEnabled, effectInstance }) => {
        if (isEnabled) {
            currentNode.connect(effectInstance);
            currentNode = effectInstance; // Aggiorna il nodo corrente
        }
    });

    // Connetti l'ultimo nodo alla destinazione
    currentNode.connect(Tone.Destination);
    console.log("Catena audio aggiornata con effetti abilitati");
}

// Funzione per inizializzare i toggle degli effetti
function initializeEffectToggles(effectToggles) {
    effectToggles.forEach(({ toggleId, effectInstance }) => {
        const toggleControl = document.getElementById(toggleId);
        if (toggleControl) {
            toggleControl.addEventListener("change", () => {
                // Aggiorna lo stato dell'effetto
                const isEnabled = toggleControl.checked;
                const effect = effectToggles.find(e => e.effectInstance === effectInstance);
                if (effect) effect.isEnabled = isEnabled;

                // Ricostruisci la catena audio
                updateEffectChain(effectToggles);

                console.log(`${effectInstance.name || "Effetto"} toggle: ${isEnabled}`);
            });
        }
    });
}

// Esegui al caricamento della pagina
document.addEventListener("DOMContentLoaded", () => {
    // Definisci gli effetti e i relativi toggle
    const effectToggles = [
        {
            toggleId: "distortionToggle",
            effectInstance: distortion,
            isEnabled: false,
        },
        {
            toggleId: "chorusToggle",
            effectInstance: chorus,
            isEnabled: false,
        },
        {
            toggleId: "delayToggle",
            effectInstance: delay,
            isEnabled: false,
        },
        {
            toggleId: "reverbToggle",
            effectInstance: reverb,
            isEnabled: false,
        },
        {
            toggleId: "limiterToggle",
            effectInstance: limiter,
            isEnabled: false,
        },
    ];

    // Inizializza i toggle
    initializeEffectToggles(effectToggles);
});

