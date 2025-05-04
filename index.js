
console.log("Testing")

// Reemplaza con tu configuración de Firebase
// const firebaseConfig = {
//     apiKey: "TU_API_KEY",
//     authDomain: "TU_DOMINIO.firebaseapp.com",
//     projectId: "TU_PROJECT_ID",
//     storageBucket: "TU_BUCKET.appspot.com",
//     messagingSenderId: "TU_ID",
//     appId: "TU_APP_ID"
//     };



    // firebase.initializeApp(firebaseConfig);

    // const db = firebase.firestore();

    const form = document.getElementById("email-form");
    const message = document.getElementById("message");



    function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    
    form.addEventListener("submit", async (e) => {
        e.preventDefault();
        const email = document.getElementById("email").value.trim();

        // Valida formato de email
        if (!isValidEmail(email)) {
            message.textContent = "Correo no válido.";
            return;
        }

        // Previene registros múltiples (1 por hora)
        // const lastSubmit = localStorage.getItem("lastSubmit");
        // if (lastSubmit && Date.now() - lastSubmit < 3600000) {
        //     message.textContent = "Ya registraste tu correo recientemente.";
        //     return;
        // }

        console.log(`${email} ha sido registrado`)
        message.textContent = "Thank you, We will keep you posted!";

        // -----------------------

        // Clear input after sending
        // Make message disapear after a few seconds


        // -----------------------




        // try {
        //     await db.collection("emails").add({
        //     email: email,
        //     timestamp: Date.now()
        //     });
        //     localStorage.setItem("lastSubmit", Date.now());
        //     message.textContent = "¡Gracias! Te avisaremos cuando lancemos.";
        //     form.reset();
        // } catch (err) {
        //     console.error("Error al guardar el email:", err);
        //     message.textContent = "Hubo un error. Inténtalo más tarde.";
        // }
        });



        // Add analytics 
        // Connect to hubspot 