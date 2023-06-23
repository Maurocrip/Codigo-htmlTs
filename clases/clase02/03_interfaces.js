"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Auto = void 0;
var Auto = (function () {
    function Auto(color, precio) {
        this.precio = precio;
        this.color = color;
        this.patente = "sin patente";
    }
    Object.defineProperty(Auto.prototype, "Precio", {
        get: function () {
            return this.precio;
        },
        enumerable: false,
        configurable: true
    });
    Auto.prototype.GetColor = function () {
        return this.color;
    };
    Auto.prototype.SetColor = function (color) {
        this.color = color;
    };
    return Auto;
}());
exports.Auto = Auto;
//# sourceMappingURL=03_interfaces.js.map