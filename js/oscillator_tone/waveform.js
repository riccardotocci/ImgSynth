const waveforms = ['sine', 'square', 'triangle', 'sawtooth'];

function drawWaveformoscillator(index, type) {
    const canvas = document.getElementById(`waveformCanvas${index}`);
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    const midY = height / 2;

    // Pulisci il canvas
    ctx.clearRect(0, 0, width, height);

    // Disegna la forma d'onda
    ctx.beginPath();
    ctx.lineWidth = 2;
    ctx.strokeStyle = 'rgba(0, 0, 255, 0.69)';

    switch (type) {
        case 'sine':
            for (let x = 0; x < width; x++) {
                const y = midY + Math.sin((x / width) * 2 * Math.PI) * (height / 4);
                x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
            }
            break;

        case 'square':
            ctx.moveTo(0, midY - height / 4);
            ctx.lineTo(width / 2, midY - height / 4);
            ctx.lineTo(width / 2, midY + height / 4);
            ctx.lineTo(width, midY + height / 4);
            break;

        case 'triangle':
            ctx.moveTo(0, midY + height / 4);
            ctx.lineTo(width / 2, midY - height / 4);
            ctx.lineTo(width, midY + height / 4);
            break;

        case 'sawtooth':
            ctx.moveTo(0, midY + height / 4);
            ctx.lineTo(width/2, midY - height / 4);
            ctx.lineTo((width/2)+0.001, midY + height / 4);
            ctx.lineTo(width, midY - height / 4);
            break;
    }
    ctx.stroke();
}

function changeWaveform(index, direction) {
    // Ottieni l'etichetta corrente
    const waveformLabel = document.getElementById(`waveformLabel${index}`);
    const currentLabel = waveformLabel.textContent.toLowerCase();
    const currentWaveformIndex = waveforms.indexOf(currentLabel);
    const newWaveformIndex = (currentWaveformIndex + direction + waveforms.length) % waveforms.length;

    const newWaveform = waveforms[newWaveformIndex];
    waveformLabel.textContent = newWaveform.charAt(0).toUpperCase() + newWaveform.slice(1);

    // Aggiorna la forma d'onda nell'oscillatore
    if (typeof updateOscillatorParameter === 'function') {
        updateOscillatorParameter(index, 'waveform', newWaveform);
    } else {
        console.warn('updateOscillatorParameter non è disponibile!');
    }

    // Ridisegna la forma d'onda
    drawWaveformoscillator(index, newWaveform);
}

// Disegna le forme d'onda iniziali per tutti gli oscillatori
for (let i = 0; i < 3; i++) {
    drawWaveformoscillator(i, 'sine');
}

function setPresetWaveform(index, preset) {
    if (!waveforms.includes(preset)) {
        console.warn('Preset waveform non valida!');
        return;
    }

    const waveformLabel = document.getElementById(`waveformLabel${index}`);
    waveformLabel.textContent = preset.charAt(0).toUpperCase() + preset.slice(1);

    // Aggiorna la forma d'onda nell'oscillatore
    if (typeof updateOscillatorParameter === 'function') {
        updateOscillatorParameter(index, 'waveform', preset);
    } else {
        console.warn('updateOscillatorParameter non è disponibile!');
    }

    // Ridisegna la forma d'onda
    drawWaveformoscillator(index, preset);
}