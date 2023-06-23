namespace Test{

    export abstract class Vehiculo{
        protected marca:string;

        public constructor(marca:string){
            this.marca = marca;
        }

        public abstract Acelerar():void;

        public Mostrar():string{
            return this.marca;
        }
    }

}