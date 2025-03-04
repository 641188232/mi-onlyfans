document.getElementById("registerForm").addEventListener("submit", async function(event) {
    event.preventDefault(); // Evita la recarga de la página

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    if (!name || !email || !password) {
        alert("Por favor, completa todos los campos.");
        return;
    }

    const data = { name, email, password, date: new Date().toISOString() };

    // 📌 DATOS DE TU REPOSITORIO
    const username = "641188232"; // Tu usuario de GitHub
    const repo = "MiWebSensual";  // Nombre del repositorio
    const path = "datos.json";    // Archivo en GitHub donde se guardan los datos
    const token = "AQUÍ_DEBES_PONER_TU_TOKEN"; // 🔥 NO SUBAS ESTO A GITHUB 🔥

    try {
        // 1️⃣ Obtener el contenido actual del archivo en GitHub
        let response = await fetch(`https://api.github.com/repos/${username}/${repo}/contents/${path}`, {
            headers: { Authorization: `token ${token}` }
        });

        if (!response.ok) {
            throw new Error("No se pudo obtener el archivo. Asegúrate de que existe en el repositorio.");
        }

        let fileData = await response.json();
        let sha = fileData.sha || "";
        let existingData = [];

        // 2️⃣ Si el archivo ya existe, obtener los datos anteriores
        if (fileData.content) {
            existingData = JSON.parse(atob(fileData.content));
        }

        // 3️⃣ Agregar los nuevos datos
        existingData.push(data);
        let updatedContent = btoa(JSON.stringify(existingData, null, 2));

        // 4️⃣ Guardar el nuevo contenido en GitHub
        let saveResponse = await fetch(`https://api.github.com/repos/${username}/${repo}/contents/${path}`, {
            method: "PUT",
            headers: {
                Authorization: `token ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                message: "Nuevo usuario registrado",
                content: updatedContent,
                sha: sha
            })
        });

        if (saveResponse.ok) {
            // Ocultar el formulario y mostrar el mensaje
            document.getElementById("registerForm").style.display = "none";
            document.getElementById("mensaje").style.display = "block";
        } else {
            alert("Error al guardar en GitHub.");
            console.error(await saveResponse.text());
        }
    } catch (error) {
        console.error("Error:", error);
        alert("Error al conectar con GitHub.");
    }
});
