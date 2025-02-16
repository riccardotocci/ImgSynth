const keyLabels = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
const keyboardSvg = document.querySelector("svg");
let currentOctave = 4; // Ottava di default


// Evento per cambiare l'ottava
document.getElementById("octaveControl").addEventListener("input", (e) => {
    currentOctave = parseInt(e.target.value, 10);
    console.log(`Ottava aggiornata: ${currentOctave}`);
});

// Aggiungi eventi ai tasti esistenti nella tastiera SVG
document.querySelectorAll("rect").forEach((keyRect) => {
    const baseNote = keyRect.getAttribute("data-note");
    const isSecondOctave = keyRect.id.includes("second-octave");

    // Aggiungi eventi per mouse e touch
    keyRect.addEventListener("mousedown", () => {
        let note = baseNote + (isSecondOctave ? currentOctave + 1 : currentOctave);
        handleKeyPress(keyRect, note);
    });
    keyRect.addEventListener("mouseup", handleKeyRelease);
    keyRect.addEventListener("touchstart", (e) => {
        e.preventDefault();
        let note = baseNote + (isSecondOctave ? currentOctave + 1 : currentOctave);
        handleKeyPress(keyRect, note);
    });
    keyRect.addEventListener("touchend", handleKeyRelease);
});

function handleKeyPress(keyRect, note) {
    keyRect.classList.add("pressed");

    // Costruisci la nota con l'ottava corrente
    const fullNote = note;
    console.log(`Tasto premuto: ${fullNote}`);

    // Attiva gli oscillatori
    oscillators.forEach((osc, index) => {
        if (osc.isActive) {
            console.log(`Oscillatore ${index + 1}: Nota ${fullNote} inviata`);
            osc.synth.triggerAttack(fullNote);
        }
    });

    // Attiva il rumore
    playNoise();
}

function handleKeyRelease() {
    document.querySelectorAll("rect.pressed").forEach((key) => key.classList.remove("pressed"));

    // Rilascia le note sugli oscillatori
    oscillators.forEach((osc) => {
        if (osc.isActive) {
            osc.synth.releaseAll();

        }
    });

    // Ferma il rumore
    stopNoise();
}

