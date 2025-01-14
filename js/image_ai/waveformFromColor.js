let isPlaying = false;

const colorPicker = document.getElementById('colorPicker');
const startStopButton = document.getElementById('startStop');
const waveformInfo = document.getElementById('waveformInfo');
const waveformCanvas = document.getElementById('waveformCanvas');

// Convert HEX to HSL
function hexToHSL(hex) {
    let r = 0, g = 0, b = 0;
    if (hex.length === 4) {
        r = parseInt(hex[1] + hex[1], 16);
        g = parseInt(hex[2] + hex[2], 16);
        b = parseInt(hex[3] + hex[3], 16);
    } else if (hex.length === 7) {
        r = parseInt(hex[1] + hex[2], 16);
        g = parseInt(hex[3] + hex[4], 16);
        b = parseInt(hex[5] + hex[6], 16);
    }
    r /= 255;
    g /= 255;
    b /= 255;
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0, s = 0, l = (max + min) / 2;

    if (max !== min) {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }
    console.log(`HSL: ${h * 360}, ${s * 100}%, ${l * 100}%`);

    return {
        h: Math.round(h * 360),
        s: Math.round(s * 100),
        l: Math.round(l * 100),
    };
}



// Map color to waveform properties
function colorToWaveform(color) {
    console.log(`Color: ${color}`);
    let hsl = hexToHSL(color);
    let { h, s, l } = hsl;
    console.log(`Hue: ${h}, Saturation: ${s}, Lightness: ${l}`);

    // Map hue to waveform type
    let waveType;
    if (h >= 180 && h < 300) waveType = 'sine'; // Blu, Verde
    else if ((h > 0 && h < 40) || (h >= 300 && h <= 360)) waveType = 'square'; // Rosso, Nero
    else if (h >= 40 && h < 90) waveType = 'sawtooth'; // Giallo, Arancione
    else if (h >= 90 && h < 180) waveType = 'triangle'; // Verde chiaro, Azzurro
    else if (s === 0) waveType = 'noise'; // Grigio
    else waveType = 'noise'; // Default
    const sat=s;
    const light=l;
    // Map saturation to amplitude (0.1 to 1.0)
    const amplitude = Math.max(0.1, s / 100);

    // Map lightness to frequency (50 Hz to 2000 Hz)
    const frequency = 50 + (l / 100) * 1950;

    return { waveType, frequency, amplitude, sat, light };
}

// Draw waveform on canvas
function drawWaveform(waveType) {
    clearCanvas();
    canvasContext_w.strokeStyle = 'black';
    canvasContext_w.lineWidth = 2;

    canvasContext_w.beginPath();
    for (let x = 0; x < waveformCanvas.width; x++) {
        const t = (x / waveformCanvas.width) * 2 * Math.PI;
        let y;
        switch (waveType) {
            case 'sine':
                y = Math.sin(t);
                break;
            case 'square':
                y = t % (2 * Math.PI) > Math.PI ? 1 : -1;
                break;
            case 'sawtooth':
                y = 2 * (t / (2 * Math.PI) - Math.floor(t / (2 * Math.PI) + 0.5));
                break;
            case 'triangle':
                y = 2 * Math.abs(2 * (t / (2 * Math.PI) - Math.floor(t / (2 * Math.PI) + 0.5))) - 1;
                break;
            default:
                y = Math.random() * 2 - 1; // Noise
                break;
        }
        const yPos = waveformCanvas.height / 2 - y * (waveformCanvas.height / 4);
        if (x === 0) canvasContext.moveTo(x, yPos);
        else canvasContext.lineTo(x, yPos);
    }
    canvasContext.stroke();
}

// Clear canvas
function clearCanvas() {
    canvasContext.clearRect(0, 0, waveformCanvas.width, waveformCanvas.height);
}