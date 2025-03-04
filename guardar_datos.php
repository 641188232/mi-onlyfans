<?php
$data = json_decode(file_get_contents("php://input"), true);

if ($data) {
    $file = 'datos.json';
    $jsonData = file_exists($file) ? json_decode(file_get_contents($file), true) : [];
    $jsonData[] = $data;
    file_put_contents($file, json_encode($jsonData, JSON_PRETTY_PRINT));
    echo "Datos guardados correctamente.";
} else {
    echo "Error al recibir los datos.";
}
?>
