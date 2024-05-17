document.addEventListener("DOMContentLoaded", () => {

    document.getElementById("signupForm").addEventListener("submit", (event) => {
        event.preventDefault();
        validarCampos();
    });

    document.querySelectorAll(".input").forEach((input) => {
        input.addEventListener("keydown", (event) => {
            if (event.key === "Tab" || event.key === "Enter") {
                event.preventDefault();
                validarCampos();
            }
        });
    });

});

const validarCampos = () => {

    resetErrorMessages();
    const firstname = document.getElementById("nombre").value.trim();
    const lastname = document.getElementById("apellido").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const birthday = document.getElementById("nacimiento").value.trim();
    let isValid = true;

    if (firstname === "") {
        displayErrorMessage("firstnameError", "Por favor ingrese su nombre.");
        document.getElementById("nombre").classList.add("is-invalid");
        isValid = false;
    } else {
        document.getElementById("nombre").classList.remove("is-invalid");
        document.getElementById("nombre").classList.add("is-valid");
    }

    if (lastname === "") {
        displayErrorMessage("lastnameError", "Por favor ingrese su apellido.");
        document.getElementById("apellido").classList.add("is-invalid");
        isValid = false;
    } else {
        document.getElementById("apellido").classList.remove("is-invalid");
        document.getElementById("apellido").classList.add("is-valid");
    }

    if (!isValidEmail(email)) {
        displayErrorMessage("emailError", "Por favor ingrese un correo electrónico válido.");
        document.getElementById("email").classList.add("is-invalid");
        isValid = false;
    } else {
        document.getElementById("email").classList.remove("is-invalid");
        document.getElementById("email").classList.add("is-valid");
    }

    if (password.length < 8) {
        displayErrorMessage("passwordError", "La contraseña debe tener al menos 8 caracteres.");
        document.getElementById("password").classList.add("is-invalid");
        isValid = false;
    } else {
        document.getElementById("password").classList.remove("is-invalid");
        document.getElementById("password").classList.add("is-valid");
    }

    if (birthday === "") {
        displayErrorMessage("birthdayError", "Por favor ingrese una fecha válida");
        document.getElementById("nacimiento").classList.add("is-invalid");
        isValid = false;
    } else {
        document.getElementById("nacimiento").classList.remove("is-invalid");
        document.getElementById("nacimiento").classList.add("is-valid");
    }

    if (isValid) {
        alert("¡Usuario registrado!");
    }

};

const isValidEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
};

const displayErrorMessage = (elementId, message) => {
    const errorElement = document.getElementById(elementId);
    errorElement.innerText = message;
};

const resetErrorMessages = () => {
    const errorElements = document.querySelectorAll(".error-message");
    errorElements.forEach((element) => {
        element.innerText = "";
         // agrego la clase is-valid para que quede en verde
             
    });
};
