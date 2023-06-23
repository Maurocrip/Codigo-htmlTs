1.- Inicializar node
    npm init -y
2.- Inicializar typescript
    tsc --init
3.- Agregar: express 
    npm install express
4.- Armar servidor nodeJS (preferentemente, utilizando code-snippet)
5.- Transpilar archivo y correr el servidor
    node nombre_archivo

NOTA: Cada cambio que se realice sobre 'nombre_archivo' requiere que se transpile y reinicie

6.- Probar en el navegador
    http://localhost:puerto

7.- Agregar las rutas para el CRUD
    app.get('/productos' ....
    app.post('/productos' ....
    app.post('/productos/modificar ....
    app.post('/productos/eliminar' ....

8.- Probar las rutas. Ulilizar Postman o extensión Thunder Client

9.- Requerir filesystem y usar json
    const fs = require('fs');
    app.use(express.json());

10.- Agregar: multer y mime-types
	npm install multer mime-types

11.- Requerir: multer y mime-types
    const multer = require('multer');
    const mime = require('mime-types');

12.- Configurar multer 
    const upload = multer({
        storage: multer.diskStorage({
                    destination: "path_destino",
                });
    });

13.- Agregar las rutas para el CRUD con fotos
    app.get('/productos_fotos' ....
    app.post('/productos_fotos' ....
    app.post('/productos_fotos/modificar ....
    app.post('/productos_fotos/eliminar' ....

14.- En las rutas productos_fotos (post) y productos_fotos/modificar, 
    agregar el middleware multer
	const upload = multer({dest:'path_destino'});
	app.post('ruta', upload.single('nombre_del_name_del_input:file'), ...)
	
15.- Configurar en las rutas productos_fotos (post) y productos_fotos/modificar (para renombrar la foto)
    fs.renameSync(request.file.path, 'path_destino_final');

16.- Probar las rutas. Ulilizar Postman o extensión Thunder Client

  
Apéndice:
Crear code-snippet para la creación del servidor NodeJs

1.- Menú -> Archivo --> Preferencias >> Fragmentos de código del usuario.
2.- Crear el code-snippet dentro de las llaves ({ })
3.- 
	"servidor_nodejs" : {
		"scope": "typescript",
		"prefix": "snjs",
		"body": [
			"const express = require('express');",
			"",
			"const app = express();",
			"",
			"app.set('puerto', $1);",
			"",
			"app.get('/', (request:any, response:any)=>{",
			"\tresponse.send('GET - servidor NodeJS');",
			"});",
			"",
			"",
			"app.listen(app.get('puerto'), ()=>{",
			"\tconsole.log('Servidor corriendo sobre puerto:', app.get('puerto'));",
			"});"
		],
		"description": "Creación de servidor NodeJS"
	}

4.- Guardar.
