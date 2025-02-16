console.log("Presets:", typeof presets !== "undefined" ? presets : "undefined");

function updateOscillatorUI(index, oscillator) {
    
    setPresetWaveform(index, oscillator.waveform);

    const detuneElement = document.getElementById(`detuneKnob${index + 1}`);
    const detuneValueElement = document.getElementById(`detuneKnob${index + 1}Value`);
    if (detuneElement && detuneValueElement) {
        detuneElement.value = oscillator.detune;
        detuneValueElement.innerText = oscillator.detune;
    } else {
        console.warn(`Elemento DOM detuneKnob${index + 1} o detuneKnob${index + 1}Value non trovato.`);
    }

    const octaveElement = document.getElementById(`octaveKnob${index + 1}`);
    const octaveValueElement = document.getElementById(`octaveKnob${index + 1}Value`);
    if (octaveElement && octaveValueElement) {
        octaveElement.value = oscillator.octave;
        octaveValueElement.innerText = oscillator.octave;
    } else {
        console.warn(`Elemento DOM octaveKnob${index + 1} o octaveKnob${index + 1}Value non trovato.`);
    }
    const harmonicsElement = document.getElementById(`harmonics${index + 1}`);
    const harmonicsValueElement = document.getElementById(`harmonics${index + 1}Value`);
    if (harmonicsElement && harmonicsValueElement) {
        harmonicsElement.value = oscillator.harmonics;
        harmonicsValueElement.innerText = oscillator.harmonics;
    } else {
        console.warn(`Elemento DOM octaveKnob${index + 1} o octaveKnob${index + 1}Value non trovato.`);
    }
    document.getElementById(`volume${index + 1}`).value = oscillator.volume;
    document.getElementById(`volume${index + 1}Value`).innerText = `${oscillator.volume} dB`;
}

function updateFilterUI(preset) {
    document.getElementById("sharedFilterType").value = preset.filterType;
    document.getElementById("sharedFilterFrequency").value = preset.sharedFilterFrequency;
    document.getElementById("sharedFilterRolloff").value = preset.sharedFilterRolloff;
    document.getElementById("sharedFilterQ").value = preset.sharedFilterQ;
    document.getElementById("sharedFilterQValue").textContent = preset.sharedFilterQ;
    document.getElementById("sharedFilterFrequencyValue").textContent = `${Math.round(preset.sharedFilterFrequency)} Hz`;
}

function updateEnvelopeUI(preset) {
    document.getElementById("attack").value = preset.attack;
    document.getElementById("attackValue").innerText = preset.attack.toFixed(2);
    document.getElementById("decay").value = preset.decay;
    document.getElementById("decayValue").innerText = preset.decay.toFixed(2);
    document.getElementById("sustain").value = preset.sustain;
    document.getElementById("sustainValue").innerText = preset.sustain.toFixed(2);
    document.getElementById("release").value = preset.release;
    document.getElementById("releaseValue").innerText = preset.release.toFixed(2);
}

function updateReverbUI(preset) {
    document.getElementById("reverbSize").value = preset.reverb.size;
    document.getElementById("reverbSizeValue").innerText = (preset.reverb.size).toFixed(2);
    document.getElementById("reverbPreDelay").value = preset.reverb.preDelay || 0.1;
    document.getElementById("reverbPreDelayValue").innerText = (preset.reverb.preDelay || 0.1).toFixed(2);
    document.getElementById("reverbWet").value = preset.reverb.mix;
    document.getElementById("reverbWetValue").innerText = preset.reverb.mix.toFixed(2);
}

function updateDelayUI(preset) {
    document.getElementById("delayTime").value = preset.delay.time;
    document.getElementById("delayTimeValue").innerText = (preset.delay.time / 1000).toFixed(2) + " s";
    document.getElementById("delayFeedback").value = preset.delay.feedback;
    document.getElementById("delayFeedbackValue").innerText = preset.delay.feedback.toFixed(2);
    document.getElementById("delayWet").value = preset.delay.mix;
    document.getElementById("delayWetValue").innerText = preset.delay.mix.toFixed(2);
}

function updateDistortionUI(preset) {
    document.getElementById("distortionType").value = preset.saturation.tone;
    document.getElementById("distortionAmount").value = preset.saturation.drive;
    document.getElementById("distortionAmountValue").innerText = preset.saturation.drive;
    document.getElementById("distortionWet").value = preset.saturation.wet / 100;
    document.getElementById("distortionWetValue").innerText = (preset.saturation.wet / 100).toFixed(2);
}

function updateChorusUI(preset) {
    document.getElementById("chorusDepth").value = preset.chorus.depth;
    document.getElementById("chorusDepthValue").innerText = preset.chorus.depth.toFixed(2);
    document.getElementById("chorusDelay").value = preset.chorus.delayTime;
    document.getElementById("chorusDelayValue").innerText = preset.chorus.delayTime.toFixed(2);
    document.getElementById("chorusFeedback").value = preset.chorus.feedback;
    document.getElementById("chorusFeedbackValue").innerText = preset.chorus.feedback.toFixed(2);
    document.getElementById("chorusFrequency").value = preset.chorus.frequency;
    document.getElementById("chorusFrequencyValue").innerText = preset.chorus.frequency.toFixed(2);
    document.getElementById("chorusSpread").value = preset.chorus.spread;
    document.getElementById("chorusSpreadValue").innerText = preset.chorus.spread.toFixed(2);
    document.getElementById("chorusWet").value = preset.chorus.wet;
    document.getElementById("chorusWetValue").innerText = preset.chorus.wet.toFixed(2);
}



function applyPreset(preset) {
    preset.oscillators.forEach((oscillator, index) => {
        if (index < oscillators.length) {
            const osc = oscillators[index];

            // Assicurati che il canale sia configurato correttamente
            if (!osc.synth) {
                console.warn(`Canale non trovato per Oscillatore ${index + 1}. Ignorando il volume.`);
            } else {
                if (oscillator.volume !== undefined) {
                    setOscillatorVolume(index, oscillator.volume);
                    updateVolume(index, osc, oscillator.volume);
                }
            }
            console.log("Oscillatore", index + 1, "volume:", oscillator.volume, "dajeroma");

            // Applica i parametri del preset
            if (oscillator.waveform !== undefined) {
                updateOscillatorParameter(index, "waveform", oscillator.waveform);
                console.log("Oscillatore", index + 1, "waveform:", oscillator.waveform);
            }
            if (oscillator.detune !== undefined) {
                updateOscillatorParameter(index, "detune", oscillator.detune);
                console.log("Oscillatore", index + 1, "detune:", oscillator.detune);
            }
            if (oscillator.octave !== undefined) {
                updateOscillatorParameter(index, "octave", oscillator.octave);
                console.log("Oscillatore", index + 1, "octave:", oscillator.octave);
            }
            if (oscillator.harmonics !== undefined) {
                updateOscillatorParameter(index, "harmonics", oscillator.harmonics);
                console.log("Oscillatore", index + 1, "harmonics:", oscillator.harmonics);
            }

            // Aggiorna l'interfaccia utente
            updateOscillatorUI(index, oscillator);
        } else {
            console.warn(`Oscillatore ${index + 1} non trovato. Ignorando i parametri.`);
        }
    });

    // Filter settings
    if (preset.filterType) {
        console.log("Setting filter type:", preset.filterType);
        sharedFilter.type = preset.filterType;
    }
    if (preset.sharedFilterFrequency) {
        console.log("Setting filter frequency:", preset.sharedFilterFrequency, "Hz");
        sharedFilter.frequency.value = preset.sharedFilterFrequency;
    }
    if (preset.sharedFilterRolloff && [-12, -24, -48, -96].includes(preset.sharedFilterRolloff)) {
        console.log("Setting filter rolloff:", preset.sharedFilterRolloff);
        sharedFilter.rolloff = preset.sharedFilterRolloff;
    } else {
        console.error("Invalid rolloff value:", preset.sharedFilterRolloff);
    }
    if (preset.sharedFilterQ) {
        sharedFilter.Q.value = preset.sharedFilterQ;
        console.log("Setting filter Q:", sharedFilter.Q.value);
    }
    updateFilterUI(preset);
    console.log("Filter UI updated");

    // Envelope settings
    oscillators.forEach((_, index) => {
        console.log(`Updating envelope for oscillator ${index + 1}:`, {
            attack: preset.attack,
            decay: preset.decay,
            sustain: preset.sustain,
            release: preset.release
        });
        updateEnvelope(index, {
            attack: preset.attack,
            decay: preset.decay,
            sustain: preset.sustain,
            release: preset.release
        });
    });
    updateEnvelopeUI(preset);
    console.log("Envelope UI updated");

    // Reverb settings
    console.log("Updating reverb settings:", {
        size: preset.reverb.size,
        decay: preset.reverb.decay,
        mix: preset.reverb.mix,
        preDelay: preset.reverb.preDelay
    });
    reverb.size = preset.reverb.size;
    reverb.decay = preset.reverb.decay;
    reverb.mix = preset.reverb.mix;
    reverb.preDelay = preset.reverb.preDelay;
    updateReverbUI(preset);
    console.log("Reverb UI updated");

    // Delay settings
    console.log("Updating delay settings:", {
        time: preset.delay.time / 1000,
        feedback: preset.delay.feedback,
        mix: preset.delay.mix
    });
    delay.delayTime = preset.delay.time / 1000;
    delay.feedback = preset.delay.feedback;
    delay.wet = preset.delay.mix;
    updateDelayUI(preset);
    console.log("Delay UI updated");

    // Distortion settings
    console.log("Updating distortion settings:", {
        drive: preset.saturation.drive,
        tone: preset.saturation.tone,
        wet: preset.saturation.wet
    });
    distortion.drive = preset.saturation.drive;
    distortion.tone = preset.saturation.tone;
    distortion.wet = preset.saturation.wet;
    updateDistortionUI(preset);
    console.log("Distortion UI updated");

    // Chorus settings
    console.log("Updating chorus settings:", {
        depth: preset.chorus.depth,
        delayTime: preset.chorus.delayTime,
        feedback: preset.chorus.feedback,
        frequency: preset.chorus.frequency,
        spread: preset.chorus.spread,
        wet: preset.chorus.wet
    });
    chorus.depth = preset.chorus.depth;
    chorus.delayTime = preset.chorus.delayTime;
    chorus.feedback = preset.chorus.feedback;
    chorus.frequency = preset.chorus.frequency;
    chorus.spread = preset.chorus.spread;
    chorus.wet = preset.chorus.wet;
    updateChorusUI(preset);
    console.log("Chorus UI updated");

    if (preset.noise) {
        console.log("Setting noise gain to:", preset.noise.level);
        noiseGainNode.gain.value = preset.noise.level;
        setNoiseVolume(noiseGainNode.gain.value);
        console.log("Noise settings updated");

    }

    if (preset.noise) {
        console.log("Noise level impostato a:", parseInt(preset.noise.level));
    }

    console.log("Preset applicato:", preset);
};

document.getElementById("presetSelector").addEventListener("change", (e) => {
    const selectedPreset = e.target.value;

    if (presets[selectedPreset]) {
        applyPreset(presets[selectedPreset]);
    } else {
        console.error("Preset non trovato:", selectedPreset);
    }
});

  function collectPresetData() {
    const preset = {
        oscillators: [
            {
                detune: parseFloat(document.getElementById("detuneKnob1").value),
                pitch: parseFloat(document.getElementById("pitchKnob1").value),
                octave: parseInt(document.getElementById("octaveKnob1").value, 10),
                harmonics: parseFloat(document.getElementById("harmonics1").value),
                volume: parseFloat(document.getElementById("volume1Value").textContent),
                pan: parseFloat(document.getElementById("pan3").value),
                waveform: document.getElementById("waveformLabel0").textContent.trim()
            },
            {
                detune: parseFloat(document.getElementById("detuneKnob2").value),
                pitch: parseFloat(document.getElementById("pitchKnob2").value),
                octave: parseInt(document.getElementById("octaveKnob2").value, 10),
                harmonics: parseFloat(document.getElementById("harmonics2").value),
                pan: parseFloat(document.getElementById("pan3").value),
                volume: parseFloat(document.getElementById("volume2Value").textContent),
                waveform: document.getElementById("waveformLabel1").textContent.trim()
            },
            {
                detune: parseFloat(document.getElementById("detuneKnob3").value),
                pitch: parseFloat(document.getElementById("pitchKnob3").value),
                octave: parseInt(document.getElementById("octaveKnob3").value, 10),
                harmonics: parseFloat(document.getElementById("harmonics3").value),
                pan: parseFloat(document.getElementById("pan3").value),
                volume: parseFloat(document.getElementById("volume3Value").textContent),
                waveform: document.getElementById("waveformLabel2").textContent.trim()
            }
        ],
        attack: parseFloat(document.getElementById("attack").value),
        decay: parseFloat(document.getElementById("decay").value),
        sustain: parseFloat(document.getElementById("sustain").value),
        release: parseFloat(document.getElementById("release").value),
        filter: {
            frequency: parseFloat(document.getElementById("sharedFilterFrequency").value),
            type: document.getElementById("sharedFilterType").value.trim(),
            rolloff: parseInt(document.getElementById("sharedFilterRolloff").value, 10),
            Q: parseInt(document.getElementById("sharedFilterQ").value)
        },
        noise: {
            type: document.getElementById("noiseTypeSelect").value.trim(),
            level: parseFloat(document.getElementById("noiseVolumeValue").textContent)
        },
        
            saturation: {
                enabled: document.getElementById("distortionToggle").checked,
                tone: document.getElementById("distortionType").value.trim(),
                drive: parseFloat(document.getElementById("distortionAmount").value),
                wet: parseFloat(document.getElementById("distortionWet").value)
            },
            chorus: {
                enabled: document.getElementById("chorusToggle").checked,
                delayTime: parseFloat(document.getElementById("chorusDelay").value),
                depth: parseFloat(document.getElementById("chorusDepth").value),
                feedback: parseFloat(document.getElementById("chorusFeedback").value),
                frequency: parseFloat(document.getElementById("chorusFrequency").value),
                spread: parseFloat(document.getElementById("chorusSpread").value),
                wet: parseFloat(document.getElementById("chorusWet").value)
            },
            delay: {
                enabled: document.getElementById("delayToggle").checked,
                time: parseFloat(document.getElementById("delayTime").value),
                feedback: parseFloat(document.getElementById("delayFeedback").value),
                mix: parseFloat(document.getElementById("delayWet").value)
            },
            reverb: {
                enabled: document.getElementById("reverbToggle").checked,
                size: parseFloat(document.getElementById("reverbSize").value),
                decay: parseFloat(document.getElementById("reverbPreDelay").value),
                mix: parseFloat(document.getElementById("reverbWet").value)
            },
            limiter: {
                enabled: document.getElementById("limiterToggle").checked,
                threshold: parseFloat(document.getElementById("limiterThreshold").value)
            }
        
    };

    return preset;
}

