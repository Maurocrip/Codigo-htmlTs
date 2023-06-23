<?php

if(isset($_GET["valor"]))
{
	echo "valor recuperado por GET: <h1>" . $_GET["valor"]. "</h1>";
}
else if(isset($_POST["valor"]))
{
	echo "valor recuperado por POST: <h1>" . $_POST["valor"] . "</h1>";
}
else
{
	echo "hola mundo AJAX";
}