<?php
require "../../model/model_modal.php";

$MU = new Modelo_Modal();

// Validación de entrada
if (!isset($_POST['id']) || empty($_POST['id'])) {
    echo 0; // Error: no hay ID
    exit;
}

$id = strtoupper(htmlspecialchars($_POST['id'], ENT_QUOTES, 'UTF-8'));
$consulta = $MU->Eliminar_Modal($id);

// Retorna 1 = éxito, 2 = restricción, 0 = error
echo $consulta;
?>
