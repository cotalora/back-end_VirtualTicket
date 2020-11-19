var connection = require('../conexion')
//creamos un objeto para ir almacenando todo lo que necesitemos
var BolModel = {};

//---------------------------------------------------------------
//obtenemos todos las boletas con INNER JOIN
BolModel.getBolsInner = function (callback) {
    if (connection) {
        var sql = "SELECT boletas.id_boleta, "
            + "boletas.precio_boleta, "
            + "boletas.numero_asiento_bolesta, "
            + "eventos.nombre_evento, "
            + "CONCAT ("
            + "personas.primer_apellido_persona,' ', "
            + "personas.segundo_apellido_persona,' ', "
            + "personas.primer_nombre_persona,' ', "
            + "personas.segundo_nombre_persona) "
            + "AS nombre_completo, "
            + "personas.numero_documento_persona, "
            + "puntos_de_ventas.nombre_punto_de_venta "
            + "FROM boletas "
            + "INNER JOIN eventos ON boletas.id_evento = eventos.id_evento "
            + "INNER JOIN personas ON boletas.id_persona = personas.id_persona "
            + "INNER JOIN puntos_de_ventas ON boletas.id_punto_de_venta = puntos_de_ventas.id_punto_de_venta "
            + " ORDER BY id_boleta;";
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
//obtenemos todas las boletas
BolModel.getBols = function (callback) {
    if (connection) {
        var sql = "SELECT id_boleta "
            + ", precio_boleta "
            + ", numero_asiento_bolesta "
            + ", id_evento "
            + ", id_persona "
            + ", id_punto_de_venta "
            + " FROM boletas  "
            + " ORDER BY id_boleta;";
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
//obtenemos una boleta con INNER JOIN por su id

BolModel.getBolInner = function (id, callback) {
    if (connection) {
        var sql = "SELECT boletas.id_boleta, "
            + "boletas.precio_boleta, "
            + "boletas.numero_asiento_bolesta, "
            + "eventos.nombre_evento, "
            + "CONCAT ("
            + "personas.primer_apellido_persona,' ', "
            + "personas.segundo_apellido_persona,' ', "
            + "personas.primer_nombre_persona,' ', "
            + "personas.segundo_nombre_persona) "
            + "AS nombre_completo, "
            + "personas.numero_documento_persona, "
            + "puntos_de_ventas.nombre_punto_de_venta "
            + "FROM boletas "
            + "INNER JOIN eventos ON boletas.id_evento = eventos.id_evento "
            + "INNER JOIN personas ON boletas.id_persona = personas.id_persona "
            + "INNER JOIN puntos_de_ventas ON boletas.id_punto_de_venta = puntos_de_ventas.id_punto_de_venta "
            + "WHERE boletas.id_boleta = "
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
//obtenemos todos las boletas con INNER JOIN (Informe 1)
BolModel.getBolInnerInforme1 = function (id, f1, f2, callback) {
    if (connection) {
        var sql = "SELECT boletas.id_boleta, "
            + "boletas.precio_boleta, "
            + "boletas.numero_asiento_bolesta, "
            + "boletas.fecha_compra, "
            + "eventos.nombre_evento, "
            + "CONCAT ("
            + "personas.primer_apellido_persona,' ', "
            + "personas.segundo_apellido_persona,' ', "
            + "personas.primer_nombre_persona,' ', "
            + "personas.segundo_nombre_persona) "
            + "AS nombre_completo, "
            + "personas.numero_documento_persona, "
            + "puntos_de_ventas.nombre_punto_de_venta "
            + "FROM boletas "
            + "INNER JOIN eventos ON boletas.id_evento = eventos.id_evento "
            + "INNER JOIN personas ON boletas.id_persona = personas.id_persona "
            + "INNER JOIN puntos_de_ventas ON boletas.id_punto_de_venta = puntos_de_ventas.id_punto_de_venta "
            + "WHERE eventos.id_evento = " + connection.escape(id) + " AND " + "boletas.fecha_compra BETWEEN " + connection.escape(f2) + " AND " + connection.escape(f1) + ";";

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
        connection.query('SELECT count(*) AS count FROM boletas WHERE id_evento = ' + connection.escape(id) + ";", function (error, rows) {
            if (error) {
                throw error;
            }
            else {
                const count = rows[0].count;
                console.log(count);
            }
        });
    }
}
//---------------------------------------------------------------
//obtenemos todos las boletas con INNER JOIN (Informe 2)
BolModel.getBolInnerInforme2 = function (id, f1, f2, callback) {
    if (connection) {
        var sql = "SELECT boletas.id_boleta, "
            + "boletas.precio_boleta, "
            + "boletas.numero_asiento_bolesta, "
            + "boletas.fecha_compra, "
            + "eventos.nombre_evento, "
            + "CONCAT ("
            + "personas.primer_apellido_persona,' ', "
            + "personas.segundo_apellido_persona,' ', "
            + "personas.primer_nombre_persona,' ', "
            + "personas.segundo_nombre_persona) "
            + "AS nombre_completo, "
            + "personas.numero_documento_persona, "
            + "puntos_de_ventas.nombre_punto_de_venta "
            + "FROM boletas "
            + "INNER JOIN eventos ON boletas.id_evento = eventos.id_evento "
            + "INNER JOIN personas ON boletas.id_persona = personas.id_persona "
            + "INNER JOIN puntos_de_ventas ON boletas.id_punto_de_venta = puntos_de_ventas.id_punto_de_venta "
            + "WHERE puntos_de_ventas.id_punto_de_venta = " + connection.escape(id) + " AND " + "boletas.fecha_compra BETWEEN " + connection.escape(f2) + " AND " + connection.escape(f1) + ";";

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
        connection.query('SELECT count(*) AS count FROM boletas WHERE id_punto_de_venta = ' + connection.escape(id) + ";", function (error, rows) {
            if (error) {
                throw error;
            }
            else {
                const count = rows[0].count;
                console.log(count);
            }
        });
    }
}

//---------------------------------------------------------------
//obtenemos una boleta por su id
BolModel.getBol = function (id, callback) {
    if (connection) {
        var sql = "SELECT id_boleta "
            + ", precio_boleta "
            + ", numero_asiento_bolesta "
            + ", id_evento "
            + ", id_persona "
            + ", id_punto_de_venta "
            + " FROM boletas  "
            + " WHERE id_boleta  = "
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
//añadir una nueva boleta
BolModel.insertBol = function (BolData, callback) {
    if (connection) {
        var sql = "INSERT INTO boletas SET ?";

        connection.query(sql, BolData, function (error, result) {
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
//actualizar una boleta
BolModel.updateBol = function (BolData, callback) {

    if (connection) {
        var sql = "UPDATE boletas SET "
            + " precio_boleta = " + connection.escape(BolData.precio_boleta)
            + ", numero_asiento_bolesta = " + connection.escape(BolData.numero_asiento_bolesta)
            + ", id_evento = " + connection.escape(BolData.id_evento)
            + ", id_persona = " + connection.escape(BolData.id_persona)
            + ", id_punto_de_venta = " + connection.escape(BolData.id_punto_de_venta)
            + " WHERE  id_boleta  =  " + connection.escape(BolData.id_boleta) + ";";

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
module.exports = BolModel;
