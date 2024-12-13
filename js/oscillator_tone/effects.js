document.addEventListener("DOMContentLoaded", () => {
    // DISTORTION
    const distortionTypeControl = document.getElementById("distortionType");
    if (distortionTypeControl) {
        distortionTypeControl.addEventListener("change", (e) => {
            const type = e.target.value;
            distortion.set({ type });
            console.log("Distortion type updated:", type);
        });
    }

    const distortionAmountControl = document.getElementById("distortionAmount");
    if (distortionAmountControl) {
        distortionAmountControl.addEventListener("input", (e) => {
            const amount = parseFloat(e.target.value);
            distortion.set({ distortion: amount });
            console.log("Distortion amount updated:", amount);
        });
    }

    const distortionWetControl = document.getElementById("distortionWet");
    if (distortionWetControl) {
        distortionWetControl.addEventListener("input", (e) => {
            const wet = parseFloat(e.target.value);
            distortion.set({ wet });
            console.log("Distortion wet updated:", wet);
        });
    }

    // CHORUS
    const chorusDepthControl = document.getElementById("chorusDepth");
    if (chorusDepthControl) {
        chorusDepthControl.addEventListener("input", (e) => {
            const depth = parseFloat(e.target.value);
            chorus.set({ depth });
            console.log("Chorus depth updated:", depth);
        });
    }

    const chorusDelayControl = document.getElementById("chorusDelay");
    if (chorusDelayControl) {
        chorusDelayControl.addEventListener("input", (e) => {
            const delayTime = parseFloat(e.target.value) / 1000; // Convert to seconds
            chorus.set({ delayTime });
            console.log("Chorus delay updated:", delayTime);
        });
    }

    const chorusFeedbackControl = document.getElementById("chorusFeedback");
    if (chorusFeedbackControl) {
        chorusFeedbackControl.addEventListener("input", (e) => {
            const feedback = parseFloat(e.target.value);
            chorus.set({ feedback });
            console.log("Chorus feedback updated:", feedback);
        });
    }

    const chorusFrequencyControl = document.getElementById("chorusFrequency");
    if (chorusFrequencyControl) {
        chorusFrequencyControl.addEventListener("input", (e) => {
            const frequency = parseFloat(e.target.value);
            chorus.set({ frequency });
            console.log("Chorus frequency updated:", frequency);
        });
    }

    const chorusSpreadControl = document.getElementById("chorusSpread");
    if (chorusSpreadControl) {
        chorusSpreadControl.addEventListener("input", (e) => {
            const spread = parseInt(e.target.value, 10);
            chorus.set({ spread });
            console.log("Chorus spread updated:", spread);
        });
    }

    const chorusWetControl = document.getElementById("chorusWet");
    if (chorusWetControl) {
        chorusWetControl.addEventListener("input", (e) => {
            const wet = parseFloat(e.target.value);
            chorus.set({ wet });
            console.log("Chorus wet updated:", wet);
        });
    }

    // DELAY
    const delayTimeControl = document.getElementById("delayTime");
    if (delayTimeControl) {
        delayTimeControl.addEventListener("input", (e) => {
            const delayTime = parseFloat(e.target.value) / 1000; // Convert to seconds
            delay.set({ delayTime });
            console.log("Delay time updated:", delayTime);
        });
    }

    const delayFeedbackControl = document.getElementById("delayFeedback");
    if (delayFeedbackControl) {
        delayFeedbackControl.addEventListener("input", (e) => {
            const feedback = parseFloat(e.target.value);
            delay.set({ feedback });
            console.log("Delay feedback updated:", feedback);
        });
    }

    const delayWetControl = document.getElementById("delayWet");
    if (delayWetControl) {
        delayWetControl.addEventListener("input", (e) => {
            const wet = parseFloat(e.target.value);
            delay.set({ wet });
            console.log("Delay wet updated:", wet);
        });
    }

    // REVERB
    const reverbSizeControl = document.getElementById("reverbSize");
    if (reverbSizeControl) {
        reverbSizeControl.addEventListener("input", (e) => {
            const decay = parseFloat(e.target.value);
            reverb.set({ decay });
            console.log("Reverb size updated:", decay);
        });
    }

    const reverbPreDelayControl = document.getElementById("reverbPreDelay");
    if (reverbPreDelayControl) {
        reverbPreDelayControl.addEventListener("input", (e) => {
            const preDelay = parseFloat(e.target.value);
            reverb.set({ preDelay });
            console.log("Reverb pre-delay updated:", preDelay);
        });
    }

    const reverbWetControl = document.getElementById("reverbWet");
    if (reverbWetControl) {
        reverbWetControl.addEventListener("input", (e) => {
            const wet = parseFloat(e.target.value);
            reverb.set({ wet });
            console.log("Reverb wet updated:", wet);
        });
    }

    // LIMITER
    const limiterThresholdControl = document.getElementById("limiterThreshold");
    if (limiterThresholdControl) {
        limiterThresholdControl.addEventListener("input", (e) => {
            const threshold = parseFloat(e.target.value);
            limiter.set({ threshold });
            console.log("Limiter threshold updated:", threshold);
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
            console.log(`Distortion ${toggle.checked ? "enabled" : "disabled"}`);
        });
    });

    switchChorus.forEach((toggle, index) => {
        toggle.addEventListener("change", () => {
            chorus.set({ bypass: !toggle.checked });
            console.log(`Chorus ${toggle.checked ? "enabled" : "disabled"}`);
        });
    });

    switchDelay.forEach((toggle, index) => {
        toggle.addEventListener("change", () => {
            delay.set({ bypass: !toggle.checked });
            console.log(`Delay ${toggle.checked ? "enabled" : "disabled"}`);
        });
    });

    switchReverb.forEach((toggle, index) => {
        toggle.addEventListener("change", () => {
            reverb.set({ bypass: !toggle.checked });
            console.log(`Reverb ${toggle.checked ? "enabled" : "disabled"}`);
        });
    });

    switchLimiter.forEach((toggle, index) => {
        toggle.addEventListener("change", () => {
            limiter.set({ bypass: !toggle.checked });
            console.log(`Limiter ${toggle.checked ? "enabled" : "disabled"}`);
        });
    });
