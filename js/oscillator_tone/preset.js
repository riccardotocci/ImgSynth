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
    document.getElementById(`volume${index + 1}`).value = oscillator.volume;
    document.getElementById(`volume${index + 1}Value`).innerText = `${oscillator.volume} dB`;
}

function updateFilterUI(preset) {
    document.getElementById("sharedFilterType").value = preset.filterType;
    document.getElementById("sharedFilterFrequency").value = preset.sharedFilterFrequency;
    document.getElementById("sharedFilterRolloff").value = preset.sharedFilterQ;
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
            if (!osc.channel) {
                console.warn(`Canale non trovato per Oscillatore ${index + 1}. Ignorando il volume.`);
            } else {
                if (oscillator.volume !== undefined) {
                    setOscillatorVolume(index, oscillator.volume);
                    updateVolume(index, osc, oscillator.volume);
                }
            }

            // Applica i parametri del preset
            if (oscillator.waveform !== undefined) {
                updateOscillatorParameter(index, "waveform", oscillator.waveform);
            }
            if (oscillator.detune !== undefined) {
                updateOscillatorParameter(index, "detune", oscillator.detune);
            }
            if (oscillator.octave !== undefined) {
                updateOscillatorParameter(index, "octave", oscillator.octave);
            }

            // Aggiorna l'interfaccia utente
            updateOscillatorUI(index, oscillator);
        } else {
            console.warn(`Oscillatore ${index + 1} non trovato. Ignorando i parametri.`);
        }
    });

    sharedFilter.type = preset.filterType;
    sharedFilter.frequency.value = preset.sharedFilterFrequency;
    sharedFilter.rolloff = preset.sharedFilterQ;
    updateFilterUI(preset);

    oscillators.forEach((_, index) => {
        updateEnvelope(index, {
            attack: preset.attack,
            decay: preset.decay,
            sustain: preset.sustain,
            release: preset.release
        });
    });
    updateEnvelopeUI(preset);

    reverb.size = preset.reverb.size;
    reverb.decay = preset.reverb.decay;
    reverb.mix = preset.reverb.mix;
    reverb.preDelay = preset.reverb.preDelay;
    updateReverbUI(preset);

    delay.delayTime = preset.delay.time / 1000;
    delay.feedback = preset.delay.feedback;
    delay.wet = preset.delay.mix;
    updateDelayUI(preset);

    distortion.drive =preset.saturation.drive;
    distortion.tone = preset.saturation.tone;
    distortion.wet = preset.saturation.wet;
    updateDistortionUI(preset);

    chorus.depth =preset.chorus.depth;
    chorus.delayTime = preset.chorus.delayTime;
    chorus.feedback = preset.chorus.feedback;
    chorus.frequency =preset.chorus.frequency;
    chorus.spread = preset.chorus.spread;
    chorus.wet = preset.chorus.wet;
    updateChorusUI(preset);

    if (preset.noise) {
        noiseGainNode.gain.value = preset.noise.level;
        setNoiseVolume(noiseGainNode.gain.value);

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



