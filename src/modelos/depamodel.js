var connection = require('../conexion')
//creamos un objeto para ir almacenandotodo lo que necesitemos
var DepaModel = {};

//---------------------------------------------------------------
//obtenemos todos los departamentos
DepaModel.getDepas = function (callback)
{
    if (connection)
    {
        var sql = "SELECT id_departamento "
                        +", nombre_departamento "
                        +" FROM departamentos  "
                        +" ORDER BY nombre_departamento;";
        
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
//obtenemos un departamento por su id
DepaModel.getDepa = function (id, callback)
{
    if (connection)
    {
        var sql = "SELECT id_departamento "
                        +", nombre_departamento "
                        +" FROM departamentos  "
                        +" WHERE id_departamento  = " 
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
//añadir un nuevo departamento
DepaModel.insertDepa = function (DepaData, callback)
{
    if (connection)
    {
        var sql = "INSERT INTO departamentos SET ?";

        connection.query(sql, DepaData, function (error, result)
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
//actualizar un departamento
DepaModel.updateDepa = function (DepaData, callback)
 {

    if (connection)
    {
        var sql = "UPDATE departamentos SET nombre_departamento = " + connection.escape(DepaData.nombre_departamento)
                    + " WHERE  id_departamento  =  " + connection.escape(DepaData.id_departamento)+";";

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
module.exports = DepaModel;
