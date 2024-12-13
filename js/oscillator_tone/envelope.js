const updateEnvelope = (oscillatorIndex, config = adsrConfig) => {
    const synth = oscillators[oscillatorIndex].synth; // Accedi al synth dell'oscillatore
    synth.set({
        envelope: {
            attack: config.attack,
            decay: config.decay,
            sustain: config.sustain,
            release: config.release,
        },
    });
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


