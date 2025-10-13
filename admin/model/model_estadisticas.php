<?php
require_once "model_conexion.php";

class Modelo_Estadisticas extends ConexionDB {

    // Función para listar todas las estadísticas
    public function Listar_Estadisticas(){
        $c = conexionDB::conexionPDO();
        $sql = "SELECT * FROM estadisticas";  // Consulta a la tabla estadisticas
        $query = $c->prepare($sql);
        $query->execute();
        $resultado = $query->fetchAll(PDO::FETCH_ASSOC);

        // Aseguramos que los datos están en el formato esperado
        return array(
            "data" => $resultado
        );
    }


    // Función para registrar una nueva estadística
    public function Registrar_Estadistica($facultades, $carreras, $grupos_investigacion, $laboratorios, $herramientas, $investigadores) {
    $c = conexionDB::conexionPDO();
    $sql = "INSERT INTO estadisticas (facultades, carreras, grupos_investigacion, laboratorios, herramientas, investigadores) 
            VALUES (?, ?, ?, ?, ?, ?)";  // Consulta para insertar una nueva estadística
    $query = $c->prepare($sql);
    $query->bindParam(1, $facultades);
    $query->bindParam(2, $carreras);
    $query->bindParam(3, $grupos_investigacion);
    $query->bindParam(4, $laboratorios);
    $query->bindParam(5, $herramientas);
    $query->bindParam(6, $investigadores);
    
    $query->execute();
    
    if ($query->rowCount() > 0) {
        conexionDB::cerrar_conexion();
        return "Registro exitoso";  // Confirmación de inserción
    } else {
        conexionDB::cerrar_conexion();
        return "Error en la inserción";  // Error en la inserción
    }
}
    

    // Función para modificar una estadística
    public function Modificar_Estadistica($id, $facultades, $carreras, $grupos_investigacion, $laboratorios, $herramientas, $investigadores) {
    $c = conexionDB::conexionPDO();
    $sql = "UPDATE estadisticas 
            SET facultades = ?, carreras = ?, grupos_investigacion = ?, laboratorios = ?, herramientas = ?, investigadores = ? 
            WHERE id = ?";  // Consulta para actualizar una estadística
    $query = $c->prepare($sql);
    $query->bindParam(1, $facultades);
    $query->bindParam(2, $carreras);
    $query->bindParam(3, $grupos_investigacion);
    $query->bindParam(4, $laboratorios);
    $query->bindParam(5, $herramientas);
    $query->bindParam(6, $investigadores);
    $query->bindParam(7, $id);
    $query->execute();

    if ($query->rowCount() > 0) {
        return 1;  // Modificación exitosa
    } else {
        return 0;  // Error o no se hizo ninguna modificación
    }

    conexionDB::cerrar_conexion();
}


    // Función para eliminar una estadística
    public function Eliminar_Estadistica($id) {
        $c = conexionDB::conexionPDO();
        $sql = "DELETE FROM estadisticas WHERE id = ?";  // Consulta para eliminar una estadística
        $query = $c->prepare($sql);
        $query->bindParam(1, $id);
        $query->execute();
        conexionDB::cerrar_conexion();
        return "Eliminación exitosa";  // Confirmación de eliminación
    }

    // Función para obtener una estadística por su ID
    public function Obtener_Estadistica_por_ID($id) {
        $c = conexionDB::conexionPDO();
        $sql = "SELECT * FROM estadisticas WHERE id = ?";  // Consulta para obtener una estadística por su ID
        $query = $c->prepare($sql);
        $query->bindParam(1, $id);
        $query->execute();
        $resultado = $query->fetch(PDO::FETCH_ASSOC);
        conexionDB::cerrar_conexion();
        return $resultado;  // Devolvemos la estadística encontrada
    }

    // Función para obtener los campos de la tabla 'estadisticas'
    public function Obtener_Campos_Estadisticas() {
        $c = conexionDB::conexionPDO();
        $sql = "DESCRIBE estadisticas";  // Consulta para obtener la estructura de la tabla
        $query = $c->prepare($sql);
        $query->execute();
        $resultado = $query->fetchAll(PDO::FETCH_ASSOC);
        conexionDB::cerrar_conexion();
        return $resultado;  // Devolvemos los campos de la tabla
    }
}
?>
