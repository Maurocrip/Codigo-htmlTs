<?php

    //SIMULO RETARDO EN LA RED
    sleep(3);

   // var_dump($_POST);
	
	//$persona = json_decode($_POST["miPersona"]); //ERROR
//	$persona = json_encode($_POST["miPersona"]); //ERROR, NO ES OBJETO 
// 	echo $persona->edad . " - " . $persona->nombre . "<br/>";

	$persona = json_decode(json_encode($_POST["miPersona"]));

	echo $persona->edad . " - " . $persona->nombre . "<br/>";
	
//	echo $persona;//ERROR, SI ES OBJETO.	
