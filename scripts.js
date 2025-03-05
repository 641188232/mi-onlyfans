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
    const token = "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";  // Token de GitHub

    try {
        // 1️⃣ Obtener el contenido actual del archivo en GitHub
        let response = await fetch(`https://api.github.com/repos/${username}/${repo}/contents/${path}`, {
            headers: { Authorization: `token ${token}` }
        });

        if (!response.ok) {
            if (response.status === 404) {
                console.log("Archivo no encontrado, crearemos uno nuevo.");
            } else {
                console.error("Error al obtener el archivo de GitHub:", response.statusText);
                alert("Error al obtener el archivo de GitHub.");
                return;
            }
        } else {
            let fileData = await response.json();
            console.log("Archivo obtenido:", fileData);  // Agregar log para ver la respuesta

            let sha = fileData.sha || ""; // Identificador del archivo en GitHub
            let existingData = [];

            // 2️⃣ Si el archivo ya existe, obtener los datos anteriores
            if (fileData.content) {
                existingData = JSON.parse(atob(fileData.content));  // Decodificar contenido base64
            }

            console.log("Datos existentes en el archivo:", existingData); // Log de datos existentes

            // 3️⃣ Agregar los nuevos datos
            existingData.push(data);
            let updatedContent = btoa(JSON.stringify(existingData, null, 2));

            console.log("Contenido actualizado:", updatedContent);  // Log del contenido actualizado

            // 4️⃣ Guardar el nuevo contenido en GitHub
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
                console.log("Registro guardado en GitHub correctamente.");
                alert("Registro guardado en GitHub correctamente.");

                // Ocultar el formulario y mostrar el mensaje con el enlace
                document.getElementById("form-container").style.display = "none";  // Ocultar formulario
                document.getElementById("message-container").style.display = "block";  // Mostrar mensaje
            } else {
                console.error("Error al guardar en GitHub:", saveResponse.statusText);
                alert("Error al guardar en GitHub.");
            }
        }
    } catch (error) {
        console.error("Error al conectar con GitHub:", error);
        alert("Error al conectar con GitHub.");
    }
});
