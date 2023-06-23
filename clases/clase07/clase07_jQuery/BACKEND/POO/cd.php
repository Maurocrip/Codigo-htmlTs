<?php
class cd
{
    public $id;
    public $titulo;
    public $interprete;
    public $anio;

    public function MostrarDatos()
    {
            return $this->id." - ".$this->titulo." - ".$this->interprete." - ".$this->anio;
    }
    
    public static function TraerTodosLosCd()
    {    
        $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
        
        $consulta = $objetoAccesoDato->RetornarConsulta("SELECT id, titel AS titulo, interpret AS interprete, "
                                                        . "jahr AS anio FROM cds");        
        
        $consulta->execute();
        
        $consulta->setFetchMode(PDO::FETCH_INTO, new cd);                                                

        return $consulta; 
    }
    
    public function InsertarElCD()
    {
        $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
        
        $consulta =$objetoAccesoDato->RetornarConsulta("INSERT INTO cds (id, titel, interpret, jahr)"
                                                    . "VALUES(:id, :titulo, :cantante, :anio)");
        
        $consulta->bindValue(':id', $this->id, PDO::PARAM_INT);
        $consulta->bindValue(':titulo', $this->titulo, PDO::PARAM_STR);
        $consulta->bindValue(':anio', $this->anio, PDO::PARAM_INT);
        $consulta->bindValue(':cantante', $this->interprete, PDO::PARAM_STR);

        $consulta->execute();   

    }
    
    public static function ModificarCD($id, $titulo, $anio, $cantante)
    {

        $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
        
        $consulta =$objetoAccesoDato->RetornarConsulta("UPDATE cds SET titel = :titulo, interpret = :cantante, 
                                                        jahr = :anio WHERE id = :id");
        
        $consulta->bindValue(':id', $id, PDO::PARAM_INT);
        $consulta->bindValue(':titulo', $titulo, PDO::PARAM_STR);
        $consulta->bindValue(':anio', $anio, PDO::PARAM_INT);
        $consulta->bindValue(':cantante', $cantante, PDO::PARAM_STR);

        return $consulta->execute();

    }

    public static function EliminarCD($cd)
    {

        $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
        
        $consulta =$objetoAccesoDato->RetornarConsulta("DELETE FROM cds WHERE id = :id");
        
        $consulta->bindValue(':id', $cd->id, PDO::PARAM_INT);

        return $consulta->execute();

    }
    
}