
console.log("Testing")



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
            message.textContent = "Not valid email.";
            return;
        }

        // Previene registros múltiples (1 por hora)
        // const lastSubmit = localStorage.getItem("lastSubmit");
        // if (lastSubmit && Date.now() - lastSubmit < 3600000) {
        //     message.textContent = "Ya registraste tu correo recientemente.";
        //     return;
        // }


        try {
            const res = await fetch("/.netlify/functions/hubspot-email-waitlist", {
              method: "POST",
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify({ email })
            });
        
            const data = await res.json();
        
            if (res.ok) {
              message.textContent = "¡Thank you! We'll let you know when we launch.";
              message.style.color = "green";
              form.reset();
            } else {
              console.error("Error desde función:", data);
              message.textContent = "There was an error. Please try again later.";
              message.style.color = "red";
            }
          } catch (err) {
            console.error("Error de red:", err);
            message.textContent = "There was an error connecting. Please try again later.";
            message.style.color = "red";
          }

        // console.log(`${email} ha sido registrado`)
        // message.textContent = "Thank you, We will keep you posted!";

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