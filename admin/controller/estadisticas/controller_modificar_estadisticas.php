<?php
require "../../model/model_estadisticas.php";
$ME = new Modelo_Estadisticas(); // Instanciamos el modelo de estadísticas

// Obtenemos los datos enviados desde el formulario
$id = strtoupper(htmlspecialchars($_POST['id'], ENT_QUOTES, 'UTF-8'));
$facultades = strtoupper(htmlspecialchars($_POST['facultades'], ENT_QUOTES, 'UTF-8'));
$carreras = strtoupper(htmlspecialchars($_POST['carreras'], ENT_QUOTES, 'UTF-8'));
$grupos_investigacion = strtoupper(htmlspecialchars($_POST['grupos_investigacion'], ENT_QUOTES, 'UTF-8'));
$laboratorios = strtoupper(htmlspecialchars($_POST['laboratorios'], ENT_QUOTES, 'UTF-8'));
$herramientas = strtoupper(htmlspecialchars($_POST['herramientas'], ENT_QUOTES, 'UTF-8'));
$investigadores = strtoupper(htmlspecialchars($_POST['investigadores'], ENT_QUOTES, 'UTF-8'));

// Llamamos al método para modificar la estadística
$consulta = $ME->Modificar_Estadistica($id, $facultades, $carreras, $grupos_investigacion, $laboratorios, $herramientas, $investigadores);

// Devolver la respuesta en formato JSON
if ($consulta == 1) {
    echo json_encode(array("status" => "success", "message" => "Modificación exitosa"));
} else {
    echo json_encode(array("status" => "error", "message" => "Error en la modificación"));
}
?>
