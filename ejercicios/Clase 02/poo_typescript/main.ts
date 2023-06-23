///<reference path="./alumno.ts"/>

namespace TestPrueba
{
    let alumnos : Array<prueba.alumno> = [new prueba.alumno("racioppi", "mauro", 145872), new prueba.alumno("racioppi", "nahuel", 658743), new prueba.alumno("marcos", "Kiara", 478512), new prueba.alumno("marcos", "bruno", 784530)];

    alumnos.forEach(element => {console.log(element.ToString())});
}