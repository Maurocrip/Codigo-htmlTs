"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Auto = void 0;
var Auto = (function () {
    function Auto(color, precio) {
        this.precio = precio;
        this.color = color;
    }
    Auto.prototype.GetColor = function () {
        return this.color;
    };
    Auto.prototype.SetColor = function (color) {
        this.color = color;
    };
    Object.defineProperty(Auto.prototype, "Precio", {
        get: function () {
            return this.precio;
        },
        set: function (value) {
            this.precio = value;
        },
        enumerable: false,
        configurable: true
    });
    Auto.MetodoEstatico = function () {
        console.log("Método esático");
    };
    return Auto;
}());
exports.Auto = Auto;
//# sourceMappingURL=01_clases.js.map