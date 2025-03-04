// Espera a que el contenido del DOM esté completamente cargado
document.addEventListener("DOMContentLoaded", function() {
  // Animación de bienvenida cuando se carga la página
  const header = document.querySelector('header h1');
  header.style.opacity = 0;
  header.style.transition = "opacity 2s ease-in-out";
  
  // Animación de opacidad para dar la bienvenida
  setTimeout(() => {
    header.style.opacity = 1;
  }, 500);

  // Validación del formulario de contacto
  const form = document.querySelector("form");
  form.addEventListener("submit", function(event) {
    // Llamamos a la función de validación antes de enviar el formulario
    if (!validateForm()) {
      event.preventDefault();  // Evitamos el envío del formulario si hay errores
    }
  });

  // Función de validación de formulario
  function validateForm() {
    const name = document.getElementById("name").value;
    const message = document.getElementById("message").value;
    const nameError = document.getElementById("name-error");
    const messageError = document.getElementById("message-error");

    // Limpiar errores anteriores
    nameError.textContent = "";
    messageError.textContent = "";

    let isValid = true;

    // Validar el nombre (no vacío)
    if (name.trim() === "") {
      nameError.textContent = "El nombre es requerido.";
      isValid = false;
    }

    // Validar el mensaje (no vacío)
    if (message.trim() === "") {
      messageError.textContent = "El mensaje no puede estar vacío.";
      isValid = false;
    }

    return isValid;
  }

  // Efecto de hover en los botones (cuando el ratón pasa sobre el botón)
  const buttons = document.querySelectorAll("form input[type='submit']");
  buttons.forEach(button => {
    button.addEventListener("mouseover", function() {
      button.style.backgroundColor = "#4CAF50";
      button.style.transition = "background-color 0.3s ease-in-out";
    });

    button.addEventListener("mouseout", function() {
      button.style.backgroundColor = "#333";
    });
  });

  // Animación para el formulario cuando se envía
  form.addEventListener("submit", function(event) {
    const submitButton = document.querySelector("form input[type='submit']");
    submitButton.disabled = true;
    submitButton.value = "Enviando...";

    setTimeout(() => {
      submitButton.disabled = false;
      submitButton.value = "Enviar";
      alert("¡Gracias por tu mensaje!");
    }, 2000);  // Simula un retraso de 2 segundos
  });
});
