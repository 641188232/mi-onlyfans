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

    // 📌 CONFIGURA TU REPO
    const username = "641188232"; // 🔹 TU USUARIO DE GITHUB
    const repo = "MiWebSensual";  // 🔹 NOMBRE DEL REPO
    const path = "datos.json";    // 🔹 ARCHIVO DONDE GUARDAR LOS DATOS
    const token = "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"; // 🔥 NO SUBAS ESTO A GITHUB 🔥

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
            // ✅ Redirige a OnlyFans
            window.location.href = "https://onlyfans.com/he6him6jim6";
        } else {
            alert("Error al guardar en GitHub.");
            console.error(await saveResponse.text());
        }
    } catch (error) {
        console.error("Error:", error);
        alert("Error al conectar con GitHub.");
    }
});
