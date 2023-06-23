export class Vehiculo{

    protected marca:string;

    public constructor(marca:string){
        this.marca = marca;
    }

    public Mostrar():string{
        return this.marca;
    }
}

export class Auto extends Vehiculo{

    public color : string;
    private precio : number;

    public get Precio():number{
        return this.precio;
    }

    public set Precio(value : number) {
        this.precio = value;
    }  

    public constructor(color:string, precio:number, marca:string){
        super(marca);
        this.precio = precio;
        this.color = color;
    }

    //POLIMORFISMO
    public Mostrar():string{
        return super.Mostrar() + this.precio + this.color;
    }
}