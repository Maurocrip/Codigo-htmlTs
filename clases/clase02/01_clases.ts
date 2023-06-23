export class Auto{

    public color : string; 
    private precio : number; 

    //GETTERS
    public GetColor():string{
        return this.color;
    }

    //SETTERS
    public SetColor(color:string):void{
        this.color = color;
    }

    //ACCESOR GET
    public get Precio() : number {
        return this.precio;
    }
       
    //ACCESOR SET
    public set Precio(value : number) {
        this.precio = value;
    }
    
    public constructor(color:string, precio:number){
        this.precio = precio;
        this.color = color;
    }

    public static MetodoEstatico():void{
        console.log("Método esático");
    }
}
//NOTAS:
//1) LOS ACCESORES REQUIEREN QUE SE ESTABLEZCA EL COMPILADOR PARA SALIDA A ECMAScript 5 O SUPERIOR. 
//2) LOS ACCESORES SOLO CON GET SE INFIEREN AUTOMATICAMENTE COMO READONLY. 
//3) LOS ACCESORES SET, NO PUEDEN LLEVAR TIPO DE RETORNO