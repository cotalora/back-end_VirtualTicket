var connection = require('../conexion')
//creamos un objeto para ir almacenandotodo lo que necesitemos
var PunVenModel = {};

//---------------------------------------------------------------
//obtenemos todos puntos de venta con INNER JOIN
PunVenModel.getPunVensInner = function (callback) {
    if (connection) {
        var sql = "SELECT puntos_de_ventas.id_punto_de_venta "
            + ", puntos_de_ventas.direccion_punto_de_venta "
            + ", puntos_de_ventas.nombre_punto_de_venta "
            + ", municipios.nombre_municipio "
            + " FROM puntos_de_ventas "
            + " INNER JOIN municipios ON puntos_de_ventas.id_municipio = municipios.id_municipio "
            + " ORDER BY nombre_punto_de_venta;";

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
//obtenemos todos los puntos de venta
PunVenModel.getPunVens = function (callback) {
    if (connection) {
        var sql = "SELECT id_punto_de_venta "
            + ", direccion_punto_de_venta "
            + ", nombre_punto_de_venta "
            + ", id_municipio "
            + " FROM puntos_de_ventas  "
            + " ORDER BY nombre_punto_de_venta;";

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
//obtenemos un punto de venta por su id
PunVenModel.getPunVenInner = function (id, callback) {
    if (connection) {
        var sql = "SELECT puntos_de_ventas.id_punto_de_venta "
            + ", puntos_de_ventas.direccion_punto_de_venta "
            + ", puntos_de_ventas.nombre_punto_de_venta "
            + ", municipios.nombre_municipio "
            + " FROM puntos_de_ventas "
            + " INNER JOIN municipios ON puntos_de_ventas.id_municipio = municipios.id_municipio "
            + " WHERE id_punto_de_venta  = "
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
//obtenemos un punto de venta por su id
PunVenModel.getPunVen = function (id, callback) {
    if (connection) {
        var sql = "SELECT id_punto_de_venta "
            + ", direccion_punto_de_venta "
            + ", nombre_punto_de_venta "
            + ", id_municipio "
            + " FROM puntos_de_ventas  "
            + " WHERE id_punto_de_venta  = "
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
//añadir un nuevo punto de venta
PunVenModel.insertPunVen = function (PunVenData, callback) {
    if (connection) {
        var sql = "INSERT INTO puntos_de_ventas SET ?";

        connection.query(sql, PunVenData, function (error, result) {
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
//actualizar un punto de venta
PunVenModel.updatePunVen = function (PunVenData, callback) {

    if (connection) {
        var sql = "UPDATE puntos_de_ventas SET "
            + " direccion_punto_de_venta = " + connection.escape(PunVenData.direccion_punto_de_venta)
            + ", nombre_punto_de_venta = " + connection.escape(PunVenData.nombre_punto_de_venta)
            + ", id_municipio = " + connection.escape(PunVenData.id_municipio)
            + " WHERE id_punto_de_venta = " + connection.escape(PunVenData.id_punto_de_venta) + ";";

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
module.exports = PunVenModel;
