document.getElementById("registerForm").addEventListener("submit", async function(event) {
    event.preventDefault(); // Evita la redirección del formulario

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    // Validación
    if (!name || !email || !password) {
        alert("Por favor, completa todos los campos.");
        return;
    }

    const data = { name, email, password, date: new Date().toISOString() };

    // Datos de tu repositorio de GitHub
    const username = "641188232";  // Tu usuario de GitHub
    const repo = "mi-onlyfans";    // Nombre de tu repositorio
    const path = "datos.json";     // Archivo donde se guardan los datos
    const token = "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"; // Tu token de GitHub (NO lo pongas públicamente)

    try {
        // Obtener el contenido actual del archivo en GitHub
        let response = await fetch(`https://api.github.com/repos/${username}/${repo}/contents/${path}`, {
            headers: { Authorization: `token ${token}` }
        });

        let fileData = await response.json();
        let sha = fileData.sha || ""; // Identificador del archivo en GitHub
        let existingData = [];

        // Si el archivo ya existe, obtener los datos anteriores
        if (fileData.content) {
            existingData = JSON.parse(atob(fileData.content));
        }

        // Agregar los nuevos datos
        existingData.push(data);
        let updatedContent = btoa(JSON.stringify(existingData, null, 2));

        // Guardar el nuevo contenido en GitHub
        let saveResponse = await fetch(`https://api.github.com/repos/${username}/${repo}/contents/${path}`, {
            method: "PUT",
            headers: {
                Authorization: `token ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                message: "Actualizando datos de formulario",
                content: updatedContent,
                sha: sha // Necesario para actualizar el archivo
            })
        });

        if (saveResponse.ok) {
            alert("Registro guardado en GitHub correctamente.");

            // Ocultar el formulario y mostrar el mensaje con el enlace
            document.getElementById("form-container").style.display = "none";
            document.getElementById("message-container").style.display = "block";
        } else {
            alert("Error al guardar en GitHub.");
            console.error(await saveResponse.text());
        }
    } catch (error) {
        console.error("Error:", error);
        alert("Error al conectar con GitHub.");
    }
});
