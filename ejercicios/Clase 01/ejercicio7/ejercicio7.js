"use strict";
/*Se necesita mostrar por consola los primeros 20 números primos. Para ello realizar una
función.
Nota: Utilizar console.log()*/
function numeroPrimos() {
    let numero = 0;
    let flag = true;
    for (let i = 2; numero < 20; i++) {
        for (let j = 2; j < i; j++) {
            if (i % j == 0) {
                flag = false;
                break;
            }
        }
        if (flag) {
            console.log(i);
            numero++;
        }
        flag = true;
    }
}
numeroPrimos();
//# sourceMappingURL=ejercicio7.js.map