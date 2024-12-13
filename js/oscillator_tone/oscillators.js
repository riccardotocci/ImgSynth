const updateOscillatorParameter = (index, param, value) => {
    const osc = oscillators[index];

    if (param === "detune") {
        osc.config.detune = value;
        osc.synth.set({
            detune: value + osc.config.pitch * 100 + osc.config.octave * 1200,
        });
    } else if (param === "pan") {
        osc.config.pan = value;
        osc.synth.set({ pan: value });
        console.log(`Oscillatore ${index + 1} pan impostato su ${value}`);
        } else if (param in osc.config) {
        osc.config[param] = value;

        if (param === "waveform") {
            osc.synth.set({ oscillator: { waveform: value } });
            console.log(`Oscillatore ${index + 1} forma d'onda impostata su ${value}`);
        }
        } else {
        console.warn(`Parametro ${param} non valido per Oscillatore ${index + 1}`);
    }
};


// Event listener per gestire controlli dinamici
document.addEventListener("DOMContentLoaded", () => {
    // Gestisci knob e slider dinamicamente
    document.querySelectorAll(".input-knob").forEach((knob) => {
        knob.addEventListener("input", (e) => {
            const id = e.target.id; // Esempio: detuneKnob1
            const value = parseFloat(e.target.value);
            const [param, oscId] = id.replace("Knob", "").split(/(\d+)/);
            const index = parseInt(oscId, 10) - 1;

            // Aggiorna parametro
            if (!isNaN(index) && index >= 0 && index < oscillators.length) {
                updateOscillatorParameter(index, param, value);
                document.getElementById(`${id}Value`).textContent = value; // Aggiorna UI
            }
        });
    });

    // Gestisci forma d'onda
    document.querySelectorAll(".waveform-select").forEach((select) => {
        select.addEventListener("change", (e) => {
            const id = e.target.id; // Esempio: waveform1
            const value = e.target.value;
            const index = parseInt(id.replace("waveform", ""), 10) - 1;

            if (!isNaN(index) && index >= 0 && index < oscillators.length) {
                updateOscillatorParameter(index, "waveform", value);
            }
        });
    });

// Seleziona il primo elemento figlio di <body> (se esiste)
const firstElement = document.body.firstChild;

    // Seleziona tutti gli switch
    const switches = document.getElementById("firstrow").querySelectorAll(".js-switch");

    // Inizializza Switchery per ogni elemento
    switches.forEach((toggle, index) => {
        // Stile dello switch
        new Switchery(toggle, {
            color: 'rgba(0,0,240,0.3)',         // Colore ON
            secondaryColor: 'rgba(255,255,255,0.3)', // Colore OFF
            jackColor: '#FFFFFF',    // Colore del pulsante
            size: 'default',         // Dimensione: small, default, large
        });

        // Evento per gestire lo stato
        toggle.addEventListener("change", () => {
            const osc = oscillators[index];
            osc.isActive = toggle.checked; // Sincronizza con lo stato dell'oscillatore
            console.log(`Oscillatore ${index + 1} ${osc.isActive ? "attivato" : "disattivato"}`);
        });
    });



});
