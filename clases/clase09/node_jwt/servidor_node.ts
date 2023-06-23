
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

//AGREGO JWT
const jwt = require("jsonwebtoken");

//SE ESTABLECE LA CLAVE SECRETA PARA EL TOKEN
app.set("key", "cl@ve_secreta");

app.use(express.urlencoded({extended:false}));

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

//AGREGO CORS (por default aplica a http://localhost)
const cors = require("cors");

//AGREGO MW 
app.use(cors());

//DIRECTORIO DE ARCHIVOS ESTÁTICOS
app.use(express.static("public"));


//AGREGO MYSQL y EXPRESS-MYCONNECTION
const mysql = require('mysql');
const myconn = require('express-myconnection');
const db_options = {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'productos_usuarios_node'
};

app.use(myconn(mysql, db_options, 'single'));

//##############################################################################################//
//RUTAS PARA LOS MIDDLEWARES DEL JWT
//##############################################################################################//

const verificar_jwt = express.Router();

verificar_jwt.use((request:any, response:any, next:any)=>{

    //SE RECUPERA EL TOKEN DEL ENCABEZADO DE LA PETICIÓN
    let token = request.headers["x-access-token"] || request.headers["authorization"];
    
    if (! token) {
        response.status(401).send({
            error: "El JWT es requerido!!!"
        });
        return;
    }

    if(token.startsWith("Bearer ")){
        token = token.slice(7, token.length);
    }

    if(token){
        //SE VERIFICA EL TOKEN CON LA CLAVE SECRETA
        jwt.verify(token, app.get("key"), (error:any, decoded:any)=>{

            if(error){
                return response.json({
                    exito: false,
                    mensaje:"El JWT NO es válido!!!"
                });
            }
            else{

                console.log("middleware verificar_jwt");

                //SE AGREGA EL TOKEN AL OBJETO DE LA RESPUESTA
                response.jwt = decoded;
                //SE INVOCA AL PRÓXIMO CALLEABLE
                next();
            }
        });
    }
});

const solo_admin = express.Router();

solo_admin.use(verificar_jwt, (request:any, response:any, next:any)=>{

    console.log("middleware solo_admin");

    //SE RECUPERA EL TOKEN DEL OBJETO DE LA RESPUESTA
    let usuario = response.jwt;

    if(usuario.perfil == "administrador"){
        //SE INVOCA AL PRÓXIMO CALLEABLE
         next();
    }
    else{
        return response.json({
            mensaje:"NO tiene perfil de 'ADMINISTRADOR'"
        });
    }
   
}/*, function (request:any, response:any, next:any) {
    console.log('Request Type:', request.method);
    next();
  }*/);


//##############################################################################################//
//RUTAS PARA EL TEST DE JWT
//##############################################################################################//

//#01
app.post("/crear_token", (request:any, response:any)=>{

    if((request.body.usuario == "admin" || request.body.usuario == "user") && request.body.clave == "123456"){

        //SE CREA EL PAYLOAD CON LOS ATRIBUTOS QUE NECESITAMOS
        const payload = { 
            exito : true,
            usuario: request.body.usuario,
            perfil: request.body.usuario == "admin" ? "administrador" : "usuario",
        };

        //SE FIRMA EL TOKEN CON EL PAYLOAD Y LA CLAVE SECRETA
        const token = jwt.sign(payload, app.get("key"), {
            expiresIn : "1d"
        });

        response.json({
            mensaje : "JWT creado",
            jwt : token
        });
    }
    else{
        response.json({
            mensaje : "Usuario no registrado",
            jwt : null
        });
    }

});
//#02
app.get('/verificar_token', verificar_jwt, (request:any, response:any)=>{
    
    response.json({exito:true, jwt: response.jwt});
});
//#03
app.get('/admin', solo_admin, (request:any, response:any)=>{
    
    response.json(response.jwt);
});


//##############################################################################################//
//RUTAS PARA LOS MIDDLEWARES DEL JWT
//##############################################################################################//

const verificar_usuario = express.Router();

verificar_usuario.use((request:any, response:any, next:any)=>{

    let obj = request.body;

    request.getConnection((err:any, conn:any)=>{

        if(err) throw("Error al conectarse a la base de datos.");

        conn.query("select * from usuarios where legajo = ? and apellido = ? ", [obj.legajo, obj.apellido], (err:any, rows:any)=>{

            if(err) throw("Error en consulta de base de datos.");

            if(rows.length == 1){

                response.obj_usuario = rows[0];
                //SE INVOCA AL PRÓXIMO CALLEABLE
                next();
            }
            else{
                response.status(401).json({
                    exito : false,
                    mensaje : "Apellido y/o Legajo incorrectos.",
                    jwt : null
                });
            }           
        });
    });
});

const alta_baja = express.Router();

alta_baja.use(verificar_jwt, (request:any, response:any, next:any)=>{

    console.log("middleware alta_baja");

    //SE RECUPERA EL TOKEN DEL OBJETO DE LA RESPUESTA
    let obj = response.jwt;

    if(obj.usuario.rol == "administrador"){
        //SE INVOCA AL PRÓXIMO CALLEABLE
         next();
    }
    else{
        return response.status(401).json({
            mensaje:"NO tiene el rol necesario para realizar la acción."
        });
    }
});

const modificar = express.Router();

modificar.use(verificar_jwt, (request:any, response:any, next:any)=>{
  
    console.log("middleware modificar");

    //SE RECUPERA EL TOKEN DEL OBJETO DE LA RESPUESTA
    let obj = response.jwt;

    if(obj.usuario.rol == "administrador" || obj.usuario.rol == "supervisor"){
        //SE INVOCA AL PRÓXIMO CALLEABLE
        next();
    }
    else{
        return response.status(401).json({
            mensaje:"NO tiene el rol necesario para realizar la acción."
        });
    }   
});

//##############################################################################################//
//RUTAS PARA EL SERVIDOR DE AUTENTICACIÓN
//##############################################################################################//

app.post("/login", verificar_usuario, (request:any, response:any, obj:any)=>{

    //SE RECUPERA EL USUARIO DEL OBJETO DE LA RESPUESTA
    const user = response.obj_usuario;

    //SE CREA EL PAYLOAD CON LOS ATRIBUTOS QUE NECESITAMOS
    const payload = { 
        usuario: {
            id : user.id,
            apellido : user.apellido,
            nombre : user.nombre,
            rol : user.rol
        },
        api : "productos_usuarios",
    };

    //SE FIRMA EL TOKEN CON EL PAYLOAD Y LA CLAVE SECRETA
    const token = jwt.sign(payload, app.get("key"), {
        expiresIn : "5m"
    });

    response.json({
        exito : true,
        mensaje : "JWT creado!!!",
        jwt : token
    });

});



//##############################################################################################//
//RUTAS PARA EL CRUD - CON BD -
//##############################################################################################//

//LISTAR
app.get('/productos_bd', verificar_jwt, (request:any, response:any)=>{

    request.getConnection((err:any, conn:any)=>{

        if(err) throw("Error al conectarse a la base de datos.");

        conn.query("select * from productos", (err:any, rows:any)=>{

            if(err) throw("Error en consulta de base de datos.");

            response.send(JSON.stringify(rows));
        });
    });

});

//AGREGAR
app.post('/productos_bd', alta_baja, upload.single("foto"), (request:any, response:any)=>{
   
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
app.post('/productos_bd/modificar', modificar, upload.single("foto"), (request:any, response:any)=>{
    
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
app.post('/productos_bd/eliminar', alta_baja, (request:any, response:any)=>{
   
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