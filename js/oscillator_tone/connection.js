oscillators.forEach((osc, index) => {
    if (osc.synth && osc.channel) {
        osc.synth.connect(osc.channel);      // Oscillatore → Filtro individuale   // Filtro individuale → Mixer
        osc.channel.connect(sharedFilter); // Mixer → Filtro condiviso

        // Aggiungi un trigger per l'inviluppo del rumore
        osc.synth.triggerAttackRelease("C4", "4n", Tone.now() + index * 0.5, undefined, () => {
            noiseEnvelope.triggerAttackRelease("4n", Tone.now() + index * 0.5);
        });
        console.log(`Oscillatore ${index + 1} collegato al filtro condiviso.`);
    } else {
        console.error(`Oscillatore ${index + 1}, Filtro o Mixer non configurati.`);
    }
});

// Catena iniziale degli effetti
sharedFilter.connect(Tone.Destination); // Connetti solo il filtro alla destinazione
// Collega il rumore al filtro condiviso

// Collega l'analizzatore per la visualizzazione dello spettro
Tone.Destination.connect(analyser);

console.log("Catena audio iniziale configurata");

// Funzione per aggiornare la catena audio quando si abilita/disabilita un effetto
function updateEffectChain(isEnabled, effectInstance) {
    oscillators.forEach((osc) => {
        // Disconnetti qualsiasi connessione esistente
        osc.synth.disconnect();

        if (isEnabled) {
            // Connetti con l'effetto attivato
            osc.synth.chain(sharedFilter, effectInstance, Tone.Destination);
            console.log(`${effectInstance.name || "Effetto"} abilitato`);
        } else {
            // Disconnetti esplicitamente l'effetto e collega direttamente
            if (effectInstance.disconnect) effectInstance.disconnect();
            osc.synth.chain(sharedFilter, Tone.Destination);
            console.log(`${effectInstance.name || "Effetto"} disabilitato`);
        }
    });
}


// Event Listeners per i toggle degli effetti
document.addEventListener("DOMContentLoaded", () => {
    // Distortion
    const distortionToggleControl = document.getElementById("distortionToggle");
    if (distortionToggleControl) {
        distortionToggleControl.addEventListener("change", (e) => {
            const isEnabled = e.target.checked;
            updateEffectChain(isEnabled, distortion);
            console.log(`Distortion toggle: ${isEnabled}`);
        });
    }

    // Chorus
    const chorusToggleControl = document.getElementById("chorusToggle");
    if (chorusToggleControl) {
        chorusToggleControl.addEventListener("change", (e) => {
            const isEnabled = e.target.checked;
            updateEffectChain(isEnabled, chorus);
            console.log(`Chorus toggle: ${isEnabled}`);
        });
    }

    // Delay
    const delayToggleControl = document.getElementById("delayToggle");
    if (delayToggleControl) {
        delayToggleControl.addEventListener("change", (e) => {
            const isEnabled = e.target.checked;
            updateEffectChain(isEnabled, delay);
            console.log(`Delay toggle: ${isEnabled}`);
        });
    }

    // Reverb
    const reverbToggleControl = document.getElementById("reverbToggle");
    if (reverbToggleControl) {
        reverbToggleControl.addEventListener("change", (e) => {
            const isEnabled = e.target.checked;
            updateEffectChain(isEnabled, reverb);
            console.log(`Reverb toggle: ${isEnabled}`);
        });
    }

    // Limiter
    const limiterToggleControl = document.getElementById("limiterToggle");
    if (limiterToggleControl) {
        limiterToggleControl.addEventListener("change", (e) => {
            const isEnabled = e.target.checked;
            limiter.mute = !isEnabled; // Muta il limiter se disattivato
            console.log(`Limiter toggle: ${isEnabled}`);
        });
    }
});
