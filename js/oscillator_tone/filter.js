const frequencyControl = document.getElementById("sharedFilterFrequency");
if (frequencyControl) {
    frequencyControl.addEventListener("input", (e) => {
        const frequency = parseFloat(e.target.value);
        sharedFilter.frequency.value = frequency;
    });
    
}

// Funzione per visualizzare il valore della frequenza condivisa
const displayFrequencyValue = document.getElementById("sharedFilterFrequencyValue");
if (displayFrequencyValue) {
    frequencyControl.addEventListener("input", (e) => {
        const frequency = parseFloat(e.target.value);
        displayFrequencyValue.textContent = `${frequency} Hz`;
    });
}

// Listener per modificare il tipo di filtro condiviso
const filterTypeControl = document.getElementById("sharedFilterType");
if (filterTypeControl) {
    filterTypeControl.addEventListener("change", (e) => {
        const type = e.target.value;
        sharedFilter.type = type;
        console.log(`Tipo di filtro condiviso aggiornato a ${sharedFilter.type}`);
    });
}

// Listener per modificare il rolloff del filtro condiviso
const rolloffControl = document.getElementById("sharedFilterRolloff");
if (rolloffControl) {
    rolloffControl.addEventListener("change", (e) => {
        const rolloff = parseInt(e.target.value, 10);
        sharedFilter.rolloff = rolloff;
        console.log(`Rolloff del filtro condiviso aggiornato a ${rolloff} dB/oct`);
    });
}

// Listener per modificare il Q del filtro condiviso
const qualityControl = document.getElementById("sharedFilterQ");
const qualityValueDisplay = document.getElementById("sharedFilterQValue");

if (qualityControl) {
    qualityControl.addEventListener("input", (e) => {
        const qValue = parseFloat(e.target.value);
        sharedFilter.Q.value = qValue; // Aggiorna il Q del filtro condiviso
        qualityValueDisplay.textContent = qValue.toFixed(1); // Aggiorna l'interfaccia utente
        console.log(`Qualità (Q) del filtro condiviso aggiornata a: ${qValue}`);
    });
}

// Crea due nodi di guadagno per il mix
const wetGain = new Tone.Gain(0.5); // Segnale filtrato
const dryGain = new Tone.Gain(0.5); // Segnale non filtrato

// Crea un mixer per sommare i due segnali
const mixNode = new Tone.Gain();

// Aggiorna il mix tra wet e dry
function updateMix(wetRatio) {
    const dryRatio = 1 - wetRatio; // Il resto è il segnale dry
    wetGain.gain.value = wetRatio;
    dryGain.gain.value = dryRatio;

}
// Listener per modificare il Q del filtro condiviso
const mixControl = document.getElementById("mixFilter");
const mixControlDisplay = document.getElementById("mixFilterValue");

if (mixControl) {
    mixControl.addEventListener("input", (e) => {
        const mixValue = parseFloat(e.target.value);
        updateMix(mixValue); // Aggiorna il Q del filtro condiviso // Aggiorna l'interfaccia utente
        mixControlDisplay.textContent = `${(mixValue * 100).toFixed(1)}%`; // Aggiorna l'interfaccia utente
    });
}
