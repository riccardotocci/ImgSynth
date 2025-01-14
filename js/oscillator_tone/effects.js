document.addEventListener("DOMContentLoaded", () => {
    // DISTORTION
    const distortionTypeControl = document.getElementById("distortionType");
    if (distortionTypeControl) {
        distortionTypeControl.addEventListener("change", (e) => {
            const type = e.target.value;
            distortion.set({ type });
        });
    }

    const distortionAmountControl = document.getElementById("distortionAmount");
    if (distortionAmountControl) {
        distortionAmountControl.addEventListener("input", (e) => {
            const amount = parseFloat(e.target.value);
            distortion.set({ distortion: amount });
            document.getElementById("distortionAmountValue").innerText = amount;
        });
    }

    const distortionWetControl = document.getElementById("distortionWet");
    if (distortionWetControl) {
        distortionWetControl.addEventListener("input", (e) => {
            const wet = parseFloat(e.target.value);
            distortion.set({ wet: wet });
            document.getElementById("distortionWetValue").innerText = wet;
        });
    }

    // CHORUS
    const chorusDepthControl = document.getElementById("chorusDepth");
    if (chorusDepthControl) {
        chorusDepthControl.addEventListener("input", (e) => {
            const depth = parseFloat(e.target.value);
            chorus.set({ depth });
            document.getElementById("chorusDepthValue").innerText = depth;
        });
    }

    const chorusDelayControl = document.getElementById("chorusDelay");
    if (chorusDelayControl) {
        chorusDelayControl.addEventListener("input", (e) => {
            const delayTime = parseFloat(e.target.value) / 1000; // Convert to seconds
            chorus.set({ delayTime });
            document.getElementById("chorusDelayValue").innerText = delayTime
        });
    }

    const chorusFeedbackControl = document.getElementById("chorusFeedback");
    if (chorusFeedbackControl) {
        chorusFeedbackControl.addEventListener("input", (e) => {
            const feedback = parseFloat(e.target.value);
            chorus.set({ feedback });
            document.getElementById("chorusFeedbackValue").innerText = feedback;
        });
    }

    const chorusFrequencyControl = document.getElementById("chorusFrequency");
    if (chorusFrequencyControl) {
        chorusFrequencyControl.addEventListener("input", (e) => {
            const frequency = parseFloat(e.target.value);
            chorus.set({ frequency });
            document.getElementById("chorusFrequencyValue").innerText = frequency;
        });
    }

    const chorusSpreadControl = document.getElementById("chorusSpread");
    if (chorusSpreadControl) {
        chorusSpreadControl.addEventListener("input", (e) => {
            const spread = parseInt(e.target.value, 10);
            chorus.set({ spread });
            document.getElementById("chorusSpreadValue").innerText = spread;
        });
    }

    const chorusWetControl = document.getElementById("chorusWet");
    if (chorusWetControl) {
        chorusWetControl.addEventListener("input", (e) => {
            const wet = parseFloat(e.target.value);
            chorus.set({ wet });
            document.getElementById("chorusWetValue").innerText = wet;
        });
    }

    // DELAY
    const delayTimeControl = document.getElementById("delayTime");
    if (delayTimeControl) {
        delayTimeControl.addEventListener("input", (e) => {
            const delayTime = parseFloat(e.target.value) / 1000; // Convert to seconds
            delay.set({ delayTime });
            document.getElementById("delayTimeValue").innerText = delayTime;
        });
    }

    const delayFeedbackControl = document.getElementById("delayFeedback");
    if (delayFeedbackControl) {
        delayFeedbackControl.addEventListener("input", (e) => {
            const feedback = parseFloat(e.target.value);
            delay.set({ feedback });
            document.getElementById("delayFeedbackValue").innerText = feedback; 
        });
    }

    const delayWetControl = document.getElementById("delayWet");
    if (delayWetControl) {
        delayWetControl.addEventListener("input", (e) => {
            const wet = parseFloat(e.target.value);
            delay.set({ wet });
            document.getElementById("delayWetValue").innerText = wet;
        });
    }

    // REVERB
    const reverbSizeControl = document.getElementById("reverbSize");
    if (reverbSizeControl) {
        reverbSizeControl.addEventListener("input", (e) => {
            const decay = parseFloat(e.target.value);
            reverb.set({ decay });
            document.getElementById("reverbSizeValue").innerText = decay;
        });
    }

    const reverbPreDelayControl = document.getElementById("reverbPreDelay");
    if (reverbPreDelayControl) {
        reverbPreDelayControl.addEventListener("input", (e) => {
            const preDelay = parseFloat(e.target.value);
            reverb.set({ preDelay });
            document.getElementById("reverbPreDelayValue").innerText = preDelay;
        });
    }

    const reverbWetControl = document.getElementById("reverbWet");
    if (reverbWetControl) {
        reverbWetControl.addEventListener("input", (e) => {
            const wet = parseFloat(e.target.value);
            reverb.set({ wet });
            document.getElementById("reverbWetValue").innerText = wet;
        });
    }

    // LIMITER
    const limiterThresholdControl = document.getElementById("limiterThreshold");
    if (limiterThresholdControl) {
        limiterThresholdControl.addEventListener("input", (e) => {
            const threshold = parseFloat(e.target.value);
            limiter.set({ threshold: threshold });
            document.getElementById("limiterThresholdValue").innerText = threshold;
        });
    }
});

const switchDistortion = document.getElementById("Distortion").querySelectorAll(".js-switch");
const switchChorus = document.getElementById("Chorus").querySelectorAll(".js-switch");
const switchDelay = document.getElementById("Delay").querySelectorAll(".js-switch");
const switchReverb = document.getElementById("Reverb").querySelectorAll(".js-switch");
const switchLimiter = document.getElementById("Limiter").querySelectorAll(".js-switch");

    // Inizializza Switchery per ogni elemento
    switchDistortion.forEach((toggle, index) => {
        // Stile dello switch
        new Switchery(toggle, {
            color: 'rgba(0,0,240,0.3)',         // Colore ON
            secondaryColor: 'rgba(255,255,255,0.3)', // Colore OFF
            jackColor: '#FFFFFF',    // Colore del pulsante
            size: 'default',         // Dimensione: small, default, large
        });
    });

            // Inizializza Switchery per ogni elemento
    switchChorus.forEach((toggle, index) => {
        // Stile dello switch
        new Switchery(toggle, {
            color: 'rgba(0,0,240,0.3)',         // Colore ON
            secondaryColor: 'rgba(255,255,255,0.3)', // Colore OFF
            jackColor: '#FFFFFF',    // Colore del pulsante
            size: 'default',         // Dimensione: small, default, large
        });
    });

        switchDelay.forEach((toggle, index) => {
            // Stile dello switch
            new Switchery(toggle, {
                color: 'rgba(0,0,240,0.3)',         // Colore ON
                secondaryColor: 'rgba(255,255,255,0.3)', // Colore OFF
                jackColor: '#FFFFFF',    // Colore del pulsante
                size: 'default',         // Dimensione: small, default, large
            });
        });


switchReverb.forEach((toggle, index) => {
    // Stile dello switch
    new Switchery(toggle, {
        color: 'rgba(0,0,240,0.3)',         // Colore ON
        secondaryColor: 'rgba(255,255,255,0.3)', // Colore OFF
        jackColor: '#FFFFFF',    // Colore del pulsante
        size: 'default',         // Dimensione: small, default, large
    });
});


switchLimiter.forEach((toggle, index) => {
    // Stile dello switch
    new Switchery(toggle, {
        color: 'rgba(0,0,240,0.3)',         // Colore ON
        secondaryColor: 'rgba(255,255,255,0.3)', // Colore OFF
        jackColor: '#FFFFFF',    // Colore del pulsante
        size: 'default',         // Dimensione: small, default, large
    });
});

    switchDistortion.forEach((toggle, index) => {
        toggle.addEventListener("change", () => {
            distortion.set({ bypass: !toggle.checked });
        });
    });

    switchChorus.forEach((toggle, index) => {
        toggle.addEventListener("change", () => {
            chorus.set({ bypass: !toggle.checked });
        });
    });

    switchDelay.forEach((toggle, index) => {
        toggle.addEventListener("change", () => {
            delay.set({ bypass: !toggle.checked });
        });
    });

    switchReverb.forEach((toggle, index) => {
        toggle.addEventListener("change", () => {
            reverb.set({ bypass: !toggle.checked });
        });
    });

    switchLimiter.forEach((toggle, index) => {
        toggle.addEventListener("change", () => {
            limiter.set({ bypass: !toggle.checked });
        });
    });
