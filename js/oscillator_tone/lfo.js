// Update envelope parameters dynamically
document.getElementById("lfo-frequency").addEventListener("input", (e) => {
    const newFrequency = parseFloat(e.target.value); // Leggi il valore dell'input
    lfo.frequency.value = newFrequency; // Imposta il valore sulla proprietà `.value`
    
    // Aggiorna il testo del valore visibile nell'interfaccia
    document.getElementById("lfo-frequency-value").textContent = newFrequency;
});

document.getElementById("lfo-min").addEventListener("input", (e) => {
    const newMin = parseFloat(e.target.value);
    lfo.min = newMin; // Imposta correttamente il valore minimo
    document.getElementById("lfo-min-value").textContent = newMin;
});

document.getElementById("lfo-max").addEventListener("input", (e) => {
    const newMax = parseFloat(e.target.value);
    lfo.max = newMax; // Imposta correttamente il valore massimo
    document.getElementById("lfo-max-value").textContent = newMax;
});

document.getElementById("lfo-amplitude").addEventListener("input", (e) => {
    const newAmplitude = parseFloat(e.target.value);
    lfo.amplitude.value = newAmplitude; // Imposta correttamente l'ampiezza
    document.getElementById("lfo-amplitude-value").textContent = newAmplitude;
});
// Variabile per controllare lo stato
let isActive = false;

// Funzione per gestire lo stato dell'LFO
function toggleLFO(state) {
    isActive = state;
    if (isActive) {
        lfo.start(); // Avvia l'LFO
    } else {
        lfo.stop(); // Ferma l'LFO
    }
}
// Select the single switch
const switchlfo = document.getElementById("lfotoggle");

// Initialize Switchery for the element
new Switchery(switchlfo, {
    color: 'rgba(116, 240, 0, 0.3)',         // ON color
    secondaryColor: 'rgba(255,255,255,0.3)', // OFF color
    jackColor: '#FFFFFF',    // Button color
    size: 'default',         // Size: small, default, large
});

// Event to handle the state
switchlfo.addEventListener("change", () => {
    toggleLFO(switchlfo.checked); // Sync with LFO state
});
