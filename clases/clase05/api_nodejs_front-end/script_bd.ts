
window.addEventListener("load", ()=>{

    let btnTraer = <HTMLButtonElement>document.getElementById("btnTraer");
    let btnAgregar = <HTMLInputElement>document.getElementById("btnAgregar");
    let btnModificar = <HTMLInputElement>document.getElementById("btnModificar");
    let btnEliminar = <HTMLButtonElement>document.getElementById("btnEliminar");


    btnTraer.addEventListener("click", TraerListadoProductoBD);
    btnAgregar.addEventListener("click", AgregarProductoBD);
    btnModificar.addEventListener("click", ModificarProductoBD);
    btnEliminar.addEventListener("click", EliminarProductoBD);
});

function TraerListadoProductoBD() {
    
    let xhttp : XMLHttpRequest = new XMLHttpRequest();

    xhttp.open("GET", URL_API + "productos_bd", true);

    //ENVIO DE LA PETICION
    xhttp.send();

    //FUNCION CALLBACK
    xhttp.onreadystatechange = () => {
        
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            //let prod_string_array = JSON.parse(xhttp.responseText);
            let prod_obj_array: any[] = JSON.parse(xhttp.responseText);//[];

            //prod_string_array.forEach((obj_str: string) => {
                //if (obj_str !== "") {
                    //prod_obj_array.push(JSON.parse(obj_str));
                //}
            //});

            let div = <HTMLDivElement>document.getElementById("divListado");

            let tabla = `<table>
                            <tr>
                                <th>CÓDIGO</th><th>MARCA</th><th>PRECIO</th><th>FOTO</th><th>ACCIÓN</th>
                            </tr>`;
            for (let index = 0; index < prod_obj_array.length; index++) {
                const dato = prod_obj_array[index];
                tabla += `<tr><td>${dato.codigo}</td><td>${dato.marca}</td><td>${dato.precio}</td>
                            <td><img src="${URL_API}${dato.path}" width="50px" hight="50px"></td>
                            <td><input type="button" id="" data-obj='${JSON.stringify(dato)}' 
                                value="Seleccionar" name="btnSeleccionar"></td></tr>`;
            }  
            
            tabla += `</table>`;

            div.innerHTML = tabla;

            AsignarManejadoresSeleccionProductoBD();

            LimpiarFoto();
        }
    };
}

function AsignarManejadoresSeleccionProductoBD(){

    document.getElementsByName("btnSeleccionar").forEach((elemento)=>{

        elemento.addEventListener("click", ()=>{ ObtenerModificarProductoBD(elemento)});
        elemento.addEventListener("click", ()=>{ ObtenerEliminar(elemento)});
    });
}

function AgregarProductoBD() {
    
    let codigo:number = parseInt((<HTMLInputElement>document.getElementById("txtCodigo")).value);
    let marca:string = (<HTMLInputElement>document.getElementById("txtMarca")).value;
    let precio:number = parseFloat((<HTMLInputElement>document.getElementById("txtPrecio")).value);
    let foto : any = (<HTMLInputElement> document.getElementById("foto"));

    let data = {
        "codigo" : codigo,
        "marca" : marca,
        "precio" : precio
    };

    let xhttp : XMLHttpRequest = new XMLHttpRequest();  

    let form : FormData = new FormData();
    form.append('foto', foto.files[0]);
    form.append('obj', JSON.stringify(data));

    xhttp.open("POST", URL_API + "productos_bd", true);
	
    xhttp.setRequestHeader("enctype", "multipart/form-data");
    
    xhttp.send(form); 

    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            let mensaje : string = xhttp.responseText;

            alert(mensaje);

            TraerListadoProductoBD();
        }
    };
}

function ObtenerModificarProductoBD(dato:any) {

    let obj = dato.getAttribute("data-obj");

    let obj_dato = JSON.parse(obj);

    (<HTMLInputElement>document.getElementById("txtCodigo_m")).value = obj_dato.codigo;
    (<HTMLInputElement>document.getElementById("txtMarca_m")).value = obj_dato.marca;
    (<HTMLInputElement>document.getElementById("txtPrecio_m")).value = obj_dato.precio;   
    (<HTMLImageElement>document.getElementById("imgFoto_m")).src = URL_API + obj_dato.path;
}

function ModificarProductoBD(){

    let codigo:number = parseInt((<HTMLInputElement>document.getElementById("txtCodigo_m")).value);
    let marca:string = (<HTMLInputElement>document.getElementById("txtMarca_m")).value;
    let precio:number = parseFloat((<HTMLInputElement>document.getElementById("txtPrecio_m")).value);
    let foto : any = (<HTMLInputElement> document.getElementById("foto_m"));

    let data = {
        "codigo" : codigo,
        "marca" : marca,
        "precio" : precio
    };

    let form : FormData = new FormData();
    form.append('foto', foto.files[0]);
    form.append('obj', JSON.stringify(data));

    let xhttp : XMLHttpRequest = new XMLHttpRequest();

    xhttp.open("POST", URL_API + "productos_bd/modificar", true);
	
    xhttp.setRequestHeader("enctype", "multipart/form-data");
    
    xhttp.send(form);

    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            let mensaje : string = xhttp.responseText;

            alert(mensaje);

            TraerListadoProductoBD();
        }
    };
}

function EliminarProductoBD(){

    let codigo:number = parseInt((<HTMLInputElement>document.getElementById("txtCodigo_e")).value);

    let data = {
        "codigo" : codigo,
    };

    let xhttp : XMLHttpRequest = new XMLHttpRequest();

    xhttp.open("POST", URL_API + "productos_bd/eliminar", true);
	
    xhttp.setRequestHeader("content-type","application/json");
    
    xhttp.send(JSON.stringify(data));

    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            let mensaje : string = xhttp.responseText;

            alert(mensaje);

            TraerListadoProductoBD();
        }
    };
}
