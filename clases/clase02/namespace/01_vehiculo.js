"use strict";
var Test;
(function (Test) {
    var Vehiculo = (function () {
        function Vehiculo(marca) {
            this.marca = marca;
        }
        Vehiculo.prototype.Mostrar = function () {
            return this.marca;
        };
        return Vehiculo;
    }());
    Test.Vehiculo = Vehiculo;
})(Test || (Test = {}));
//# sourceMappingURL=01_vehiculo.js.map