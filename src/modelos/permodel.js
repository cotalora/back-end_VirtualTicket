var connection = require('../conexion')
//creamos un objeto para ir almacenandotodo lo que necesitemos
var PerModel = {};

//---------------------------------------------------------------
//obtenemos todas las personas con INNER JOIN
PerModel.getPersInner = function (callback) {
    if (connection) {
        var sql = "SELECT personas.id_persona, "
            + "personas.primer_nombre_persona, "
            + "personas.segundo_nombre_persona, "
            + "personas.primer_apellido_persona, "
            + "personas.segundo_apellido_persona, "
            + "personas.direccion_correro_persona, "
            + "personas.contrasena_persona, "
            + "personas.direccion_residencia_persona, "
            + "personas.numero_documento_persona, "
            + "personas.fecha_nacimiento_persona, "
            + "personas.numero_celular_persona, "
            + "personas.numero_telefono_persona, "
            + "tipo_documentos.nombre_tipo_documento, "
            + "tipo_personas.nombre_tipo_persona, "
            + "municipios.nombre_municipio "
            + "FROM personas "
            + "INNER JOIN tipo_documentos ON personas.id_tipo_documento = tipo_documentos.id_tipo_documento "
            + "INNER JOIN tipo_personas ON personas.id_tipo_persona = tipo_personas.id_tipo_persona "
            + "INNER JOIN municipios ON personas.id_municipio = municipios.id_municipio;";

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
//obtenemos todas las personas
PerModel.getPers = function (callback) {
    if (connection) {
        var sql = "SELECT id_persona, "
            + " primer_nombre_persona, "
            + "segundo_nombre_persona, "
            + "primer_apellido_persona, "
            + "segundo_apellido_persona, "
            + "direccion_correro_persona, "
            + "contrasena_persona, "
            + "direccion_residencia_persona, "
            + "numero_documento_persona, "
            + "fecha_nacimiento_persona, "
            + "numero_celular_persona, "
            + "numero_telefono_persona, "
            + "id_tipo_documento, "
            + "id_tipo_persona, "
            + "id_municipio "
            + " FROM personas  "
            + " ORDER BY primer_apellido_persona;";

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
//obtenemos una persona por su id con INNER JOIN
PerModel.getPerInner = function (id, callback) {
    if (connection) {
        var sql = "SELECT personas.id_persona, "
            + "personas.primer_nombre_persona, "
            + "personas.segundo_nombre_persona, "
            + "personas.primer_apellido_persona, "
            + "personas.segundo_apellido_persona, "
            + "personas.direccion_correro_persona, "
            + "personas.contrasena_persona, "
            + "personas.direccion_residencia_persona, "
            + "personas.numero_documento_persona, "
            + "personas.fecha_nacimiento_persona, "
            + "personas.numero_celular_persona, "
            + "personas.numero_telefono_persona, "
            + "tipo_documentos.nombre_tipo_documento, "
            + "tipo_personas.nombre_tipo_persona, "
            + "municipios.nombre_municipio "
            + "FROM personas "
            + "INNER JOIN tipo_documentos ON personas.id_tipo_documento = tipo_documentos.id_tipo_documento "
            + "INNER JOIN tipo_personas ON personas.id_tipo_persona = tipo_personas.id_tipo_persona "
            + "INNER JOIN municipios ON personas.id_municipio = municipios.id_municipio "
            + " WHERE id_persona  = "
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
//obtenemos una persona por su id
PerModel.getPer = function (id, callback) {
    if (connection) {
        var sql = "SELECT id_persona, "
            + " primer_nombre_persona, "
            + "segundo_nombre_persona, "
            + "primer_apellido_persona, "
            + "segundo_apellido_persona, "
            + "direccion_correro_persona, "
            + "contrasena_persona, "
            + "direccion_residencia_persona, "
            + "numero_documento_persona, "
            + "fecha_nacimiento_persona, "
            + "numero_celular_persona, "
            + "numero_telefono_persona, "
            + "id_tipo_documento, "
            + "id_tipo_persona, "
            + "id_municipio "
            + " FROM personas  "
            + " WHERE id_persona  = "
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

//---------------------------------------------------------------
//añadir una nueva persona
PerModel.insertPer = function (PerData, callback) {
    if (connection) {
        var sql = "INSERT INTO personas SET ?";

        connection.query(sql, PerData, function (error, result) {
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
//actualizar una persona
PerModel.updatePer = function (PerData, callback) {

    if (connection) {
        var sql = "UPDATE personas SET "
            + " primer_nombre_persona = " + connection.escape(PerData.primer_nombre_persona)
            + ", segundo_nombre_persona = " + connection.escape(PerData.segundo_nombre_persona)
            + ", primer_apellido_persona = " + connection.escape(PerData.primer_apellido_persona)
            + ", segundo_apellido_persona = " + connection.escape(PerData.segundo_apellido_persona)
            + ", direccion_correro_persona = " + connection.escape(PerData.direccion_correro_persona)
            + ", contrasena_persona = " + connection.escape(PerData.contrasena_persona)
            + ", direccion_residencia_persona = " + connection.escape(PerData.direccion_residencia_persona)
            + ", numero_documento_persona = " + connection.escape(PerData.numero_documento_persona)
            + ", fecha_nacimiento_persona = " + connection.escape(PerData.fecha_nacimiento_persona)
            + ", numero_celular_persona = " + connection.escape(PerData.numero_celular_persona)
            + ", numero_telefono_persona = " + connection.escape(PerData.numero_telefono_persona)
            + ", id_tipo_documento = " + connection.escape(PerData.id_tipo_documento)
            + ", id_tipo_persona = " + connection.escape(PerData.id_tipo_persona)
            + ", id_municipio = " + connection.escape(PerData.id_municipio)
            + " WHERE  id_persona  =  " + connection.escape(PerData.id_persona) + ";";

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
module.exports = PerModel;
