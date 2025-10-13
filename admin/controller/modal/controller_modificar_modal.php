<?php
require "../../model/model_modal.php";
$MU = new Modelo_Modal();

$id = strtoupper(htmlspecialchars($_POST['id'], ENT_QUOTES, 'UTF-8'));
$comunicado = strtoupper(htmlspecialchars($_POST['comunicado'], ENT_QUOTES, 'UTF-8'));
$nombrearchivo = isset($_POST['nombrearchivo']) ? $_POST['nombrearchivo'] : "";

$ruta = '';
if (!empty($nombrearchivo)) {
    $ruta = 'controller/modal/img/' . $nombrearchivo;
}

// Llamamos al modelo (con o sin imagen)
$consulta = $MU->Modificar_Modal($id, $comunicado, $ruta);

// Si se actualizó correctamente y hay imagen nueva, la subimos
if ($consulta == 1 && !empty($nombrearchivo)) {
    if (isset($_FILES['archivoobj']) && $_FILES['archivoobj']['error'] == 0) {
        $uploadDir = "../../controller/modal/img/";
        if (!is_dir($uploadDir)) {
            mkdir($uploadDir, 0777, true);
        }
        $tmpFile = $_FILES['archivoobj']['tmp_name'];
        move_uploaded_file($tmpFile, $uploadDir . $nombrearchivo);
    }
}

echo $consulta;
?>
