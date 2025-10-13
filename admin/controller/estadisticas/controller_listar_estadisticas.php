<?php
require "../../model/model_estadisticas.php";
$ME = new Modelo_Estadisticas(); // Instanciamos el modelo de estadísticas

// Llamamos al método que lista las estadísticas
$consulta = $ME->Listar_Estadisticas();

// Verificamos si la consulta devolvió resultados
if($consulta && isset($consulta['data'])) {
    // Si hay datos, devolvemos la respuesta en el formato adecuado para DataTables
    $response = array(
        "draw" => isset($_GET['draw']) ? intval($_GET['draw']) : 1, // Esto es importante para manejar correctamente el parámetro 'draw' de DataTables
        "recordsTotal" => count($consulta['data']),
        "recordsFiltered" => count($consulta['data']), // Si estás filtrando, usa el total de registros filtrados
        "data" => $consulta['data'] // Los datos que se mostrarán en la tabla
    );
    echo json_encode($response);
} else {
    // Si no hay resultados, retornamos una estructura vacía
    echo json_encode(array(
        "draw" => isset($_GET['draw']) ? intval($_GET['draw']) : 1,
        "recordsTotal" => 0,
        "recordsFiltered" => 0,
        "data" => []
    ));
}
?>
