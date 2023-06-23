<?php

$op = isset($_POST["op"]) ? $_POST["op"] : null;

sleep(2);

switch ($op) {

    case "subirFoto":

        $Ok = "false";

        $destino = "./fotos/" . date("Ymd_His") . ".jpg";
        
        if(move_uploaded_file($_FILES["foto"]["tmp_name"], $destino) ){
            $Ok = "true" . "-" . $destino;
        }

        echo $Ok;

        break;

    case "subirFotoJSON":

        $obj_rta = new stdClass();
        $obj_rta->exito = false;
        $obj_rta->path = "";

        $destino = "./fotos/" . date("Ymd_His") . ".jpg";
        
        if(move_uploaded_file($_FILES["foto"]["tmp_name"], $destino) ){
            $obj_rta->exito = true;
            $obj_rta->path = $destino;
        }

        echo json_encode($obj_rta);

        break;
    
    default:
        echo ":(";
        break;
}