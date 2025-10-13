<?php
require_once "web_model_conexion.php";

class Modelo_Oficio extends ConexionDB {

    public function Listar_Oficios() {
        $c = conexionDB::conexionPDO();
        $sql = "CALL SP_LISTAR_OFICIO()";
        $query = $c->prepare($sql);
        $query->execute();
        $resultado = $query->fetchAll(PDO::FETCH_ASSOC);
        conexionDB::cerrar_conexion(); // ✅ antes del return
        return $resultado;
    }

    public function Traer_Documento_Ofi($id) {
        $c = conexionDB::conexionPDO();
        $sql = "CALL SP_TRAER_DOCUMENTO_OFI(?)";
        $query = $c->prepare($sql);
        $query->bindParam(1, $id);
        $query->execute();
        $resultado = $query->fetchAll(PDO::FETCH_ASSOC);
        conexionDB::cerrar_conexion();
        return $resultado;
    }

    public function Buscar_Oficios($texto) {
        $c = conexionDB::conexionPDO();
        $sql = "CALL SP_BUSCAR_COMUNICADO(?)";
        $query = $c->prepare($sql);
        $query->bindParam(1, $texto);
        $query->execute();
        $resultado = $query->fetchAll(PDO::FETCH_ASSOC);
        conexionDB::cerrar_conexion();
        return $resultado;
    }

    public function Listar_Oficios_Recientes($cantidad) {
        $c = conexionDB::conexionPDO();
        $sql = "CALL SP_LISTAR_OFICIOS_RECIENTES(?)";
        $query = $c->prepare($sql);
        $cantidad = (int)$cantidad; // fuerza a entero para evitar error 1366
        $query->bindParam(1, $cantidad, PDO::PARAM_INT);
        $query->execute();
        $resultado = $query->fetchAll(PDO::FETCH_ASSOC);
        conexionDB::cerrar_conexion();
        return $resultado;
    }
}
?>
