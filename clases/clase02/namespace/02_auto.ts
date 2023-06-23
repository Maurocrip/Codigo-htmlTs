/// <reference path="./01_vehiculo.ts" />

namespace Test{

    export class Auto extends Vehiculo{

        public color : string;
        private precio : number;

        public GetPrecio():number{
            return this.precio;
        }

        public constructor(color:string, precio:number, marca:string){
            super(marca);
            this.precio = precio;
            this.color = color;
        }

        public Mostrar():string{
            return super.Mostrar() + this.precio + this.color;
        }

        public Acelerar():void{
            console.log("Acelerando...");
        }
    }

}