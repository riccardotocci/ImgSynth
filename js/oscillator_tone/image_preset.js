function adjustPresetFromImage(imageAnalysis, dominantColors) {

    console.log("Analysis Colors:", imageAnalysis);
    console.log("Dominant Colors:", dominantColors);

    const oscillatorsData = dominantColors.slice(0, 3).map((colorInfo, index) => {
        const color = colorInfo.color;
        console.log(`Color ${index + 1}:`, color);
        let waveType = null, frequency = null, amplitude = null,sat=null,light=null;
        if (typeof colorToWaveform === 'function') {
            let waveformResult = colorToWaveform(color);
            console.log('waveformResult:', waveformResult);
            if (waveformResult) {
            ({ waveType, frequency, amplitude,sat,light} = waveformResult);
            console.log(`Oscillator ${index + 1} - WaveType: ${waveType}, Frequency: ${frequency}, Amplitude: ${amplitude}, saturation: ${sat}, luminosity: ${light}`);
            } else {
            console.error('colorToWaveform returned null or undefined');
            }
        } else {
            console.error('colorToWaveform function is not defined');
        }

        // Differenziazione basata sull'indice e sui parametri normalizzati
        return {
            id: `oscillator${index + 1}`, // Identificatore dell'oscillatore
            waveform: waveType || (index % 2 === 0 ? "sine" : "triangle"), // Cambia il tipo di onda per oscillatori diversi
            detune: mapRange(sat, 0, 100, -50, 50), // Differenziazione del detune
            octave: Math.ceil(mapRange(light, 0, 100, -2 , 2 )), // Differenziazione dell'ottava
            volume: Math.ceil(mapRange(light, 0, 100, -20, 0)), // Differenziazione del volume
            harmonics: Math.ceil(mapRange(sat, 0,100, 1, 10)), // Aggiungi armoniche in base all'indice
        };
    });
    console.log("Average S:", imageAnalysis.averageS);


    // Costruisce un preset dinamico basato sui parametri analizzati
    let dynamicPreset = {
        oscillators: oscillatorsData,
        filterType: getFilterType(imageAnalysis.averageL || 50), // Default a "lowpass" se non definito
        sharedFilterFrequency: mapRange(imageAnalysis.averageL, 0, 100, 20, 20000),
        sharedFilterRolloff: getrolloffType(imageAnalysis.sharpness),
        sharedFilterQ: parseFloat(mapRange(imageAnalysis.averageL,0,100,0,10)).toFixed(1),

        attack: mapRangeLog(imageAnalysis.sharpness, 0, 100, 0.01, 2),
        decay: mapRangeInverse(imageAnalysis.sharpness, 0, 100, 0.01, 2),
        sustain: mapRangeInverse(imageAnalysis.sharpness, 0, 100, 0.1, 1),
        release: mapRangeInverse(imageAnalysis.sharpness, 0, 100, 0.01, 3),

        reverb: {
            preDelay: mapRange(imageAnalysis.depthValue, 0, 1, 0, 0.5),
            decay: mapRange(imageAnalysis.depthValue, 0, 1, 0.2, 5),
            mix: mapRange(imageAnalysis.depthValue, 0, 1, 0, 0.8),
            size: mapRange(imageAnalysis.depthValue, 0, 1, 0, 1),
            
        },
        delay: {
            time: mapRange(imageAnalysis.depthValue, 20, 1, 50, 500),
            feedback: mapRange(imageAnalysis.depthValue, 20, 1, 0, 0.7),
            mix: mapRange(imageAnalysis.depthValue, 20, 1, 0, 0.6),
        },
        saturation: {
            tone: getToneString(imageAnalysis.averageS),
            drive: parseFloat(mapRange(imageAnalysis.averageS, 0, 100, 0, 1)).toFixed(1),
            wet: mapRange(imageAnalysis.averageS, 0, 100, 0, 0.8),
        },
        chorus:{
            depth:mapRange(imageAnalysis.normalizedContrast, 0, 100, 0, 1),
            delayTime:mapRange(imageAnalysis.normalizedContrast, 0, 100, 0.01, 0.5),
            feedback:mapRange(imageAnalysis.normalizedContrast, 0, 100, 0, 0.8),
            frequency:mapRange(imageAnalysis.normalizedContrast, 0, 100, 0.01, 0.5),
            spread:mapRange(imageAnalysis.normalizedContrast, 0, 100, 0, 180),
            wet:mapRange(imageAnalysis.normalizedContrast, 0, 100, 0, 1),
        },
        noise: {
            level: Math.ceil(mapRange(imageAnalysis.noiseLevel, 0, 100, -60, -20)),
        },
    };

    // Applica il preset dinamico
    applyPreset(dynamicPreset);

    console.log("Preset dinamico applicato:", dynamicPreset);
}

// Pulsante per applicare il preset
document.getElementById('adjustPresetButton').addEventListener('click', () => {


    if (typeof imageAnalysis !== 'undefined' && Array.isArray(dominantColors)) {
        adjustPresetFromImage(imageAnalysis, dominantColors);
    } else {
        console.error("L'analisi dell'immagine o i colori dominanti non sono disponibili.");
        alert("Per favore, analizza un'immagine prima di modificare il preset.");
    }
});
