<?php
require "../../model/model_estadisticas.php"; // Incluir el modelo de estadísticas
$ME = new Modelo_Estadisticas(); // Instanciamos el modelo de estadísticas

// Obtenemos los datos enviados desde el formulario
$facultades = strtoupper(htmlspecialchars($_POST['facultades'], ENT_QUOTES, 'UTF-8'));
$carreras = strtoupper(htmlspecialchars($_POST['carreras'], ENT_QUOTES, 'UTF-8'));
$grupos_investigacion = strtoupper(htmlspecialchars($_POST['grupos_investigacion'], ENT_QUOTES, 'UTF-8'));
$laboratorios = strtoupper(htmlspecialchars($_POST['laboratorios'], ENT_QUOTES, 'UTF-8'));
$herramientas = strtoupper(htmlspecialchars($_POST['herramientas'], ENT_QUOTES, 'UTF-8'));
$investigadores = strtoupper(htmlspecialchars($_POST['investigadores'], ENT_QUOTES, 'UTF-8'));

// Llamamos al método para registrar una nueva estadística
$consulta = $ME->Registrar_Estadistica($facultades, $carreras, $grupos_investigacion, $laboratorios, $herramientas, $investigadores);

// Verificamos si la consulta fue exitosa
if ($consulta == "Registro exitoso") {
    echo 1;  // Si todo fue bien, devolvemos 1
} else {
    echo 0;  // Si hubo un error, devolvemos 0
}
?>
