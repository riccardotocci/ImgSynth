let imgp5; // Variabile per immagazzinare l'immagine
let imgOriginal; // Per immagazzinare l'immagine originale
let waveTypes = []; // Array per le forme d'onda correnti
let noteActive = false; // Stato della pressione della nota

function setup() {
    // Creare il canvas
    const canvas = createCanvas(800, 600);
    canvas.id('canvasp5');
    canvas.parent('canvas-container');
    noLoop();
}

function draw() {
    console.log('draw() called');
    if (noteActive) {
        // Gioco di colori basato sui range delle waveform attive
        background(0); // Sfondo nero
        waveTypes.forEach((waveType, index) => {
            const range = waveformToRange(waveType);
            const color = rangeToColor(range);

            // Disegna rettangoli colorati che rappresentano i range
            fill(color[0], color[1], color[2]);
            noStroke();
            rect(index * width / waveTypes.length, 0, width / waveTypes.length, height);
        });
    } else {
        // Stato inattivo: solo sfondo nero
        background(0);
    }
}

function setWaveTypes(newWaveTypes) {
    waveTypes = newWaveTypes;
    redraw(); // Ridisegna il canvas quando cambiano le waveform
}

// Funzione per ottenere il range di tonalità HSL per ogni waveform
function waveformToRange(waveType) {
    switch (waveType) {
        case 'sine':
            return [180, 300]; // Blu, Verde
        case 'square':
            return [0, 40, 300, 360]; // Rosso, Nero
        case 'sawtooth':
            return [40, 90]; // Giallo, Arancione
        case 'triangle':
            return [90, 180]; // Verde chiaro, Azzurro
        default:
            return [0, 0]; // Default, nessun range
    }
}

// Funzione per convertire un range in un colore RGB
function rangeToColor(range) {
    const h = random(range[0], range[1]); // Genera un valore casuale all'interno del range
    const s = random(50, 100); // Saturazione casuale
    const l = random(50, 75); // Luminosità casuale
    return hslToRgb(h, s, l); // Converte HSL in RGB
} // Grigio per default


// Event Listener per pressione di note
function notePressed() {
    noteActive = true; // Attiva la visualizzazione dei colori
    redraw(); // Ridisegna il canvas
}

function noteReleased() {
    noteActive = false; // Disattiva il gioco di colori
    redraw(); // Ridisegna il canvas
}

// Collegare i tasti MIDI o la tastiera
function startVisualizationFromKey() {
    noteActive = true; // Attiva lo stato di visualizzazione
    redraw(); // Ridisegna il canvas per visualizzare i colori
}

function startVisualizationFromMIDI(note) {
    console.log(`Nota MIDI premuta: ${note}`);
    noteActive = true; // Attiva lo stato di visualizzazione
    redraw(); // Ridisegna il canvas per visualizzare i colori
}

function stopVisualization() {
    noteActive = false; // Disattiva lo stato di visualizzazione
    console.log('Returning to standard view');
    redraw(); // Torna in stato inattivo
}




