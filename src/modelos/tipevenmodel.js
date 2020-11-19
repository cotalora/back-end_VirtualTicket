var connection = require('../conexion')
//creamos un objeto para ir almacenandotodo lo que necesitemos
var TipEvenModel = {};

//---------------------------------------------------------------
//obtenemos todos los tipos de evento
TipEvenModel.getTipEvens = function (callback)
{
    if (connection)
    {
        var sql = "SELECT id_tipo_evento "
                        +", nombre_tipo_evento "
                        +" FROM tipo_eventos  "
                        +" ORDER BY nombre_tipo_evento;";
        
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
//obtenemos un tipo de evento por su id
TipEvenModel.getTipEven = function (id, callback)
{
    if (connection)
    {
        var sql = "SELECT id_tipo_evento "
                        +", nombre_tipo_evento "
                        +" FROM tipo_eventos  "
                        +" WHERE id_tipo_evento  = " 
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
//añadir un nuevo tipo de evento
TipEvenModel.insertTipEven = function (TipEvenData, callback)
{
    if (connection)
    {
        var sql = "INSERT INTO tipo_eventos SET ?";

        connection.query(sql, TipEvenData, function (error, result)
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
//actualizar un tipo de evento
TipEvenModel.updateTipEven = function (TipEvenData, callback)
 {

    if (connection)
    {
        var sql = "UPDATE tipo_eventos SET nombre_tipo_evento = " + connection.escape(TipEvenData.nombre_tipo_evento)
                    + " WHERE  id_tipo_evento  =  " + connection.escape(TipEvenData.id_tipo_evento)+";";

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
module.exports = TipEvenModel;
