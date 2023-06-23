function JqueryAjax(){
// Invocación sin parámetros.
// Asigna manejadores después de la petición
// y recuerda el objeto jqxhr de la solicitud.
	var jqxhr = $.ajax("BACKEND/ajax_test.php")
		.done(function() {
			alert("done");
		})
		.fail(function(jqXHR, textStatus, errorThrown) {
			alert(jqXHR.responseText + "\n");
			alert(textStatus + ":\n" + errorThrown);
		})
		.always(function() {
			alert("siempre se ejecuta...");
		});
 
// Agregar tarea...
 
// Establece otra función de finalización de la solicitud anterior.
	jqxhr.always(function() {
		alert("segunda función de finalización...");
	});

}

function JqueryAjaxConParametrosString(){

    var pagina = "BACKEND/ajax_test.php";
    
	var datoString = "valor="+Math.random()*100;
	
    $.ajax({
        type: 'POST',//GET o POST. GET DEFAULT.
        url: pagina,//PAGINA DESTINO DE LA PETICION
        dataType: "text",//INDICA EL TIPO QUE SE ESPERA RECIBIR DESDE EL SERVIDOR (XML, HTML, TEXT, JSON, SCRIPT) 
        data: datoString,//DATO A SER ENVIADO AL SERVIDOR. TIPO: OBJETO, STRING, ARRAY.
        async: true,//ESTABLECE EL MODO DE PETICION. DEFECTO ASINCRONICO.
		statusCode: {//CODIGO NUMERICO DE RESPUESTA HTTP
						200: function(){
							alert("200 - Encontrado!!!");
						},
						404: function(){
							alert("404 - No encontrado!!!");
						}
					}
    })
	.done(function (resultado) {//RECUPERO LA RESPUESTA DEL SERVIDOR EN 'RESULTADO', DE ACUERDO AL DATATYPE.
		$("#divResultado").html(resultado);
	})
	.fail(function (jqXHR, textStatus, errorThrown) {
        alert(jqXHR.responseText + "\n" + textStatus + "\n" + errorThrown);
    });    
}

function JqueryAjaxConParametrosJSON(){

    var pagina = "BACKEND/recibir_json.php";
	var datoObjeto = {"miPersona" : { "nombre" : "JUAN", "edad" : 52 } };

	//LIMPIO EL CONTENIDO DEL DIV    
	$("#divResultado").html("");

    $.ajax({
        type: 'POST',
        url: pagina,
        dataType: "text",
        data: datoObjeto,
        async: true
    })
	.done(function (resultado) {
		//MUESTRO EL RESULTADO DE LA PETICION
		$("#divResultado").html(resultado);
	})
	.fail(function (jqXHR, textStatus, errorThrown) {
        alert(jqXHR.responseText + "\n" + textStatus + "\n" + errorThrown);
    });    
}

function JqueryAjaxRetornoJSON(){

    var pagina = "BACKEND/enviar_json.php";

	//LIMPIO EL CONTENIDO DEL DIV    
	$("#divResultado").html("");

    $.ajax({
        type: 'POST',
        url: pagina,
        dataType: "json"
    })
	.done(function (objJSON) {
		//MUESTRO EL RESULTADO DE LA PETICION
		$("#divResultado").html(objJSON.edad + " - " + objJSON.nombre);
	})
	.fail(function (jqXHR, textStatus, errorThrown) {
        alert(jqXHR.responseText + "\n" + textStatus + "\n" + errorThrown);
    });    
}