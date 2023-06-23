///<reference path="./alumno.ts"/>

namespace manejador
{
    export function CrearAlumno():void
    {
        let alumno : prueba.alumno = new prueba.alumno((<HTMLInputElement> document.getElementById("txtApellido")).value,(<HTMLInputElement> document.getElementById("txtNombre")).value,parseInt((<HTMLInputElement> document.getElementById("txtLegajo")).value));  
        console.log(alumno.ToString());
        alert(alumno.ToString());
    }

}

