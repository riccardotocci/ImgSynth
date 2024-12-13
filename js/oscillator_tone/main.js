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


document.getElementById("playSequence").addEventListener("click", async () => {
    await Tone.start();
    console.log("Playing sequence...");

    const now = Tone.now();
    const notes = ["C4", "E4", "G4", "B4"];
    const durationPerNote = 0.5; // Durata di ciascuna nota in secondi
    const totalDuration = notes.length * durationPerNote; // Durata totale della sequenza
    const noiseType = document.getElementById("noiseType").value;

    // Aggiorna il tipo di rumore
    updateNoiseSource(noiseType);

    // Avvia il rumore
    playNoise();

    // Riproduzione delle note
    notes.forEach((note, index) => {
        oscillators.forEach((osc) => {
            if (osc.isActive) {
                osc.synth.triggerAttackRelease(note, "8n", now + index * durationPerNote);
            }
        });
    });

    // Arresta il rumore dopo la durata totale della sequenza
    setTimeout(() => {
        stopNoise();
    }, totalDuration * 1000);
});


// Riproduzione di un accordo
document.getElementById("playChord").addEventListener("click", async () => {
    await Tone.start();
    console.log("Playing chord...");
    const chord = ["C4", "E4", "G4"];
    const noiseType = document.getElementById("noiseType").value;
    const duration = 2; // Durata in secondi
    oscillators.forEach((osc) => {
        if (osc.isActive) {
            osc.synth.triggerAttackRelease(chord, "2n");
        }
    });
    // Riproduzione del rumore
    updateNoiseSource(noiseType);
    playNoise(); // Avvia il rumore

    // Arresta il rumore dopo la durata specificata
    setTimeout(() => {
        stopNoise(); // Ferma il rumore
    }, duration * 1000);
});

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
                            osc.synth.triggerAttack(frequency);
                        } else if (status === 128 || (status === 144 && velocity === 0)) { // Nota rilasciata
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