"use strict";
/*2.- La clase FiguraGeometrica posee: todos sus atributos protegidos, un constructor con un
parámetro, un método getter para el atributo _color, un método virtual (ToString) y dos métodos
abstractos: Dibujar (público) y CalcularDatos (protegido).
CalcularDatos será invocado en el constructor de la clase derivada que corresponda, su
funcionalidad será la de inicializar los atributos _superficie y _perimetro.
Dibujar, retornará un string (con el color que corresponda) formando la figura geométrica del objeto
que lo invoque (retornar una serie de asteriscos que modele el objeto).

Utilizar el método ToString para obtener toda la información completa del objeto, y luego dibujarlo
por pantalla y mostrarlo por consola.*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.Triangulo = exports.Rectangulo = exports.FiguraGeometrica = void 0;
class FiguraGeometrica {
    get _Color() {
        return this._color;
    }
    constructor(color) {
        this._color = color;
    }
    ToString() {
        return "Color: " + this._Color + "\nPerimetro: " + this._perimetro + "\nSuperficie: " + this._superficie;
    }
}
exports.FiguraGeometrica = FiguraGeometrica;
class Rectangulo extends FiguraGeometrica {
    constructor(color, lado1, lado2) {
        super(color);
        this._ladoUno = lado1;
        this._ladoDos = lado2;
        this.CalcularDato();
    }
    CalcularDato() {
        super._superficie = this._ladoUno * this._ladoDos;
        super._perimetro = (this._ladoDos * 2) + (this._ladoUno * 2);
    }
    Dibujar() {
        let forma = "";
        for (let fila = 0; fila < this._ladoUno; fila++) {
            for (let columna = 0; columna < this._ladoDos; columna++) {
                forma += "*";
            }
            forma += "\n";
        }
        return forma;
    }
    ToString() {
        return "Altura: " + this._ladoUno + "\nAncho: " + this._ladoDos + "\n" + super.ToString();
    }
}
exports.Rectangulo = Rectangulo;
class Triangulo extends FiguraGeometrica {
    constructor(color, altura, base) {
        super(color);
        this._altura = altura;
        this._base = base;
        this.CalcularDato();
    }
    CalcularDato() {
        super._superficie = (this._altura * this._base) / 2;
        super._perimetro = this._base * 3;
    }
    Dibujar() {
        let resultado = "";
        let ancho = this._base * 2 - 1;
        let centro = Math.floor(ancho / 2);
        for (let i = 0; i < this._altura; i++) {
            let fila = "";
            for (let j = 0; j < ancho; j++) {
                if (j < centro - i || j > centro + i) {
                    fila += " ";
                }
                else {
                    fila += "*";
                }
            }
            resultado += fila + "\n";
        }
        return resultado;
    }
    ToString() {
        return "Altura: " + this._altura + "\nBase: " + this._base + "\n" + super.ToString();
    }
}
exports.Triangulo = Triangulo;
let rectangulo = new Rectangulo("rojo", 2, 5);
let triangulo = new Triangulo("verde", 2, 5);
console.log(rectangulo.Dibujar());
console.log(rectangulo.ToString());
console.log("\n" + triangulo.Dibujar());
console.log(triangulo.ToString());
//# sourceMappingURL=figuraGeometrica.js.map