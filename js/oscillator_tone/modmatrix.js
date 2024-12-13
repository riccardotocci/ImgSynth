function updateModMatrixParameter(sourceName, paramName, value) {
    const source = modMatrix.sources[sourceName];
    const destination = modMatrix.destinations[paramName];

    if (destination) {
        if (typeof destination === "function") {
            destination(value);
        } else if (destination instanceof Tone.Signal) {
            destination.value = value;
        } else {
            console.error(`Destination ${paramName} non valida.`);
        }
    } else {
        console.error(`Destination ${paramName} non trovata.`);
    }
}


function populateModMatrixSelectors() {
    const sources = Object.keys(modMatrix.sources);
    const destinations = Object.keys(modMatrix.destinations);

    document.querySelectorAll(".sourceSelect").forEach((select) => {
        select.innerHTML = '<option value="null">null</option>';
        sources.forEach((source) => {
            const option = document.createElement("option");
            option.value = source;
            option.textContent = source;
            select.appendChild(option);
        });
    });

    document.querySelectorAll(".destinationSelect").forEach((select) => {
        select.innerHTML = '<option value="null">null</option>';
        destinations.forEach((destination) => {
            const option = document.createElement("option");
            option.value = destination;
            option.textContent = destination;
            select.appendChild(option);
        });
    });
}

function setupRowListeners(row) {
    const sourceSelect = document.getElementById(`source${row}`);
    const destinationSelect = document.getElementById(`destination${row}`);
    const intensityInput = document.getElementById(`intensity${row}`);

    function updateConnection() {
        const source = sourceSelect.value;
        const destination = destinationSelect.value;
        const intensity = parseFloat(intensityInput.value);

        // Rimuovi la connessione esistente per questa riga
        removeModulation(sourceSelect.dataset.previousSource, destinationSelect.dataset.previousDestination);

        // Aggiungi la nuova connessione se i valori non sono "null"
        if (source !== "null" && destination !== "null") {
            addModulation(source, destination, intensity);
        }

        // Salva i valori correnti come precedenti
        sourceSelect.dataset.previousSource = source;
        destinationSelect.dataset.previousDestination = destination;
    }

    if (sourceSelect && destinationSelect && intensityInput) {
        sourceSelect.addEventListener("change", updateConnection);
        destinationSelect.addEventListener("change", updateConnection);
        intensityInput.addEventListener("input", updateConnection);
    } else {
        console.error(`Elementi mancanti per la riga ${row}`);
    }
}

function addModulation(sourceName, destinationName, intensity) {
    const sourceObj = modMatrix.sources[sourceName];
    const destination = modMatrix.destinations[destinationName];

    if (!sourceObj || !destination) {
        console.error(`Source or Destination not found: source = ${sourceName}, destination = ${destinationName}`);
        return;
    }

    const source = sourceObj.instance;



    // Create a signal to scale the modulation
    const modulationSignal = new Tone.Multiply(intensity);
    try {
        // Different connection strategies based on destination type
        if (typeof destination === "function") {
            // For functions like oscillator parameter updates
            source.connect(modulationSignal);
            modulationSignal.connect({
                connect: (value) => {
                    destination(value);
                }
            });
        } else if (destination instanceof Tone.Signal) {
            // Direct connection for Tone.Signal destinations
            source.connect(modulationSignal);
            modulationSignal.connect(destination);
        } else {
            console.error("Invalid destination type:", destinationName);
            return;
        }

        // Store the connection
        const connectionEntry = {
            sourceName,
            destinationName,
            intensity,
            modulationSignal
        };
        modMatrix.connections.push(connectionEntry);

        console.log(`Modulation added: ${sourceName} → ${destinationName} (Intensity: ${intensity})`);
    } catch (error) {
        console.error(`Error adding modulation from ${sourceName} to ${destinationName}:`, error);
    }
}

function removeModulation(sourceName, destinationName) {
    if (!sourceName || !destinationName || sourceName === "null" || destinationName === "null") return;

    const index = modMatrix.connections.findIndex(
        (conn) => conn.sourceName === sourceName && conn.destinationName === destinationName
    );

    if (index === -1) {
        console.error("Connection not found in Mod Matrix.");
        return;
    }

    const connection = modMatrix.connections[index];
    if (connection.modulationSignal) {
        connection.modulationSignal.disconnect();
    }

    modMatrix.connections.splice(index, 1);
    console.log(`Modulation removed: ${sourceName} → ${destinationName}`);
}

// Debugging helper function
function debugModMatrix() {
    console.log("Mod Matrix Sources:", Object.keys(modMatrix.sources));
    console.log("Mod Matrix Destinations:", Object.keys(modMatrix.destinations));
    console.log("Current Connections:", modMatrix.connections);
}
function configureModMatrix(presetConnections) {
    modMatrix.connections.forEach((conn) => removeModulation(conn.sourceName, conn.destinationName));
    presetConnections.forEach(({ source, destination, intensity }) => {
        addModulation(source, destination, intensity);
    });
    console.log("Modulation Matrix configurata per il preset.");
}

// Configura i listener per ogni riga
[1, 2, 3, 4].forEach(setupRowListeners);

// Popola i menu a tendina all'avvio
populateModMatrixSelectors();