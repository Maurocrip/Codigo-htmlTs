"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _02_herencia_1 = require("./02_herencia");
function Generica(param) {
    console.log("El tipo es: " + typeof (param));
    return param;
}
var retStrring = Generica("hola");
console.log(retStrring);
retStrring = Generica("mundo");
console.log(retStrring);
console.log("---------------------------");
var autito = new _02_herencia_1.Auto("ROJO", 125000, "FERRARI");
var retAuto = Generica(autito);
console.log(retAuto.Mostrar());
retAuto = Generica(new _02_herencia_1.Auto("AMARILLO", 200000, "SEAT"));
console.log(retAuto.Mostrar());
console.log("---------------------------");
var ClaseGenerica = (function () {
    function ClaseGenerica(uno, dos) {
        this.paramUno = uno;
        this.paramDos = dos;
    }
    ClaseGenerica.prototype.Mostrar = function () {
        console.log(this.paramUno + " - " + this.paramDos);
    };
    return ClaseGenerica;
}());
var obj = new ClaseGenerica("cadena", 10);
var obj2 = new ClaseGenerica(true, "otra cadena");
obj.Mostrar();
obj2.Mostrar();
console.log("---------------------------");
//# sourceMappingURL=05_generics.js.map