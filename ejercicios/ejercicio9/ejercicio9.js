"use strict";
/*Realizar una función que solicite (por medio de un parámetro) un número. Si el número
es positivo, se mostrará el factorial de ese número, caso contrario se mostrará el cubo de
dicho número.
Nota: Reutilizar la función que determina el factorial de un número y la que calcula el
cubo de un número.*/
(() => {
    function cubo(numero) {
        return Math.pow(numero, 3);
    }
    function numerosPositivoONegativo(numero) {
        if (numero >= 0) {
            (factorial(numero));
        }
        else {
            console.log((cubo(numero)));
        }
    }
    function factorial(numero) {
        let comodin = 0;
        console.log('el numero es ' + numero);
        for (let i = 1; i < numero + 1; i++) {
            comodin += i;
            console.log(comodin);
        }
    }
    numerosPositivoONegativo(-8);
})();
//# sourceMappingURL=ejercicio9.js.map