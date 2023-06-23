namespace prueba
{
    export class persona
    {
        protected apellido : string;
        protected nombre : string;

        public get Apellido() : string
        {
            return this.apellido;          
        }

        public get Nombre() : string
        {
            return this.nombre;            
        }

        public set Nombre(value : string) 
        {
            this.nombre = value;            
        }

        public set Apellido(value : string) 
        {
            this.apellido = value;            
        }

        public constructor(apellidoNuevo:string, nombreNuevo:string)
        {
            this.apellido = apellidoNuevo;
            this.nombre = nombreNuevo;
        }


       public ToString():string
       {
        return this.apellido + " - " + this.nombre;
       }
    }

}
