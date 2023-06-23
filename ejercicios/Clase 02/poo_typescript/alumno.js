"use strict";
///<reference path="./persona.ts"/>
var prueba;
(function (prueba) {
    class alumno extends prueba.persona {
        get Legajo() {
            return this.legajo;
        }
        set Legajo(value) {
            this.legajo = value;
        }
        constructor(apellidoNuevo, nombreNuevo, legajoNuevo) {
            super(apellidoNuevo, nombreNuevo);
            this.legajo = legajoNuevo;
        }
        ToString() {
            return super.ToString() + " - " + this.legajo;
        }
    }
    prueba.alumno = alumno;
})(prueba || (prueba = {}));
//# sourceMappingURL=alumno.js.map