function updateVolume(index,osc, volume) {
    if (osc.synth) {
        osc.synth.volume.value = volume;
    } else {
        console.error(`Canale Mixer non trovato per Oscillatore ${index + 1}.`);
    }
}

// Aggiungi Event Listeners agli slider
document.addEventListener("DOMContentLoaded", () => {
    oscillators.forEach((osc, index) => {
        const slider = document.getElementById(`volume${index + 1}`);
        const valueDisplay = document.getElementById(`volume${index + 1}Value`);

        if (slider) {
            slider.addEventListener("input", (e) => {
                const volume = parseFloat(e.target.value);
                updateVolume(index,osc, volume);
                // Aggiorna il valore visualizzato accanto allo slider
                if (valueDisplay) {
                    valueDisplay.textContent = `${volume} dB`;
                }
            });
        }
    });
});



