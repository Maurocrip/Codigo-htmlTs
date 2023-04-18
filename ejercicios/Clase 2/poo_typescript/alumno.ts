///<reference path="./persona.ts"/>
namespace prueba
{    
    export class alumno extends persona
    {
        protected legajo : number;    

        public get Legajo() : number
        {
            return this.legajo;          
        }

        public set Legajo(value : number) 
        {
            this.legajo = value;            
        }

        public constructor(apellidoNuevo:string, nombreNuevo:string, legajoNuevo : number)
        {           
            super(apellidoNuevo,nombreNuevo);
            this.legajo = legajoNuevo;
        }

        public ToString():string
        {
            return super.ToString() + " - " + this.legajo;
        }
    }

}