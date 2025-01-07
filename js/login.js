//import firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getAuth, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword,signOut } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";
import { getFirestore, doc, setDoc, getDoc, getDocs, collection } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";
import { getStorage, ref, uploadBytes, getDownloadURL, listAll } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-storage.js";

// Firebase configuration should use environment variables from a secure source
// For development, you can directly use the API key in the config object


// Configurazione Firebase
const firebaseConfig = {
    apiKey: "AIzaSyAuceluZ-joBXnYFi3edk0aQrHpGP6MTRc",
    authDomain: "imgsynth-6ff32.firebaseapp.com",
    projectId: "imgsynth-6ff32",
    storageBucket: "imgsynth-6ff32.firebasestorage.app",
    messagingSenderId: "528934109445",
    appId: "1:528934109445:web:2f4a72340e4a9db5b3b76c",
    measurementId: "G-ZJHS7NECNF"
  };

// Inizializza Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);
const storage = getStorage(app);
let user = null;
let img = null;

  
  document.getElementById("email-register-form").addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById("reg-email").value;
    const password = document.getElementById("reg-password").value;
  
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      console.log("Utente registrato con successo:", result.user);
  
      // Nascondi il modulo e mostra il messaggio di successo
      document.getElementById("auth-container").style.display = "none";
      document.getElementById("success-message").style.display = "block";
      document.getElementById("logout-button").style.display = "inline-block";

      // Chiudi il popup
      closePopup();
    } catch (error) {
      console.error("Errore durante la registrazione:", error);
      alert("Errore: " + error.message);
    }
  });

  document.getElementById("logout-button").addEventListener("click", async () => {
    try {
      await signOut(auth);
      console.log("Utente disconnesso.");
  
      // Mostra nuovamente il modulo e nascondi il pulsante di logout
      document.getElementById("auth-container").style.display = "block";
      document.getElementById("success-message").style.display = "none";
      document.getElementById("logout-button").style.display = "none";
    } catch (error) {
      console.error("Errore durante il logout:", error);
      alert("Errore: " + error.message);
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
            rolloff: parseInt(document.getElementById("sharedFilterRolloff").value, 10)
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


async function savePreset() {
  const user = auth.currentUser;
  
  if (!user) {
    alert("Devi essere loggato per salvare un preset.");
    return;
  }

  // Get preset name from input
  const presetName = document.getElementById("presetName").value;
  if (!presetName) {
    alert("Inserisci un nome per il preset.");
    return;
  }

  const presetData = collectPresetData();
  const presetId = `preset-${Date.now()}`; // ID unico per il preset

  // Ottieni l'URL dell'immagine attualmente visualizzata
  const displayedImage = document.getElementById("displayedImage");
  const imageUrl = displayedImage.src;

  // Convert the image URL to base64 if it's not already
  if (imageUrl.startsWith('data:image')) {
    presetData.imageUrl = imageUrl; // Already base64
  } else {
    // Convert to base64
    const response = await fetch(imageUrl);
    const blob = await response.blob();
    const base64 = await new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.readAsDataURL(blob);
    });
    presetData.imageUrl = base64;
  }
  presetData.name = presetName;

  try {
    await setDoc(doc(db, "presets", `${user.uid}-${presetId}`), presetData);
    alert("Preset e immagine salvati con successo!");
    document.getElementById("presetName").value = ""; // Clear input after saving
  } catch (error) {
    console.error("Errore durante il salvataggio del preset:", error);
    alert("Errore durante il salvataggio del preset.");
  }
}
  
  
  document.getElementById("savePresetButton").addEventListener("click", savePreset);

  const storageRef = ref(storage, 'images/');




  document.getElementById("imageInput").addEventListener("change", async (event) => {
    const file = event.target.files[0];
    const user = auth.currentUser;
    if (file && user) {
        const fileRef = ref(storage, `users/${user.uid}/images/${file.name}`);
        try {
            await uploadBytes(fileRef, file);
            console.log("Image uploaded to:", fileRef.fullPath);
        } catch (error) {
            console.error("Error uploading image:", error);
        }
    } else {
        console.error("User not authenticated or file not selected.");
    }
});

document.getElementById("imageInput").addEventListener("change", (event) => {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            const imageUrl = e.target.result;
            const displayedImage = document.getElementById("displayedImage");
            displayedImage.src = imageUrl;
            displayedImage.style.display = "block";
        };
        reader.readAsDataURL(file);
    }
});
document.getElementById("selectImageButton").addEventListener("click", async () => {
  const imageListContainer = document.getElementById("imageListContainer");
  
  // Toggle visibility of image list container
  if (imageListContainer.style.display === "block") {
    imageListContainer.style.display = "none";
    return;
  }
  console.log("Select Image Button clicked");
  const user = auth.currentUser;
  console.log("Current user:", user);
  
  if (!user) {
      console.log("No user logged in");
      alert("Devi essere loggato per vedere le tue immagini.");
      return;
  }

  const userImagesRef = ref(storage, `users/${user.uid}/images`);
  console.log("Accessing user images folder:", `users/${user.uid}/images`);
  
  const imageList = document.getElementById("imageList");
  imageList.innerHTML = "";

  try {
      console.log("Fetching image list...");
      const listResult = await listAll(userImagesRef);
      console.log("Found", listResult.items.length, "images");
      
      if (listResult.items.length === 0) {
          console.log("No images found");
          alert("Non ci sono immagini salvate.");
          return;
      }

      // Create overlay styling for image list container
      imageListContainer.style.position = 'fixed';
      imageListContainer.style.top = '50%';
      imageListContainer.style.left = '50%';
      imageListContainer.style.transform = 'translate(-50%, -50%)';
      imageListContainer.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
      imageListContainer.style.padding = '20px';
      imageListContainer.style.borderRadius = '5px';
      imageListContainer.style.boxShadow = '0 0 10px rgba(0,0,0,0.3)';
      imageListContainer.style.zIndex = '1000';

      listResult.items.forEach(async (item) => {
          console.log("Processing image:", item.name);
          const response = await getDownloadURL(item);
          const imageData = await fetch(response);
          const blob = await imageData.blob();
          const imageUrl = await new Promise((resolve) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result);
            reader.readAsDataURL(blob);
          });
          console.log("Image URL obtained:", imageUrl);

          const listItem = document.createElement("li");
          const imageLink = document.createElement("a");
          imageLink.style.cursor = "pointer";
          imageLink.href = "#";
          imageLink.textContent = item.name;
          imageLink.addEventListener("click", (e) => {
        e.preventDefault();
        const displayedImage = document.getElementById("displayedImage");
        displayedImage.src = imageUrl;
        
        img = new Image();
        img.src = imageUrl;

        img.onload = () => {
            console.log("Image fully loaded, processing...");
            processImagelogin(img);
            processSketch(img);
        };

        displayedImage.style.display = "block";
        imageListContainer.style.display = "none"; // Hide the container when image is selected
          });
          listItem.appendChild(imageLink);
          imageList.appendChild(listItem);
          imageListContainer.style.display = "block";
      });

      imageListContainer.style.display = "block";
  } catch (error) {
      console.error("Error fetching images:", error);
      alert("Errore durante il recupero delle immagini. Riprova.");
  }
});

function processImagelogin(img) {
  if (!img) {
    console.log('No image loaded');
    return;
  }

  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');
  canvas.width = img.width;
  canvas.height = img.height;
  ctx.drawImage(img, 0, 0);
  console.log('Canvas context:', ctx);

  const hslValues = getRandomHSLFromCanvas(ctx, canvas.width, canvas.height);
  displayColorsAndWaveforms(hslValues);
  applyBackgroundGradient(hslValues);
  
  // Calcola il contrasto normalizzato
  const normalizedContrast = calculateContrast(ctx, canvas);

  // Calcola la media di S e L
  const { averageS, averageL } = calculateAverageSL(hslValues);

  // Calcola nitidezza
  const sharpness = calculateSharpness(canvas, ctx);

  // Calcola rumore
  const noiseLevel = calculateNoise(canvas, ctx);

  // Calcola profondità
  const depthValue = calculateDepthValue(canvas, ctx);

  console.log(`Media Saturazione (S): ${averageS}`);
  console.log(`Media Luminosità (L): ${averageL}`);
  console.log(`Nitidezza: ${sharpness}`);
  console.log(`Rumore: ${noiseLevel}`);
  console.log(`Profondità: ${depthValue}`);
  console.log(`Contrasto normalizzato: ${normalizedContrast}`);

  // Visualizza le medie nel DOM
  const resultDiv = document.getElementById("result");
  if (resultDiv) {
      resultDiv.innerHTML = `
          <p>Media Saturazione (S): ${averageS}%</p>
          <p>Media Luminosità (L): ${averageL}%</p>
          <p>Nitidezza: ${sharpness.toFixed(2)}</p>
          <p>Rumore: ${noiseLevel.toFixed(2)}</p>
          <p>Profondità: ${depthValue.toFixed(2)}</p>
          <p>Contrasto normalizzato: ${normalizedContrast.toFixed(2)}</p>
      `;
  }

  // Salva i dati analizzati
  imageAnalysis = { averageS, averageL, sharpness, noiseLevel, depthValue, normalizedContrast};
  dominantColors = hslValues;
  console.log('Dominant Colors:', dominantColors);    
}

  // Login con Google
  document.getElementById("google-login").addEventListener("click", async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
  
      console.log("Utente autenticato con Google:", user);
  
      // Nascondi il modulo e mostra il pulsante di logout
      document.getElementById("auth-container").style.display = "none";
      document.getElementById("success-message").style.display = "block";
      document.getElementById("logout-button").style.display = "inline-block";
  
      // Chiudi il popup
      closePopup();
    } catch (error) {
      console.error("Errore durante il login con Google:", error);
      alert("Errore: " + error.message);
    }
  });
  
  // Login con email/password
  document.getElementById("email-login-form").addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
  
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      console.log("Utente autenticato con Email/Password:", result.user);
  
      // Nascondi il modulo e mostra il pulsante di logout
      document.getElementById("auth-container").style.display = "none";
      document.getElementById("success-message").style.display = "block";
      document.getElementById("logout-button").style.display = "inline-block";
  
      // Chiudi il popup
      closePopup();
    } catch (error) {
      console.error("Errore durante il login con Email/Password:", error);
      alert("Errore: " + error.message);
    }
  });

  const registerButton = document.getElementById('register-button');
  const loginForm = document.getElementById('email-login-form');
  const registerForm = document.getElementById('email-register-form');

  registerButton.addEventListener('click', () => {
    if (loginForm.style.display === 'block') {
      loginForm.style.display = 'none';
      registerForm.style.display = 'block';
      registerButton.textContent = 'Login';
    } else {
      loginForm.style.display = 'block';
      registerForm.style.display = 'none';
      registerButton.textContent = 'Register';
    }
  });


document.getElementById("captureButton").addEventListener("click", async () => {
  console.log("Button clicked!");
  const esp32Url = `http://${ipInput.value}`;
  console.log("ESP32 URL:", esp32Url);

  try {
    console.log("Fetching image...");
    snapshotImg.src = `${esp32Url}/capture?${new Date().getTime()}`;
    snapshotImg.crossOrigin = "Anonymous";

    snapshotImg.onload = async () => {
      console.log("Image loaded successfully");
      
      // Convert image to blob for Firebase Storage
      try {
        const response = await fetch(snapshotImg.src);
        const blob = await response.blob();
        
        // Create unique filename
        const filename = `capture_${Date.now()}.jpg`;
        const fileRef = ref(storage, 'captures/' + filename);
        
        // Upload to Firebase Storage
        await uploadBytes(fileRef, blob);
        const downloadUrl = await getDownloadURL(fileRef);
        
        // Update displayed image
        const displayedImage = document.getElementById("displayedImage");
        displayedImage.src = downloadUrl;
        displayedImage.style.display = "block";
        
        // Process the image
        processImageesp32();
        
        console.log("Image captured and saved to Firebase");
      } catch (error) {
        console.error("Error saving capture:", error);
        alert("Error saving captured image");
      }
    };

    snapshotImg.onerror = () => {
      console.error("Error loading image");
      alert("Could not load image from ESP32");
    };

  } catch (error) {
    console.error("Stream error:", error);
  }
});


window.applyPresetFromDoc = applyPresetFromDoc;
async function applyPresetFromDoc(presetId) {
  const user = auth.currentUser;

  if (!user) {
      alert("Devi essere loggato per applicare un preset.");
      return;
  }

  try {
      const docRef = doc(db, "presets", presetId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
          const preset = docSnap.data();
          
            // Display the image associated with the preset
            if (preset.imageUrl) {
              const displayedImage = document.getElementById("displayedImage");
              // Since the imageUrl is already in base64 format, we can use it directly
              displayedImage.src = preset.imageUrl;
              displayedImage.style.display = "block";
              
              // Create image object and process it
              img = new Image();
              img.src = preset.imageUrl; // Base64 URL can be used directly
              
              img.onload = () => {
              console.log("Preset image loaded, processing...");
              processImagelogin(img);
              processSketch(img);
              };

              img.onerror = () => {
              console.error("Error loading preset image");
              alert("Could not load the preset image");
              };
            }
            
          applyPreset(preset);
      } else {
          console.error("Preset non trovato.");
          alert("Preset non trovato.");
      }
  } catch (error) {
      console.error("Errore durante l'applicazione del preset:", error);
      alert("Errore durante l'applicazione del preset.");
  }
}
async function loadPresets() {
  // Check if preset list is already visible
  const existingList = document.getElementById('preset-list');
  if (existingList) {
    document.body.removeChild(existingList);
    return;
  }
  const user = auth.currentUser;

  if (!user) {
      alert("Devi essere loggato per caricare i preset.");
      return;
  }

  try {
      const presetList = document.createElement("ul");
      presetList.style.position = 'fixed';
      presetList.style.top = '50%';
      presetList.style.left = '50%';
      presetList.style.transform = 'translate(-50%, -50%)';
      presetList.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
      presetList.style.padding = '20px';
      presetList.style.borderRadius = '5px';
      presetList.style.boxShadow = '0 0 10px rgba(0,0,0,0.3)';
      presetList.style.zIndex = '1000';
      presetList.style.maxHeight = '80vh';
      presetList.style.overflowY = 'auto';
      presetList.style.listStyle = 'none';
      presetList.id = 'preset-list';

      const querySnapshot = await getDocs(collection(db, "presets"));
      let hasPresets = false;

      querySnapshot.forEach((doc) => {
          if (doc.id.startsWith(user.uid)) {
              hasPresets = true;
              const preset = doc.data();
              const listItem = document.createElement("li");
              listItem.style.cursor = 'pointer';
              listItem.style.padding = '5px';
              listItem.style.margin = '5px 0';
              listItem.textContent = preset.name || 'Preset senza nome';
              
              listItem.addEventListener('click', () => {
                  applyPresetFromDoc(doc.id);
                  document.body.removeChild(presetList);
              });
              
              presetList.appendChild(listItem);
          }
      });

      if (!hasPresets) {
          const noPresets = document.createElement("li");
          noPresets.textContent = "Nessun preset trovato.";
          presetList.appendChild(noPresets);
      }

      // Remove existing list if present
      
      if (existingList) {
          document.body.removeChild(existingList);
      }

      document.body.appendChild(presetList);

  } catch (error) {
      console.error("Errore durante il caricamento dei preset:", error);
      alert("Errore durante il caricamento dei preset.");
  }
}



document.getElementById("loadPresetsButton").addEventListener("click", loadPresets);
