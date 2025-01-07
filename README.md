# ImgSynth: A Modular Audio-Visual Synthesizer

## Overview
ImgSynth is an advanced modular synthesizer that merges audio synthesis with visual interaction. This project allows users to create dynamic soundscapes and explore audio processing through intuitive controls and visual representations.

### Key Features
- **Multi-oscillator synthesis**: Three configurable oscillators with customizable waveforms, detuning, and harmonic control.
- **Modulation matrix**: Dynamically modulate synthesis parameters using LFOs and other sources.
- **Audio effects**: Integrated distortion, delay, reverb, chorus, and more.
- **Noise generator**: Configurable noise with selectable types and levels.
- **Visual spectrum analyzer**: Real-time frequency visualization of the audio output.
- **Image-based presets**: Generate sound presets by analyzing colors and features of uploaded images.
- **ESP32-CAM integration**: Capture images with an ESP32-CAM module for real-time preset generation.
- **MIDI integration**: Full support for MIDI input to control the synthesizer.

## Technologies Used
- **[Tone.js](https://tonejs.github.io/)**: A powerful Web Audio framework for synthesis and effects.
- **HTML/CSS/JavaScript**: For interactive UI and visualization.
- **Canvas API**: For waveform rendering and spectrum analysis.
- **ESP32-CAM**: For capturing images, programmed using the Arduino IDE.
- **Libraries**:
  - **Chroma.js** for color manipulation.
  - **TensorFlow.js** for image analysis.
  - **Switchery** for toggle controls.

## Features

### Audio Synthesis
- **Oscillators**: Configurable waveforms (sine, square, triangle, sawtooth) with detune, pitch, pan, and harmonic controls.
- **Modulation Matrix**: Link sources (e.g., LFOs) to destination parameters for complex sound design.
- **Envelope Control**: ADSR (Attack, Decay, Sustain, Release) controls for precise sound shaping.

### Effects
- **Distortion**: Multiple distortion types with adjustable intensity.
- **Reverb**: Configurable size, pre-delay, and decay.
- **Delay**: Adjustable delay time, feedback, and wet/dry mix.
- **Chorus**: Depth, frequency, and spread controls for rich modulation.
- **Limiter**: For dynamic range management.

### Visual Interaction
- **Spectrum Analyzer**: Real-time frequency visualization.
- **Waveform Rendering**: Dynamic visualization of oscillator waveforms.
- **Image-Driven Presets**: Generate audio presets based on the analysis of an uploaded image.

### ESP32-CAM Integration
Enhance ImgSynth by capturing images with the ESP32-CAM module for real-time preset generation:

1. **Setup ESP32-CAM**:
   - Program the ESP32-CAM using the Arduino IDE.
   - Use the instruction include in the about section.
   - Connect the ESP32-CAM to your Wi-Fi network and note the IP address displayed in the Serial Monitor.

2. **Integration with ImgSynth**:
   - Enter the ESP32-CAM's IP address in the ImgSynth interface to fetch images for analysis.

3. **Dynamic Soundscapes**:
   - Use the ESP32-CAM to dynamically adjust sound presets based on environmental visuals.

## How to Use

### ESP32-CAM Configuration
1. Program the ESP32-CAM using the Arduino IDE and connect it to your Wi-Fi network.
2. Note the IP address displayed in the Serial Monitor.

### ImgSynth Setup
1. Clone the repository:
   ```bash
   git clone https://github.com/riccardotocci/ImgSynth.git
2. Navigate to the project directory and open index.html in your browser.
3. Open the `index.html` file in your browser to start using ImgSynth.

---

## Features and Usage

### Synthesizer Controls
- Adjust oscillator waveforms, detuning, and pitch using intuitive sliders and dropdowns.
- Configure the envelope (Attack, Decay, Sustain, Release) for precise sound shaping.
- Apply effects like distortion, reverb, delay, and chorus to customize your audio output.
- Use the visual spectrum analyzer to monitor your audio's frequency components in real time.

### Image-Based Presets
1. Upload an image via the ImgSynth interface.
2. The image is analyzed to extract features like dominant colors, contrast, and sharpness.
3. These features are mapped to audio parameters such as oscillator waveform, detuning, and filter settings.

### ESP32-CAM Integration
1. Ensure your ESP32-CAM is connected to the same network as your device running ImgSynth.
2. Input the ESP32-CAM's IP address in the designated field on the ImgSynth interface.
3. Capture images in real time to dynamically generate audio presets.

### MIDI Integration
- Connect any MIDI controller to enhance your workflow.
- Use MIDI to trigger notes, control parameters, and sequence sounds.

---

## Tips for Best Results
- Experiment with different images to create unique soundscapes.
- Adjust individual oscillators to layer complex harmonics.
- Use the modulation matrix for dynamic and evolving sound design.
- Incorporate the ESP32-CAM in live performances to create interactive audio-visual experiences.

---

## Troubleshooting
### ESP32-CAM
- **Cannot connect to Wi-Fi**: Double-check your SSID and password in the Arduino sketch.
- **Cannot access ESP32-CAM stream**: Ensure the IP address is correctly entered in the ImgSynth interface and your device is on the same network.
- **Low image quality**: Adjust the resolution settings in the ESP32-CAM firmware for better clarity.

### ImgSynth Interface
- **No sound output**: Verify that your browser supports Web Audio API and MIDI.
- **Image analysis fails**: Ensure the uploaded image is in a supported format (e.g., JPG, PNG).

---

## Contact and Support
For questions or assistance, please open an issue on the [ImgSynth GitHub Repository](https://github.com/riccardotocci/ImgSynth/issues).


