"use strict";
///<reference path="./alumno.ts"/>
var TestPrueba;
(function (TestPrueba) {
    let alumnos = [new prueba.alumno("racioppi", "mauro", 145872), new prueba.alumno("racioppi", "nahuel", 658743), new prueba.alumno("marcos", "Kiara", 478512), new prueba.alumno("marcos", "bruno", 784530)];
    alumnos.forEach(element => { console.log(element.ToString()); });
})(TestPrueba || (TestPrueba = {}));
//# sourceMappingURL=main.js.map