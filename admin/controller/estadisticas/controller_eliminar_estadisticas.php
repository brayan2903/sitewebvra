<?php
    require "../../model/model_estadisticas.php";
    $ME = new Modelo_Estadisticas(); // Instanciamos el modelo de estadísticas

    // Obtenemos el ID de la estadística a eliminar
    $id = strtoupper(htmlspecialchars($_POST['id'], ENT_QUOTES, 'UTF-8'));

    // Llamamos al método para eliminar la estadística
    $consulta = $ME->Eliminar_Estadistica($id);

    // Verificamos si la eliminación fue exitosa
    if ($consulta == 1) {
        echo "Eliminación exitosa";
    } else {
        echo "Error en la eliminación";
    }
?>
