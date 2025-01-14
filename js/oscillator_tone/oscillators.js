const updateOscillatorParameter = (index, param, value) => {
    const osc = oscillators[index];

    switch (param) {
        case "detune":
            osc.config.detune = value;
            osc.synth.set({
                detune: value + osc.config.pitch * 100 + osc.config.octave * 1200,
            });
            console.log(`Oscillatore ${index + 1} detune impostato su ${value}`);
            break;

            case "pan":
                // Usa Tone.Panner per il controllo del pan
                if (!osc.panner) {
                    osc.panner = new Tone.Panner(0).toDestination();
                    osc.synth.connect(osc.panner); // Connetti il synth al panner
                }
            
                osc.panner.pan.value = value; // Imposta il valore del pan
                console.log(`Oscillatore ${index + 1} pan impostato su ${value}`);
                break;
            

        case "octave":
            osc.config.octave = value;
            osc.synth.set({
                detune: osc.config.detune + osc.config.pitch * 100 + value * 1200,
            });
            console.log(`Oscillatore ${index + 1} ottava impostata su ${value}`);
            break;

        case "pitch":
            osc.config.pitch = value;
            osc.synth.set({
                detune: osc.config.detune + value * 100 + osc.config.octave * 1200,
            });
            console.log(`Oscillatore ${index + 1} pitch impostato su ${value}`);
            break;

        case "harmonics":
            osc.config.harmonics = value;
            // Aggiungi logica per armoniche se necessario
            console.log(`Oscillatore ${index + 1} armoniche impostate su ${value}`);
            break;

        case "waveform":
            osc.config.waveform = value;
            osc.synth.set({ oscillator: { type: value } });
            console.log(`Oscillatore ${index + 1} forma d'onda impostata su ${value}`);
            break;

        default:
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

