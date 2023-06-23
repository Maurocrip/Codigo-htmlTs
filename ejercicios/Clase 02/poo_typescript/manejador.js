"use strict";
///<reference path="./alumno.ts"/>
var manejador;
(function (manejador) {
    function CrearAlumno() {
        let alumno = new prueba.alumno(document.getElementById("txtApellido").value, document.getElementById("txtNombre").value, parseInt(document.getElementById("txtLegajo").value));
        console.log(alumno.ToString());
        alert(alumno.ToString());
    }
    manejador.CrearAlumno = CrearAlumno;
})(manejador || (manejador = {}));
//# sourceMappingURL=manejador.js.map