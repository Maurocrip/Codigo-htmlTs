"use strict";
var prueba;
(function (prueba) {
    class persona {
        get Apellido() {
            return this.apellido;
        }
        get Nombre() {
            return this.nombre;
        }
        set Nombre(value) {
            this.nombre = value;
        }
        set Apellido(value) {
            this.apellido = value;
        }
        constructor(apellidoNuevo, nombreNuevo) {
            this.apellido = apellidoNuevo;
            this.nombre = nombreNuevo;
        }
        ToString() {
            return this.apellido + " - " + this.nombre;
        }
    }
    prueba.persona = persona;
})(prueba || (prueba = {}));
//# sourceMappingURL=persona.js.map