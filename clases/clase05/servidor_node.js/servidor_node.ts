
const express = require('express');

const app = express();

app.set('puerto', 9876);

app.get('/', (request:any, response:any)=>{
    response.send('GET - servidor NodeJS');
});

//AGREGO FILE SYSTEM
const fs = require('fs');

//AGREGO JSON
app.use(express.json());

//INDICO RUTA HACIA EL ARCHIVO
const path_archivo = "./archivos/productos.txt";

//INDICO RUTA PARA EL ARCHIVO PRODUCTOS-FOTOS
const path_archivo_foto = "./archivos/productos_fotos.txt";

//AGREGO MULTER
const multer = require('multer');

//AGREGO MIME-TYPES
const mime = require('mime-types');

//AGREGO STORAGE
const storage = multer.diskStorage({

    destination: "public/fotos/",
});

const upload = multer({

    storage: storage
});

//AGREGO MYSQL y EXPRESS-MYCONNECTION
const mysql = require('mysql');
const myconn = require('express-myconnection');
const db_options = {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'productos_node'
};

//AGREGO MW 
app.use(myconn(mysql, db_options, 'single'));

//AGREGO CORS (por default aplica a http://localhost)
const cors = require("cors");

//AGREGO MW 
app.use(cors());

/*
let listaBlanca = ["http://localhost", "http://127.0.0.1", "http://mi_host.com"];

let corsOptions = {
    origin: (origin:any, callback:any)=>{
        if(listaBlanca.indexOf(origin) != -1)
            callback(null, true);
        else
            callback(new Error("no permitido por CORS."));
    }
}
routes.get("/", cors(corsOptions), (request:any, response:any)=>{
    response.send("Solo accedia si se encuentra en la 'lista blanca'");
});
*/

//DIRECTORIO DE ARCHIVOS ESTÁTICOS
app.use(express.static("public"));

//##############################################################################################//
//RUTAS PARA EL CRUD ARCHIVOS
//##############################################################################################//

//LISTAR
app.get('/productos', (request:any, response:any)=>{

    fs.readFile(path_archivo, "UTF-8", (err:any, archivo:any)=>{

        if(err) throw("Error al intentar leer el archivo.");

        console.log("Archivo leído.");

        let prod_array = archivo.split(",\r\n");

        response.send(JSON.stringify(prod_array));
    });
});

//AGREGAR
app.post('/productos', (request:any, response:any)=>{

    let dato = request.body;
    let contenido = JSON.stringify(dato) + ",\r\n";

    //agrega texto
    fs.appendFile(path_archivo, contenido, (err:any)=>{

        if(err) throw("Error al intentar agregar en archivo.");

        console.log("Archivo escrito.");

        response.send("Archivo producto escrito.");
    });

});

//MODIFICAR
app.post('/productos/modificar', (request:any, response:any)=>{

    let obj = request.body;

    fs.readFile(path_archivo, "UTF-8", (err:any, archivo:any)=>{

        if(err) throw("Error al intentar leer el archivo.");

        let prod_array = archivo.split(",\r\n");
        let obj_array : Array<any> = [];

        prod_array.forEach( (prod_str:any) => {

            if(prod_str != "" && prod_str != undefined){

                obj_array.push(JSON.parse(prod_str));
            }
        });

        let obj_array_modif : Array<any> = [];

        obj_array.forEach( (prod:any) => {
            
            if(prod.codigo == obj.codigo){
                
                prod.marca = obj.marca;
                prod.precio = obj.precio;
            }

            obj_array_modif.push(prod);
        });

        let productos_string : string = "";

        obj_array_modif.forEach( (prod:any) => {

            productos_string += JSON.stringify(prod) + ",\r\n";
        });

        //escribe texto
        fs.writeFile(path_archivo, productos_string, (err:any)=>{

            if(err) throw("Error al intentar escribir en archivo.");

            console.log("Archivo modificado.");

            response.send("Archivo producto modificado.");
        });
    });
});

//ELIMINAR
app.post('/productos/eliminar', (request:any, response:any)=>{

    let obj = request.body;

    fs.readFile(path_archivo, "UTF-8", (err:any, archivo:any)=>{

        if(err) throw("Error al intentar leer el archivo.");

        let prod_array = archivo.split(",\r\n");
        let obj_array : Array<any> = [];

        prod_array.forEach( (prod_str:any) => {

            if(prod_str != "" && prod_str != undefined){

                obj_array.push(JSON.parse(prod_str));
            }
        });

        let obj_array_eli : Array<any> = [];

        obj_array.forEach( (prod:any) => {
            
            if(prod.codigo != obj.codigo){
                //se agregan todos los productos, menos el que se quiere eliminar
                obj_array_eli.push(prod);
            }           
        });

        let productos_string : string = "";

        obj_array_eli.forEach( (prod:any) => {

            productos_string += JSON.stringify(prod) + ",\r\n";
        });

        //escribe texto
        fs.writeFile(path_archivo, productos_string, (err:any)=>{

            if(err) throw("Error al intentar escribir en archivo.");

            console.log("Archivo eliminado.");

            response.send("Archivo producto eliminado.");
        });
    });
});

//##############################################################################################//
//RUTAS PARA EL CRUD - CON FOTOS -
//##############################################################################################//

//LISTAR
app.get('/productos_fotos', (request:any, response:any)=>{

    fs.readFile(path_archivo_foto, "UTF-8", (err:any, archivo:any)=>{

        if(err) throw("Error al intentar leer el archivo con foto.");

        console.log("Archivo leído con foto.");

        let prod_array = archivo.split(",\r\n");
        
        response.send(JSON.stringify(prod_array));

    });

});

//AGREGAR
app.post('/productos_fotos', upload.single("foto"), (request:any, response:any)=>{
    //console.log(request.file);

    let file = request.file;
    let extension = mime.extension(file.mimetype);
    let obj = JSON.parse(request.body.obj);
    let path : string = file.destination + obj.codigo + "." + extension;

    fs.renameSync(file.path, path);

    obj.path = path.split("public/")[1];

    let contenido = JSON.stringify(obj) + ",\r\n";

    //agrega texto
    fs.appendFile(path_archivo_foto, contenido, (err:any)=>{

        if(err) throw("Error al intentar agregar en archivo con foto.");

        console.log("Archivo escrito con foto.");

        response.send("Archivo producto escrito - con foto.");
    });

});

//MODIFICAR
app.post('/productos_fotos/modificar', upload.single("foto"), (request:any, response:any)=>{

    let file = request.file;
    let extension = mime.extension(file.mimetype);
    let obj = JSON.parse(request.body.obj);
    let path : string = file.destination + obj.codigo + "." + extension;

    fs.renameSync(file.path, path);

    obj.path = path.split("public/")[1];

    fs.readFile(path_archivo_foto, "UTF-8", (err:any, archivo:any)=>{

        if(err) throw("Error al intentar leer el archivo con foto.");

        let prod_array = archivo.split(",\r\n");
        let obj_array : Array<any> = [];

        prod_array.forEach( (prod_str:any) => {

            if(prod_str != "" && prod_str != undefined){

                obj_array.push(JSON.parse(prod_str));
            }
        });

        let obj_array_modif : Array<any> = [];

        obj_array.forEach( (prod:any) => {
            
            if(prod.codigo == obj.codigo){
                
                prod.marca = obj.marca;
                prod.precio = obj.precio;
            }

            obj_array_modif.push(prod);
        });

        let productos_string : string = "";

        obj_array_modif.forEach( (prod:any) => {

            productos_string += JSON.stringify(prod) + ",\r\n";
        });

        //escribe texto
        fs.writeFile(path_archivo_foto, productos_string, (err:any)=>{

            if(err) throw("Error al intentar escribir en archivo.");

            console.log("Archivo modificado con foto.");

            response.send("Archivo producto modificado con foto.");
        });
    });
});

//ELIMINAR
app.post('/productos_fotos/eliminar', (request:any, response:any)=>{

    let obj = request.body;

    fs.readFile(path_archivo_foto, "UTF-8", (err:any, archivo:any)=>{

        if(err) throw("Error al intentar leer el archivo con foto.");

        let prod_array = archivo.split(",\r\n");
        let obj_array : Array<any> = [];

        prod_array.forEach( (prod_str:any) => {

            if(prod_str != "" && prod_str != undefined){

                obj_array.push(JSON.parse(prod_str));
            }
        });

        let obj_array_eli : Array<any> = [];
        let path_foto : string = "public/";

        obj_array.forEach( (prod:any) => {
            
            if(prod.codigo != obj.codigo){
                //se agregan todos los productos, menos el que se quiere eliminar
                obj_array_eli.push(prod);
            }
            else{
                //se guarda el path de la foto a ser eliminada
                path_foto += prod.path;
            }          
        });

        let productos_string : string = "";

        if(path_foto !== "") {

            obj_array_eli.forEach( (prod:any) => {

                productos_string += JSON.stringify(prod) + ",\r\n";
            });

            //escribe texto
            fs.writeFile(path_archivo_foto, productos_string, (err:any)=>{

                if(err) throw("Error al intentar escribir en archivo con foto.");

                console.log("Archivo eliminado con foto.");

                fs.unlink(path_foto, (err:any) => {
                    if (err) throw err;
                    console.log(path_foto + ' fue borrado.');
                });

                response.send("Archivo producto con foto eliminado.");
            });
        }
    });
});

//BONUS TRACK - AGREGAR ARCHIVOS MÚLTIPLES
app.post('/test_fotos_multiples', upload.array("fotos"), (request:any, response:any)=>{
    console.log(request.files);

    let files = request.files;

    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        let extension = mime.extension(file.mimetype);
        let path : string = file.destination + "__foto__" + i + "." + extension;
    
        fs.renameSync(file.path, path); 
    }        

    response.send("Archivos múltiples subidos exitosamente!!!");
    
});

//##############################################################################################//
//RUTAS PARA EL CRUD - CON BD -
//##############################################################################################//

//LISTAR
app.get('/productos_bd', (request:any, response:any)=>{

    request.getConnection((err:any, conn:any)=>{

        if(err) throw("Error al conectarse a la base de datos.");

        conn.query("select * from productos", (err:any, rows:any)=>{

            if(err) throw("Error en consulta de base de datos.");

            //response.json(rows);
            response.send(JSON.stringify(rows));
        });
    });

});

//AGREGAR
app.post('/productos_bd', upload.single("foto"), (request:any, response:any)=>{
   
    let file = request.file;
    let extension = mime.extension(file.mimetype);
    let obj = JSON.parse(request.body.obj);
    let path : string = file.destination + obj.codigo + "." + extension;

    fs.renameSync(file.path, path);

    obj.path = path.split("public/")[1];

    request.getConnection((err:any, conn:any)=>{

        if(err) throw("Error al conectarse a la base de datos.");

        conn.query("insert into productos set ?", [obj], (err:any, rows:any)=>{

            if(err) {console.log(err); throw("Error en consulta de base de datos.");}

            response.send("Producto agregado a la bd.");
        });
    });
});

//MODIFICAR
app.post('/productos_bd/modificar', upload.single("foto"), (request:any, response:any)=>{
    
    let file = request.file;
    let extension = mime.extension(file.mimetype);
    let obj = JSON.parse(request.body.obj);
    let path : string = file.destination + obj.codigo + "." + extension;

    fs.renameSync(file.path, path);

    obj.path = path.split("public/")[1];

    let obj_modif : any = {};
    //para excluir la pk (codigo)
    obj_modif.marca = obj.marca;
    obj_modif.precio = obj.precio;
    obj_modif.path = obj.path;

    request.getConnection((err:any, conn:any)=>{

        if(err) throw("Error al conectarse a la base de datos.");

        conn.query("update productos set ? where codigo = ?", [obj_modif, obj.codigo], (err:any, rows:any)=>{

            if(err) {console.log(err); throw("Error en consulta de base de datos.");}

            response.send("Producto modificado en la bd.");
        });
    });
});

//ELIMINAR
app.post('/productos_bd/eliminar', (request:any, response:any)=>{
   
    let obj = request.body;
    let path_foto : string = "public/";

    request.getConnection((err:any, conn:any)=>{

        if(err) throw("Error al conectarse a la base de datos.");

        //obtengo el path de la foto del producto a ser eliminado
        conn.query("select path from productos where codigo = ?", [obj.codigo], (err:any, result:any)=>{

            if(err) throw("Error en consulta de base de datos.");
            //console.log(result[0].path);
            path_foto += result[0].path;
        });
    });

    request.getConnection((err:any, conn:any)=>{

        if(err) throw("Error al conectarse a la base de datos.");

        conn.query("delete from productos where codigo = ?", [obj.codigo], (err:any, rows:any)=>{

            if(err) {console.log(err); throw("Error en consulta de base de datos.");}

            fs.unlink(path_foto, (err:any) => {
                if (err) throw err;
                console.log(path_foto + ' fue borrado.');
            });

            response.send("Producto eliminado de la bd.");
        });
    });
});



app.listen(app.get('puerto'), ()=>{
    console.log('Servidor corriendo sobre puerto:', app.get('puerto'));
});