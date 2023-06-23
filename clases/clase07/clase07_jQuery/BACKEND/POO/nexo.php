<?php

require_once ("AccesoDatos.php");
require_once ("cd.php");

$op = isset($_POST['op']) ? $_POST['op'] : NULL;

switch ($op) {

    case 'insertarCd':
    
        $miCD = new cd();
        $miCD->id = 66;
        $miCD->titulo = "Un título";
        $miCD->anio = 2018;
        $miCD->interprete = "Un cantante";
        
        $miCD->InsertarElCD();

        echo "ok";
        
        break;

    case 'modificarCd':
    
        $id = $_POST['id'];        
        $titulo = $_POST['titulo'];
        $anio = $_POST['anio'];
        $interprete = $_POST['interprete'];
    
        echo cd::ModificarCD($id, $titulo, $anio, $interprete);
            
        break;

    case 'modificarCd_json':
    
        $obj = json_decode($_POST['obj_json']);
        $id = $obj->id;        
        $titulo = $obj->titulo;
        $anio = $obj->anio;
        $interprete = $obj->interprete; 
         
        echo cd::ModificarCD($id, $titulo, $anio, $interprete);
            
        break;
    
    case 'eliminarCd':
    
        $id_cd = isset($_POST['id_cd']) ? $_POST['id_cd'] : NULL;
        $obj_rta = new stdClass();

        $miCD = new cd();
        $miCD->id = $id_cd;
        
        $obj_rta->exito = $miCD->EliminarCD($miCD);

        echo json_encode($obj_rta);
        
        break;
        
    case 'traerListadoCD':

        $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
        
        $consulta = $objetoAccesoDato->RetornarConsulta("select id, titel AS titulo, interpret AS interprete, jahr AS anio "
                                                        . "FROM cds");
        $consulta->execute();
        
        $consulta->setFetchMode(PDO::FETCH_INTO, new cd);
        
        $tabla = "<table><tr><th>ID</th><th>TITULO</th><th>INTERPRETE</th><th>AÑO</th><th>ACCIONES</th></tr>";

        foreach ($consulta as $cd) {
        
            $obj = json_encode($cd);

            $tabla .= "<tr><td>" . $cd->id . "</td><td>" . $cd->titulo . "</td><td>" . $cd->interprete . "</td><td>" 
                        . $cd->anio . "</td><td> 
                        <input type='button' data-action='btn_eliminar' data-obj='".$obj."' value='Eliminar'></td><td></tr>";

        }

        $tabla .= "</table>";

        echo $tabla;

        break;
                
    default:
        echo ":(";
        break;
}
