function displayColorsAndWaveforms(hslValues) {
    const output = document.getElementById('output');
    output.innerHTML = `<h3>Valori HSL e Waveform:</h3>`;
    hslValues.forEach(({ color, hsl }) => {
      const colorBox = document.createElement('div');
      colorBox.classList.add('color-swatch');

      const box = document.createElement('div');
      box.classList.add('color-box');
      box.style.backgroundColor = color;

      const text = document.createElement('span');
      text.textContent = `H: ${hsl[0]}, S: ${hsl[1]}%, L: ${hsl[2]}%`;

      const button = document.createElement('div');

      button.addEventListener('click', () => {
        const info = playWaveform(color);
      });

      const infoElement = document.createElement('span');
      infoElement.classList.add('waveform-info');

      colorBox.appendChild(box);
      colorBox.appendChild(text);
      colorBox.appendChild(button);
      colorBox.appendChild(infoElement);
      output.appendChild(colorBox);
    });
  }

  