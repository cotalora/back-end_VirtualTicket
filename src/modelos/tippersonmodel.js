var connection = require('../conexion')
//creamos un objeto para ir almacenandotodo lo que necesitemos
var TipPersonModel = {};

//---------------------------------------------------------------
//obtenemos todos los tipos de persona
TipPersonModel.getTipPersons = function (callback)
{
    if (connection)
    {
        var sql = "SELECT id_tipo_persona "
                        +", nombre_tipo_persona "
                        +" FROM tipo_personas  "
                        +" ORDER BY nombre_tipo_persona;";
        
        connection.query(sql, function (error, rows) 
        {
            if (error)
            {
                throw error;
            }
            else
            {
                callback(null, rows);
            }
        });
    }
}

//---------------------------------------------------------------
//obtenemos un tipo de persona por su id
TipPersonModel.getTipPerson = function (id, callback)
{
    if (connection)
    {
        var sql = "SELECT id_tipo_persona "
                        +", nombre_tipo_persona "
                        +" FROM tipo_personas  "
                        +" WHERE id_tipo_persona = " 
                        + connection.escape(id) + ";";

        //console.log(id);

        connection.query(sql, function (error, row)
        {
            //se muestra el mensaje correspondiente
            if (error)
            {
                throw error;
            }
            else
            {
                callback(null, row);
            }
        });
    }
}

//---------------------------------------------------------------
//añadir un nuevo tipo de persona
TipPersonModel.insertTipPerson = function (TipPersonData, callback)
{
    if (connection)
    {
        var sql = "INSERT INTO tipo_personas SET ?";

        connection.query(sql, TipPersonData, function (error, result)
        {
            //se muestra el mensaje correspondiente
            if (error)
            {
                throw error;
            }
            else
            {
                callback(null,{"msg": "Registro Insertado"});
            }
        });
    }
}

//---------------------------------------------------------------
//actualizar un tipo de persona
TipPersonModel.updateTipPerson = function (TipPersonData, callback)
 {

    if (connection)
    {
        var sql = "UPDATE tipo_personas SET nombre_tipo_persona = " + connection.escape(TipPersonData.nombre_tipo_persona)
                    + " WHERE  id_tipo_persona  =  " + connection.escape(TipPersonData.id_tipo_persona)+";";

        connection.query(sql, function (error, result)
        {
            //se muestra el mensaje correspondiente
            if (error)
            {
                throw error;
            }
            else
            {
                callback(null, {"msg": "Registro Actualizado"});
            }
        });
    }
}

//---------------------------------------------------------------
//exportamos el objeto para tenerlo disponible en la zona de rutas
module.exports = TipPersonModel;
