//import firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getAuth, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword,signOut } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";
import { getFirestore, doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";
import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-storage.js";

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
          detune: document.getElementById("detuneKnob1").value,
          pitch: document.getElementById("pitchKnob1").value,
          octave: document.getElementById("octaveKnob1").value,
          harmonics: document.getElementById("harmonics1").value,
          pan: document.getElementById("pan3").value,
          waveform: document.getElementById("waveformLabel0").textContent
        },
        {
          detune: document.getElementById("detuneKnob2").value,
          pitch: document.getElementById("pitchKnob2").value,
          octave: document.getElementById("octaveKnob2").value,
          harmonics: document.getElementById("harmonics2").value,
          pan: document.getElementById("pan3").value,
          waveform: document.getElementById("waveformLabel1").textContent
        },
        {
          detune: document.getElementById("detuneKnob3").value,
          pitch: document.getElementById("pitchKnob3").value,
          octave: document.getElementById("octaveKnob3").value,
          harmonics: document.getElementById("harmonics3").value,
          pan: document.getElementById("pan3").value,
          waveform: document.getElementById("waveformLabel2").textContent
        }
      ],
      adsr: {
        attack: document.getElementById("attack").value,
        decay: document.getElementById("decay").value,
        sustain: document.getElementById("sustain").value,
        release: document.getElementById("release").value
      },
      filter: {
        frequency: document.getElementById("sharedFilterFrequency").value,
        type: document.getElementById("sharedFilterType").value,
        rolloff: document.getElementById("sharedFilterRolloff").value
      },
      noise: {
        type: document.getElementById("noiseType").value,
        volume: document.getElementById("noiseVolumeValue").textContent
      },
      effects: {
        distortion: {
          enabled: document.getElementById("distortionToggle").checked,
          type: document.getElementById("distortionType").value,
          amount: document.getElementById("distortionAmount").value,
          wet: document.getElementById("distortionWet").value
        },
        chorus: {
          enabled: document.getElementById("chorusToggle").checked,
          delay: document.getElementById("chorusDelay").value,
          depth: document.getElementById("chorusDepth").value,
          feedback: document.getElementById("chorusFeedback").value,
          frequency: document.getElementById("chorusFrequency").value,
          spread: document.getElementById("chorusSpread").value,
          wet: document.getElementById("chorusWet").value
        },
        delay: {
          enabled: document.getElementById("delayToggle").checked,
          time: document.getElementById("delayTime").value,
          feedback: document.getElementById("delayFeedback").value,
          wet: document.getElementById("delayWet").value
        },
        reverb: {
          enabled: document.getElementById("reverbToggle").checked,
          size: document.getElementById("reverbSize").value,
          preDelay: document.getElementById("reverbPreDelay").value,
          wet: document.getElementById("reverbWet").value
        },
        limiter: {
          enabled: document.getElementById("limiterToggle").checked,
          threshold: document.getElementById("limiterThreshold").value
        }
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

    const presetData = collectPresetData();
    const presetId = `preset-${Date.now()}`; // ID unico per il preset

    // Ottieni l'URL dell'immagine attualmente visualizzata
    const displayedImage = document.getElementById("displayedImage");
    const imageUrl = displayedImage.src;

    // Aggiungi l'URL dell'immagine ai dati del preset
    presetData.imageUrl = imageUrl;

    try {
        await setDoc(doc(db, "presets", `${user.uid}-${presetId}`), presetData);
        alert("Preset e immagine salvati con successo!");
    } catch (error) {
        console.error("Errore durante il salvataggio del preset:", error);
        alert("Errore durante il salvataggio del preset.");
    }
}
  
  
  document.getElementById("savePresetButton").addEventListener("click", savePreset);

  const storageRef = ref(storage, 'images/');


document.getElementById("imageInput").addEventListener("change", async (event) => {
    const file = event.target.files[0];
    if (file) {
        const fileRef = ref(storageRef, file.name);
        try {
            // Carica l'immagine su Firebase Storage
            await uploadBytes(fileRef, file);
            alert("Image uploaded successfully!");

        } catch (error) {
            console.error("Error uploading image:", error);
            alert("Error uploading image. Please try again.");
        }
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

// Recupera la lista di immagini salvate e mostra un elenco
document.getElementById("selectImageButton").addEventListener("click", async () => {
    const imageListContainer = document.getElementById("imageListContainer");
    const imageList = document.getElementById("imageList");
    imageList.innerHTML = ""; // Resetta la lista

    try {
        const listResult = await listAll(storageRef);
        listResult.items.forEach(async (item) => {
            const imageUrl = await getDownloadURL(item);

            // Crea un elemento della lista per ogni immagine
            const listItem = document.createElement("li");
            const imageLink = document.createElement("a");
            imageLink.href = "#";
            imageLink.textContent = item.name;
            imageLink.addEventListener("click", () => {
                // Mostra l'immagine selezionata
                const displayedImage = document.getElementById("displayedImage");
                displayedImage.src = imageUrl;
                displayedImage.style.display = "block";
                imageListContainer.style.display = "none";
            });
            listItem.appendChild(imageLink);
            imageList.appendChild(listItem);
        });

        imageListContainer.style.display = "block";
    } catch (error) {
        console.error("Errore durante il recupero delle immagini:", error);
        alert("Errore durante il recupero delle immagini. Riprova.");
    }
});

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