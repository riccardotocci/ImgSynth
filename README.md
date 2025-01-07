# ImgSynth: A Modular Audio-Visual Synthesizer

## Overview
ImgSynth is an advanced modular synthesizer that merges audio synthesis with visual interaction. It allows users to create dynamic soundscapes and explore audio processing through intuitive controls and visual representations.

Key features include:
- **Multi-oscillator synthesis**: Three configurable oscillators with custom waveforms, detuning, and harmonic control.
- **Modulation matrix**: Dynamic modulation of synthesis parameters using LFOs and other sources.
- **Audio effects**: Integrated distortion, delay, reverb, chorus, and more for rich sound processing.
- **Noise generator**: Configurable noise with selectable types and levels.
- **Visual spectrum analyzer**: Real-time frequency visualization of audio output.
- **Image-based presets**: Generate sound presets by analyzing colors and features of an uploaded image.
- **MIDI integration**: Full support for MIDI input to control the synthesizer.

## Technologies
ImgSynth is built with:
- **[Tone.js](https://tonejs.github.io/)**: A powerful Web Audio framework for synthesis and effects.
- **HTML/CSS/JavaScript**: For interactive UI and visualization.
- **Canvas API**: Used for waveform rendering and spectrum analysis.
- **Third-party libraries**:
  - **Chroma.js** for color manipulation.
  - **TensorFlow.js** for image analysis.
  - **Switchery** for toggle controls.

## Features

### Synthesis
- **Oscillators**: Configurable waveforms (sine, square, triangle, sawtooth) with controls for detune, pitch, pan, and harmonics.
- **Modulation Matrix**: Link sources like LFOs to destination parameters for intricate sound design.
- **Envelope Control**: ADSR controls for precise sound shaping.

### Effects
- **Distortion**: Multiple distortion types with adjustable intensity.
- **Reverb**: Configurable pre-delay, size, and decay.
- **Delay**: Adjustable delay time, feedback, and wet mix.
- **Chorus**: Depth, frequency, and spread controls for rich modulation.
- **Limiter**: For dynamic range management.

### Visual Interaction
- **Spectrum Analyzer**: Real-time visualization of audio output.
- **Waveform Rendering**: Dynamic visualization of oscillator waveforms.
- **Image-Driven Presets**: Analyze an image to generate audio presets based on color properties and depth.

### Controls
- **MIDI**: Control oscillators and effects via external MIDI devices.
- **Interactive UI**: Sliders, knobs, and switches for all parameters.
- **Keyboard Integration**: Virtual keyboard with note triggering and octave adjustment.

## How to Use
1. **Setup**:
   - Clone the repository: `git clone https://github.com/yourusername/ImgSynth.git`
   - Navigate to the project directory and open `index.html` in your browser.
2. **Interact**:
   - Use sliders, switches, and knobs to control audio synthesis.
   - Upload an image to generate dynamic presets.
   - Play notes using the virtual keyboard or a connected MIDI device.

## Development
### Requirements
- **Node.js** (for serving the app locally if needed).
- A modern browser with Web Audio and Web MIDI API support.

### Running Locally
```bash
npm install
npm start

