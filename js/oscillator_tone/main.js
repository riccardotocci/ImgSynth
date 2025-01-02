// Funzione per aggiornare lo stato di un oscillatore
const toggleOscillator = (index) => {
    const osc = oscillators[index];
    osc.isActive = !osc.isActive;
    const button = document.getElementById(`oscillatorToggle${osc.id}`);
    button.textContent = osc.isActive ? "ON" : "OFF";
    console.log(`Oscillatore ${osc.id} ${osc.isActive ? "attivato" : "disattivato"}`);
};

const toggleNoise = (noise) => {
    noise.isActive = !noise.isActive;
    const button = document.getElementById(`NoiseToggle`);
    button.textContent = noise.isActive ? "ON" : "OFF";
    console.log(`Noise ${noise.isActive ? "attivato" : "disattivato"}`);
};


document.getElementById("connectMIDI").addEventListener("click", async () => {
    if (navigator.requestMIDIAccess) {
        const midiAccess = await navigator.requestMIDIAccess();
        console.log("MIDI Connected");

        midiAccess.inputs.forEach((input) => {
            input.onmidimessage = (message) => {
                const [status, note, velocity] = message.data; // Estrai i dati MIDI
                const frequency = Tone.Frequency(note, "midi").toFrequency(); // Converti la nota MIDI in frequenza

                // Gestione degli oscillatori
                oscillators.forEach((osc) => {
                    if (osc.isActive) {
                        if (status === 144 && velocity > 0) { // Nota premuta
                            startVisualizationFromMIDI(note);
                            osc.synth.triggerAttack(frequency);
                        } else if (status === 128 || (status === 144 && velocity === 0)) {
                            stopVisualization(); // Nota rilasciata
                            osc.synth.triggerRelease(frequency);
                        }
                    }
                });

                // Gestione del rumore
                if (status === 144 && velocity > 0) { // Nota premuta
                    const noiseType = document.getElementById("noiseType").value; // Tipo di rumore
                    updateNoiseSource(noiseType); // Aggiorna la sorgente del rumore
                    playNoise(); // Avvia il rumore
                } else if (status === 128 || (status === 144 && velocity === 0)) { // Nota rilasciata
                    stopNoise(); // Arresta il rumore
                }
            };
        });
    } else {
        alert("MIDI non supportato dal browser.");
    }
});


document.addEventListener("click", async () => {
    await Tone.start();
    console.log("Contesto audio avviato");
});