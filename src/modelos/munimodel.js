var connection = require('../conexion')
//creamos un objeto para ir almacenandotodo lo que necesitemos
var MuniModel = {};

//---------------------------------------------------------------
//obtenemos todos los municipios con INNER JOIN
MuniModel.getMunisInner = function (callback) {
    if (connection) {
        var sql = "SELECT municipios.id_municipio "
            + ", municipios.nombre_municipio "
            + ", departamentos.nombre_departamento "
            + " FROM municipios  "
            + " INNER JOIN departamentos ON municipios.id_departamento = departamentos.id_departamento "
            + " ORDER BY nombre_municipio;";

        connection.query(sql, function (error, rows) {
            if (error) {
                throw error;
            }
            else {
                callback(null, rows);
            }
        });
    }
}
//---------------------------------------------------------------
//obtenemos todos los tipos de documento
MuniModel.getMunis = function (callback) {
    if (connection) {
        var sql = "SELECT id_municipio "
            + ", nombre_municipio "
            + ", id_departamento "
            + " FROM municipios  "
            + " ORDER BY nombre_municipio;";

        connection.query(sql, function (error, rows) {
            if (error) {
                throw error;
            }
            else {
                callback(null, rows);
            }
        });
    }
}

//---------------------------------------------------------------
//obtenemos un municipio con INNER JOIN por su id
MuniModel.getMuniInner = function (id, callback) {
    if (connection) {
        var sql = "SELECT municipios.id_municipio "
            + ", municipios.nombre_municipio "
            + ", departamentos.nombre_departamento "
            + " FROM municipios  "
            + " INNER JOIN departamentos ON municipios.id_departamento = departamentos.id_departamento "
            + " WHERE id_municipio  = "
            + connection.escape(id) + ";";

        //console.log(id);

        connection.query(sql, function (error, row) {
            //se muestra el mensaje correspondiente
            if (error) {
                throw error;
            }
            else {
                callback(null, row);
            }
        });
    }
}

//---------------------------------------------------------------
//obtenemos un tipo doc por su id
MuniModel.getMuni = function (id, callback) {
    if (connection) {
        var sql = "SELECT id_municipio "
            + ", nombre_municipio "
            + ", id_departamento "
            + " FROM municipios  "
            + " WHERE id_municipio  = "
            + connection.escape(id) + ";";

        //console.log(id);

        connection.query(sql, function (error, row) {
            //se muestra el mensaje correspondiente
            if (error) {
                throw error;
            }
            else {
                callback(null, row);
            }
        });
    }
}

//---------------------------------------------------------------
//añadir un nuevo municipio
MuniModel.insertMuni = function (MuniData, callback) {
    if (connection) {
        var sql = "INSERT INTO municipios SET ?";

        connection.query(sql, MuniData, function (error, result) {
            //se muestra el mensaje correspondiente
            if (error) {
                throw error;
            }
            else {
                callback(null, { "msg": "Registro Insertado" });
            }
        });
    }
}

//---------------------------------------------------------------
//actualizar un municipio
MuniModel.updateMuni = function (MuniData, callback) {

    if (connection) {
        var sql = "UPDATE municipios SET "
            + " nombre_municipio = " + connection.escape(MuniData.nombre_municipio)
            + ", id_departamento = " + connection.escape(MuniData.id_departamento)
            + " WHERE  id_municipio = " + connection.escape(MuniData.id_municipio) + ";";

        connection.query(sql, function (error, result) {
            //se muestra el mensaje correspondiente
            if (error) {
                throw error;
            }
            else {
                callback(null, { "msg": "Registro Actualizado" });
            }
        });
    }
}

//---------------------------------------------------------------
//exportamos el objeto para tenerlo disponible en la zona de rutas
module.exports = MuniModel;