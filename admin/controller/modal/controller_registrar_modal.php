<?php
require "../../model/model_modal.php";
$MU = new Modelo_Modal();

$comunicado = strtoupper(htmlspecialchars($_POST['comunicado'], ENT_QUOTES, 'UTF-8'));
$nombrearchivo = strtoupper(htmlspecialchars($_POST['nombrearchivo'], ENT_QUOTES, 'UTF-8'));
$idarea = strtoupper(htmlspecialchars($_POST['idarea'], ENT_QUOTES, 'UTF-8'));

$ruta = '';
if (!empty($nombrearchivo)) {
    $nombrearchivo = preg_replace("/[^a-zA-Z0-9_\-\.]/", "_", $nombrearchivo);
    $ruta = 'controller/modal/img/' . $nombrearchivo;
}
$fecha = date("Y-m-d"); // o date("Y-m-d H:i:s") si es DATETIME
$consulta = $MU->Registrar_Modal($comunicado, $ruta, $idarea);

// Si registro exitoso y archivo existe
if ($consulta == 1 && !empty($nombrearchivo) && isset($_FILES['archivoobj'])) {
    if ($_FILES['archivoobj']['error'] === UPLOAD_ERR_OK) {
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
