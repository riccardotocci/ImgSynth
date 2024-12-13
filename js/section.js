// Funzione per chiudere il popup
function closePopup() {
    const popup = document.getElementById("popup");
    if (popup) {
      popup.style.display = "none";
    }
  }
  


  // Aggiungi l'evento per il pulsante Skip
document.getElementById("skip-button").addEventListener("click", () => {
    console.log("Login skipped by the user.");
    closePopup();
  });
  

        function showSection(sectionId, element, useHidden = false) {
            // Remove 'active' class from all navbar links
            const navbarLinks = document.querySelectorAll('.navbar a');
            navbarLinks.forEach(link => link.classList.remove('active'));
        
            // Add 'active' class to the clicked navbar link
            element.classList.add('active');
        
            // Hide all sections
            const sections = document.querySelectorAll('.section');
            sections.forEach(section => {
                if (useHidden) {
                    section.hidden = true; // Nasconde la sezione impostando l'attributo hidden
                } else {
                    section.classList.remove('active'); // Rimuove la classe 'active'
                }
            });
        
            // Show the selected section
            const selectedSection = document.getElementById(sectionId);
            if (useHidden) {
                selectedSection.hidden = false; // Mostra la sezione rimuovendo l'attributo hidden
            } else {
                selectedSection.classList.add('active'); // Aggiunge la classe 'active'
            }
        }