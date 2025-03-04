document.getElementById("registerForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Evita la redirección
    
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const data = { name, email, password };

    // Guardar en localStorage (opcional, solo en el navegador)
    localStorage.setItem("userData", JSON.stringify(data));

    // Simular guardado en un archivo en GitHub usando Fetch (Requiere un backend)
    fetch("guardar_datos.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    })
    .then(response => response.text())
    .then(result => {
        alert("Registro guardado correctamente.");
    })
    .catch(error => console.error("Error:", error));
});
