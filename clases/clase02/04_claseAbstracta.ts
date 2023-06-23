export abstract class Vehiculo{

    protected marca:string;

    public constructor(marca:string){
        this.marca = marca;
    }

    public abstract Acelerar():void;

    public abstract get Marca() : string;
    public abstract set Marca(value: string);
    
    public Mostrar():string{
        return this.marca;
    }
}

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

    //DE LA CLASE ABSTRACTA
    public Acelerar():void{
        console.log("Acelerando...");
    }

    //DE LA CLASE ABSTRACTA
    public get Marca():string{
        return this.marca;
    }

    //DE LA CLASE ABSTRACTA
    public set Marca(value:string){
        this.marca = value;
    }

    //POLIMORFISMO
    public Mostrar():string{
        return super.Mostrar() + this.precio + this.color;
    }

}