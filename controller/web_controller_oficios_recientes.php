<?php
    require "../model/web_model_oficios.php";
    $MU = new Modelo_Oficio();//Instaciamos
    $cantidad = isset($_POST['cantidad']) ? (int)$_POST['cantidad'] : 3;
    $consulta = $MU->Listar_Oficios_Recientes($cantidad); 
    if($consulta){
        echo json_encode($consulta);
    }else{
        echo '{
            "sEcho": 1,
            "iTotalRecords": "0",
            "iTotalDisplayRecords": "0",
            "aaData": []
        }';
    }

?>   