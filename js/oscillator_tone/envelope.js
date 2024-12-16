const updateEnvelope = (oscillatorIndex, config = adsrConfig) => {
    const osc = oscillators[oscillatorIndex]; // Accedi all'oscillatore specifico
    if (!osc || !osc.synth) {
        console.error(`Oscillatore ${oscillatorIndex + 1} non trovato o non configurato.`);
        return;
    }

    // Aggiorna l'envelope nel synth
    osc.synth.set({
        envelope: {
            attack: config.attack,
            decay: config.decay,
            sustain: config.sustain,
            release: config.release,
        },
    });

    // Aggiorna anche il riferimento locale nell'oscillatore
    osc.envelope.attack = config.attack;
    osc.envelope.decay = config.decay;
    osc.envelope.sustain = config.sustain;
    osc.envelope.release = config.release;

    console.log(`Envelope aggiornato per l'oscillatore ${oscillatorIndex + 1}:`, config);
};

// Event listener per aggiornare i controlli ADSR
document.addEventListener("DOMContentLoaded", () => {
    ["attack", "decay", "sustain", "release"].forEach((param) => {
        const knob = document.getElementById(param);
        const valueDisplay = document.getElementById(`${param}Value`);

        if (knob) {
            knob.addEventListener("input", (e) => {
                const value = parseFloat(e.target.value);

                // Aggiorna la configurazione ADSR globale
                adsrConfig[param] = value;

                // Mostra il valore aggiornato accanto al controllo
                if (valueDisplay) {
                    valueDisplay.textContent = value.toFixed(2);
                }

                // Aggiorna l'envelope per tutti gli oscillatori
                oscillators.forEach((_, index) => updateEnvelope(index));
            });
        }
    });
});


// Update envelope parameters dynamically
document.getElementById("filter-attack").addEventListener("input", (e) => {
    filterEnvelope.attack = parseFloat(e.target.value);
    document.getElementById("filter-attack-value").textContent = e.target.value;
    console.log(`Filter attack updated to: ${e.target.value}`);
});

document.getElementById("filter-decay").addEventListener("input", (e) => {
    filterEnvelope.decay = parseFloat(e.target.value);
    document.getElementById("filter-decay-value").textContent = e.target.value;
    console.log(`Filter decay updated to: ${e.target.value}`);
});

document.getElementById("filter-sustain").addEventListener("input", (e) => {
    filterEnvelope.sustain = parseFloat(e.target.value);
    document.getElementById("filter-sustain-value").textContent = e.target.value;
    console.log(`Filter sustain updated to: ${e.target.value}`);
});

document.getElementById("filter-release").addEventListener("input", (e) => {
    filterEnvelope.release = parseFloat(e.target.value);
    document.getElementById("filter-release-value").textContent = e.target.value;
    console.log(`Filter release updated to: ${e.target.value}`);
});

