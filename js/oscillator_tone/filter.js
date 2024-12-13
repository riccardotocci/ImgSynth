const frequencyControl = document.getElementById("sharedFilterFrequency");
if (frequencyControl) {
    frequencyControl.addEventListener("input", (e) => {
        const frequency = parseFloat(e.target.value);
        sharedFilter.frequency.value = frequency;
        console.log(`Frequenza del filtro condiviso aggiornata a ${frequency} Hz`);
    });
    
}

// Listener per modificare il tipo di filtro condiviso
const filterTypeControl = document.getElementById("sharedFilterType");
if (filterTypeControl) {
    filterTypeControl.addEventListener("change", (e) => {
        const type = e.target.value;
        sharedFilter.type = type;
        console.log(`Tipo di filtro condiviso aggiornato a ${type}`);
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

// Funzione per visualizzare il valore della frequenza condivisa
const displayFrequencyValue = document.getElementById("sharedFilterFrequencyValue");
if (displayFrequencyValue) {
    frequencyControl.addEventListener("input", (e) => {
        const frequency = parseFloat(e.target.value);
        displayFrequencyValue.textContent = `${frequency} Hz`;
    });
}


