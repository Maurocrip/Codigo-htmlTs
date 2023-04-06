"use strict";
/*Crear una función que realice el cálculo factorial del número que recibe como parámetro.
Nota: Utilizar console.log()*/
function factorial(numero) {
    let comodin = 0;
    console.log('el numero es ' + numero);
    for (let i = 1; i < numero + 1; i++) {
        comodin += i;
        console.log(comodin);
    }
}
factorial(5);
//# sourceMappingURL=ejercicio8.js.map