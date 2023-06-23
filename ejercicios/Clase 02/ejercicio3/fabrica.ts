import { Empleado } from "./empleado";

export class Fabrica
{
    private _razonSocial : string;
    private  _empleados: Array<Empleado>;

    public constructor(raznSocial : string)
    {           
        this._razonSocial =raznSocial;
        this._empleados =  new Array();
    }

    public AgregarEmpleados(empleado : Empleado) : Boolean
    {
        let retorno : boolean = false
        if(empleado !=null)
        {
            if(this._empleados.indexOf(empleado)==-1)
            {
                this._empleados.push(empleado);
                retorno = true; 
            }
        }
        return retorno;
    }

    public CalcularSueldos() : number
    {
        let retorno : number = -1
        if(this._empleados.length >0)
        {
            retorno = 0;
            this._empleados.forEach(element => {retorno += element._Sueldo});
        }
        return retorno;
    }

    public EliminarEmpleados(empleado : Empleado) : Boolean
    {
        let retorno : boolean = false
        if(empleado !=null)
        {
            let index = this._empleados.indexOf(empleado);
            if (index !== -1) 
            {
                this._empleados.splice(index, 1);
                retorno = true;
            }
        }
        return retorno;
    }

    public ToString():string
    {
        let retorno : string = "";
        if(this._empleados.length >0)
        {
            retorno = "Razon social: " + this._razonSocial + "\n";
            for (let index = 0; index < this._empleados.length; index++)
            {   
                retorno +="Empleado "+(index+1)+": " +  this._empleados[index].ToString() + "\n";   
            } 
        }
        return  retorno;
    }
}
