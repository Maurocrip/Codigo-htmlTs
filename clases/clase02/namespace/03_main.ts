/// <reference path="./01_vehiculo.ts" />
/// <reference path="./02_auto.ts" />


let vehiculos : Array<Test.Vehiculo> = [new Test.Auto("ROJO",125000,"FERRARI"),
                                        new Test.Auto("AMARILLO",200000,"SEAT")];

vehiculos.forEach(Mostrar);


function Mostrar(v : Test.Vehiculo):void{

    console.log(v.Mostrar());
}

//Para poder debugguear, hay que generar un outFile de la jerarquia de clases en js