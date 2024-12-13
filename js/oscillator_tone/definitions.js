const synthConfig = {
    oscillator: { type: "sine" },
    detune: 0,
    envelope: {
        attack: 0.5,
        decay: 0.2,
        sustain: 0.7,
        release: 0.5,
    },
};

var noise = new Tone.Noise("pink");

var gain = new Tone.Gain(0.5);

const oscillators = Array.from({ length: 3 }, (_, i) => {
    const synth = new Tone.PolySynth(Tone.Synth, synthConfig);
    console.log(`Oscillatore ${i + 1} creato`, synth);

    const detuneSignal = new Tone.Signal(0); 
    return {
        id: i + 1, // ID univoco
        isActive: true,
        config: {
            waveform: "sine",
            detune: 0,
            pitch: 0,
            octave: 0,
            harmonics: 1,
            voices: 1,
        },
        synth: synth,
        detuneSignal: detuneSignal,
    };
});


oscillators.forEach((osc, index) => {
    const channel = new Tone.Channel({
        volume: -6,    // Volume iniziale del canale
        pan: 0,        // Pan iniziale
        mute: false,   // Canale non muto di default
    }).toDestination(); // Collegamento del canale all'output principale

    osc.channel = channel;
    console.log(`Canale del mixer ${index + 1} creato`);
});


const sharedFilter = new Tone.Filter({
    type: "lowpass", // Tipo di filtro
    frequency: 1000, // Frequenza iniziale
    Q: 1,            // Fattore di qualità
    rolloff: -12,    // Rolloff del filtro
}).toDestination(); // Collega alla destinazione finale


const envelopeScaler = new Tone.Multiply(5000);

const filterEnvelope = new Tone.Envelope({
    attack: 0.5,          // Tempo di Attack
    decay: 0.2,           // Tempo di Decay
    sustain: 0.7,         // Livello di Sustain
    release: 0.5,         // Tempo di Release
});
const adsrConfig = {
    attack: 0.5,  // Valore iniziale di attack
    decay: 0.2,   // Valore iniziale di decay
    sustain: 0.7, // Valore iniziale di sustain
    release: 0.5, // Valore iniziale di release
};
// Configurazione globale degli effetti (unica per tutti gli oscillatori)
const effectsConfig = {
    reverbWet: 0.5,   // Livello del riverbero (0-1)
    delayTime: 300,   // Tempo del delay (millisecondi)
    distortionAmount: 0.5, // Quantità di distorsione (0-1)
    limiterThreshold: -10, // Soglia del limiter (dB)
    chorusDepth: 0.5,
    distortionType: "sine",
    chorusFrequency: 4,
    chorusSpread: 180,
    reverbSize: 0.5,
    reverbPreDelay: 0.1,
    limiterOn: true, // P,ofondità del chorus (0-1)
}

filterEnvelope.attack = adsrConfig.attack;
filterEnvelope.decay = adsrConfig.decay;
filterEnvelope.sustain = adsrConfig.sustain;
filterEnvelope.release = adsrConfig.release;

console.log("Envelope sincronizzato con il filtro condiviso:", adsrConfig);

// Crea istanze degli effetti
const reverb = new Tone.Reverb({ wet: effectsConfig.reverbWet });
const delay = new Tone.FeedbackDelay({
    delayTime: effectsConfig.delayTime / 1000,
    feedback: 0.3,  // Livello del feedback (ritorni)
    wet: 0.5,       // Quantità di segnale ritardato
});

const distortion = new Tone.Distortion(effectsConfig.distortionAmount);
const limiter = new Tone.Limiter(effectsConfig.limiterThreshold);
const chorus = new Tone.Chorus(4, effectsConfig.chorusDepth, 0.5).start(); // Chorus a 4Hz

const analyser = new Tone.Analyser("fft", 256);

// Creazione degli LFO
const lfo1 = new Tone.LFO({
    frequency: 0.5, // Frequenza iniziale in Hz
    min: 200,       // Valore minimo della modulazione
    max: 800,       // Valore massimo della modulazione
    amplitude: 0.5, // Ampiezza della modulazione
}).start(); // Avvia l'LFO

const lfo2 = new Tone.LFO({
    frequency: 1,   // Frequenza iniziale in Hz
    min: 0,         // Valore minimo della modulazione
    max: 1,         // Valore massimo della modulazione
    amplitude: 0.5, // Ampiezza della modulazione
}).start(); // Avvia l'LFO

console.log("LFO1 e LFO2 creati e avviati");

// Crea le destinazioni dinamicamente
const destinations = {
    filterFrequency: sharedFilter.frequency,
    delayWet: delay.wet,

};

oscillators.forEach((osc, index) => {
    destinations[`oscillator${index + 1}Detune`] = value => {
        osc.config.detune = value;
        if (osc.synth) {
            osc.synth.set({
                detune: value
            });
        }
    };
});

// Oscillator 1
destinations[`oscillator1Pitch`] = value => updateOscillatorParameter(0, "pitch", value);
destinations[`oscillator1Octave`] = value => updateOscillatorParameter(0, "octave", value);

// Oscillator 2
destinations[`oscillator2Pitch`] = value => updateOscillatorParameter(1, "pitch", value);
destinations[`oscillator2Octave`] = value => updateOscillatorParameter(1, "octave", value);

// Oscillator 3
destinations[`oscillator3Pitch`] = value => updateOscillatorParameter(2, "pitch", value);
destinations[`oscillator3Octave`] = value => updateOscillatorParameter(2, "octave", value);

// Crea l'oggetto modMatrix con le destinazioni aggiornate
const modMatrix = {
    sources: {
        LFO1: {
            instance: lfo1,
            parameters: {
                frequency: lfo1.frequency,
                amplitude: lfo1.amplitude,
                min: lfo1.min,
                max: lfo1.max,
            },
        },
        LFO2: {
            instance: lfo2,
            parameters: {
                frequency: lfo2.frequency,
                amplitude: lfo2.amplitude,
                min: lfo2.min,
                max: lfo2.max,
            },
        },
    },
    destinations: destinations, // Usa le destinazioni dinamiche
    connections: [], // Per gestire le connessioni dinamiche
};

let presets;

document.getElementById("presetSelector").addEventListener("change", (e) => {
    const selectedPreset = e.target.value;

    presets = {
        default: {
            // Configurazione degli oscillatori
            oscillators: [
                {
                    waveform: "sine", // Forma d'onda
                    detune: 0, // Cent di detune
                    octave: 0, // Shift di ottava
                    volume: -6, // Volume in dB
                },
                {
                    waveform: "triangle",
                    detune: -12,
                    octave: 0,
                    volume: -8,
                },
                {
                    waveform: "square",
                    detune: 12,
                    octave: 1,
                    volume: -10,
                },
            ],
    
            // Configurazione del filtro condiviso
            filterType: "low-pass", // Tipo di filtro: low-pass, band-pass, high-pass
            sharedFilterFrequency: 1000, // Frequenza del filtro (Hz)
            sharedFilterQ: 1, // Fattore di qualità del filtro
    
            // Configurazione dell'ADS Envelope
            attack: 0.5, // Tempo di attacco (secondi)
            decay: 0.2, // Tempo di decadimento (secondi)
            sustain: 0.7, // Livello di sustain (0-1)
            release: 0.5, // Tempo di rilascio (secondi)
    
            // Configurazione del riverbero
            reverb: {
                decay: 2.0, // Tempo di decadimento (secondi)
                mix: 0.5, // Mix wet/dry (0-1)
                preDelay: 0.1, // Pre-delay (secondi)
            },
    
            // Configurazione del delay
            delay: {
                time: 300, // Tempo di delay (millisecondi)
                feedback: 0.3, // Quantità di riflessione (0-1)
                mix: 0.5, // Mix wet/dry (0-1)
            },
    
            // Configurazione della saturazione
            saturation: {
                drive: 0.5, // Intensità (0-1)
                wet: 50, // Mix wet/dry (percentuale)
                tone: "neutral", // Tonalità (neutral, warm, bright)
            },
    
            // Configurazione del noise
            noise: {
                level: 0, // Livello del rumore (0-100)
            },
        },
    
        ambient: {
            oscillators: [
                {
                    waveform: "triangle",
                    detune: 0,
                    octave: -1,
                    volume: -5,
                },
                {
                    waveform: "sawtooth",
                    detune: -7,
                    octave: 0,
                    volume: -7,
                },
                {
                    waveform: "noise",
                    detune: 0,
                    octave: 0,
                    volume: -9,
                },
            ],
            filterType: "band-pass",
            sharedFilterFrequency: 800,
            sharedFilterQ: 0.8,
            attack: 1.0,
            decay: 0.5,
            sustain: 0.8,
            release: 1.2,
            reverb: {
                decay: 3.0,
                mix: 0.6,
                preDelay: 0.2,
            },
            delay: {
                time: 400,
                feedback: 0.4,
                mix: 0.6,
            },
            saturation: {
                drive: 0.3,
                wet: 40,
                tone: "warm",
            },
            noise: {
                level: 25,
            },
        },
    
        bass: {
            oscillators: [
                {
                    waveform: "sawtooth",
                    detune: -10,
                    octave: -1,
                    volume: -4,
                },
                {
                    waveform: "square",
                    detune: 5,
                    octave: -2,
                    volume: -6,
                },
                {
                    waveform: "triangle",
                    detune: 0,
                    octave: -1,
                    volume: -8,
                },
            ],
            filterType: "low-pass",
            sharedFilterFrequency: 500,
            sharedFilterQ: 2,
            attack: 0.2,
            decay: 0.1,
            sustain: 0.9,
            release: 0.4,
            reverb: {
                size:0.5,
                decay: 1.5,
                mix: 0.4,
                preDelay: 0.05,
            },
            delay: {
                time: 150,
                feedback: 0.2,
                mix: 0.3,
            },
            distortion: {
                drive: 0.7,
                wet: 60,
                tone: "bright",
            },
            noise: {
                level: 10,
            },
        },
    };
    
});
