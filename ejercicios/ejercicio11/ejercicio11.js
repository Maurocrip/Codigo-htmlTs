"use strict";
/*Definir una función que determine si la cadena de texto que se le pasa como parámetro
es un palíndromo, es decir, si se lee de la misma forma desde la izquierda y desde la
derecha. Ejemplo de palíndromo complejo: "La ruta nos aporto otro paso natural".*/
function palíndromo(palabra) {
    let retorno = "";
    let palabraJunta = palabra.replace(/ /g, '').toLowerCase();
    if (palabraJunta === palabraJunta.split('').reverse().join('')) {
        retorno = "es palíndromo";
    }
    else {
        retorno = "no es palíndromo";
    }
    return retorno;
}
console.log(palíndromo("La ruta nos aporto otro paso natural"));
//# sourceMappingURL=ejercicio11.js.map