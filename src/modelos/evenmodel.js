var connection = require('../conexion')
//creamos un objeto para ir almacenandotodo lo que necesitemos
var EvenModel = {};

//---------------------------------------------------------------
//obtenemos todos los eventos con INNER JOIN
EvenModel.getEvensInner = function (callback) {
    if (connection) {
        var sql = "SELECT eventos.id_evento "
            + ", eventos.nombre_evento "
            + ", eventos.descripcion_evento "
            + ", eventos.direccion_evento "
            + ", eventos.aforo_evento "
            + ", eventos.fecha_hora_inicio_evento "
            + ", eventos.fecha_hora_fin_evento "
            + ", eventos.imagenes "
            + ", municipios.nombre_municipio "
            + ", tipo_eventos.nombre_tipo_evento "
            + " FROM eventos  "
            + " INNER JOIN municipios ON eventos.id_municipio = municipios.id_municipio "
            + " INNER JOIN tipo_eventos ON eventos.id_tipo_evento = tipo_eventos.id_tipo_evento"
            + " ORDER BY nombre_evento;";

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
//obtenemos todos los eventos
EvenModel.getEvens = function (callback) {
    if (connection) {
        var sql = "SELECT id_evento "
            + ", nombre_evento "
            + ", descripcion_evento "
            + ", direccion_evento "
            + ", aforo_evento "
            + ", fecha_hora_inicio_evento "
            + ", fecha_hora_fin_evento "
            + ", imagenes "
            + ", id_municipio "
            + ", id_tipo_evento "
            + " FROM eventos  "
            + " ORDER BY nombre_evento;";

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
//obtenemos un evento con INNER JOIN por su id
EvenModel.getEvenInner = function (id, callback) {
    if (connection) {
        var sql = "SELECT eventos.id_evento "
            + ", eventos.nombre_evento "
            + ", eventos.descripcion_evento "
            + ", eventos.direccion_evento "
            + ", eventos.aforo_evento "
            + ", eventos.fecha_hora_inicio_evento "
            + ", eventos.fecha_hora_fin_evento "
            + ", eventos.imagenes "
            + ", municipios.nombre_municipio "
            + ", tipo_eventos.nombre_tipo_evento "
            + " FROM eventos  "
            + " INNER JOIN municipios ON eventos.id_municipio = municipios.id_municipio "
            + " INNER JOIN tipo_eventos ON eventos.id_tipo_evento = tipo_eventos.id_tipo_evento "
            + " WHERE id_evento  = "
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
EvenModel.getEven = function (id, callback) {
    if (connection) {
        var sql = "SELECT id_evento "
            + ", nombre_evento "
            + ", descripcion_evento "
            + ", direccion_evento "
            + ", aforo_evento "
            + ", fecha_hora_inicio_evento "
            + ", fecha_hora_fin_evento "
            + ", imagenes "
            + ", id_municipio "
            + ", id_tipo_evento "
            + " FROM eventos  "
            + " WHERE id_evento  = "
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
//añadir un nuevo evento
EvenModel.insertEven = function (EvenData, callback) {
    if (connection) {
        var sql = "INSERT INTO eventos SET ?";

        connection.query(sql, EvenData, function (error, result) {
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
//actualizar un evento
EvenModel.updateEven = function (EvenData, callback) {

    if (connection) {
        var sql = "UPDATE eventos SET "
            + " nombre_evento = " + connection.escape(EvenData.nombre_evento)
            + ", descripcion_evento = " + connection.escape(EvenData.descripcion_evento)
            + ", direccion_evento = " + connection.escape(EvenData.direccion_evento)
            + ", aforo_evento = " + connection.escape(EvenData.aforo_evento)
            + ", fecha_hora_inicio_evento = " + connection.escape(EvenData.fecha_hora_inicio_evento)
            + ", fecha_hora_fin_evento = " + connection.escape(EvenData.fecha_hora_fin_evento)
            + ", imagenes = " + connection.escape(EvenData.imagenes)
            + ", id_municipio = " + connection.escape(EvenData.id_municipio)
            + ", id_tipo_evento = " + connection.escape(EvenData.id_tipo_evento)
            + " WHERE  id_evento  =  " + connection.escape(EvenData.id_evento) + ";";

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
module.exports = EvenModel;
