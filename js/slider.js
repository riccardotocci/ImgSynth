// Configurazione centralizzata per tutti gli slider
const sliderConfigs = {
    noiseVolume: {
        id: "noiseVolume",
        min: -60,
        max: 0,
        step: 1,
        value: -60,
        unit: "dB",
        onChange: (value) => {
            if (noiseGainNode) {
                noiseGainNode.gain.value = Math.pow(10, value / 20); // Converti dB in ampiezza lineare
                document.getElementById("noiseVolumeValue").innerText = `${value} dB`;
            } else {
                console.warn("Nodo di guadagno del rumore non trovato.");
            }
        },
    },
    oscillatorVolumes: [
        {
            id: "volume1",
            min: -60,
            max: 0,
            step: 1,
            value: -12,
            unit: "dB",
            onChange: (value, index) => updateVolume(index, oscillators[index], value),
        },
        {
            id: "volume2",
            min: -60,
            max: 0,
            step: 1,
            value: -12,
            unit: "dB",
            onChange: (value, index) => updateVolume(index, oscillators[index], value),
        },
        {
            id: "volume3",
            min: -60,
            max: 0,
            step: 1,
            value: -12,
            unit: "dB",
            onChange: (value, index) => updateVolume(index, oscillators[index], value),
        },
    ],
  };
  
  function initializeSlider(config) {
    const sliderElement = document.getElementById(config.id);
    console.log(sliderElement);
  
    if (sliderElement) {
        // Inizializza lo slider con Nexus UI
        const slider = new Nexus.Slider(`#${config.id}`, {
          size: [40, 240], // Larghezza e altezza dello slider
          min: config.min,
          max: config.max,
          step: config.step,
          value: config.value
        });
        
        Nexus.sliders = Nexus.sliders || {};
        Nexus.sliders[`#${config.id}`] = slider;

        // Associa evento per aggiornare il valore
        slider.on("change", (value) => {
            config.onChange(value);
            const valueDisplay = document.getElementById(`${config.id}Value`);
            if (valueDisplay) {
                valueDisplay.textContent = `${value.toFixed(1)} ${config.unit}`;
            }
        });
  
        // Cambia i colori dopo che lo slider è stato aggiunto al DOM
        setTimeout(() => {
            slider.colors = {
                fill: 'rgba(255, 87, 51, 0.2)',   // Colore dell'area riempita
                accent: 'rgba(0, 0, 255, 0.5)',  // Colore del puntatore
                light: 'rgba(255, 255, 255, 0.2)', // Colore del background
                dark: 'rgba(51, 51, 51, 0.2)'    // Colore del border o del testo
            };
        }, 0); // Garantisce che lo slider sia completamente caricato
    } else {
        console.warn(`Elemento slider con ID ${config.id} non trovato.`);
    }
}

function initializeOscillatorSliders(configs) {
    Nexus.sliders = Nexus.sliders || {}; // Inizializza un contenitore globale per gli slider

    configs.forEach((config, index) => {
        const sliderElementId = `#${config.id}`;
        const sliderElement = document.getElementById(config.id);
        console.log(sliderElementId);

        if (sliderElement) {
            const slider = new Nexus.Slider(sliderElementId, {
                size: [40, 300],
                min: config.min,
                max: config.max,
                step: config.step,
                value: config.value,
            });

            // Salva il riferimento nello spazio globale di Nexus
            Nexus.sliders[sliderElementId] = slider;

            // Aggiorna il valore visivamente
            slider.on("change", (value) => {
                config.onChange(value, index);
                const valueDisplay = document.getElementById(`${config.id}Value`);
                if (valueDisplay) {
                    valueDisplay.textContent = `${value.toFixed(1)} ${config.unit}`;
                }
            });

            // Imposta colori personalizzati
            setTimeout(() => {
                slider.colors = {
                    fill: 'rgba(255, 87, 51, 0.2)',
                    accent: 'rgba(0, 0, 255, 0.5)',
                    light: 'rgba(255, 255, 255, 0.2)',
                    dark: 'rgba(51, 51, 51, 0.2)',
                };
            }, 0);
        } else {
            console.warn(`Elemento slider con ID ${config.id} non trovato.`);
        }
    });
}

// Inizializza tutti gli slider quando il DOM è pronto
document.addEventListener("DOMContentLoaded", () => {
  // Inizializza slider singoli
  if (sliderConfigs.noiseVolume) {
      initializeSlider(sliderConfigs.noiseVolume);
  }

  // Inizializza slider per oscillatori
  if (sliderConfigs.oscillatorVolumes) {
      initializeOscillatorSliders(sliderConfigs.oscillatorVolumes);
  }
});

function setNoiseVolume(value) {
    const sliderId = `#${sliderConfigs.noiseVolume.id}`; // ID dello slider Nexus
    const slider = Nexus.sliders[sliderId]; // Recupera l'istanza dello slider Nexus

    if (slider) {
        slider.value = value; // Aggiorna il valore graficamente e logicamente nello slider Nexus
        sliderConfigs.noiseVolume.onChange(value); // Richiama il callback associato per aggiornare l'audio
        console.log(`Noise volume impostato a ${value} dB tramite Nexus UI.`);
    } else {
        console.warn(`Slider Nexus con ID ${sliderId} non trovato.`);
    }
}


function setOscillatorVolume(index, value) {
    if (index >= 0 && index < sliderConfigs.oscillatorVolumes.length) {
        const config = sliderConfigs.oscillatorVolumes[index];
        const sliderElementId = `#${config.id}`; // ID dello slider in Nexus.sliders

        // Ottieni lo slider NexusUI
        const slider = Nexus.sliders[sliderElementId];
        if (slider) {
            slider.value = value; // Aggiorna graficamente lo slider
            config.onChange(value, index); // Esegui il callback associato
        } else {
            console.warn(`Slider Nexus con ID ${sliderElementId} non trovato.`);
        }
    } else {
        console.warn(`Indice ${index} fuori dal range degli oscillatori.`);
    }
}

