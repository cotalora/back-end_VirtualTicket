//obtenemos el modelo permodel con toda la funcionalidad
var PerModel = require('../modelos/permodel');
var express = require('express');
var router = express.Router();

//creamos el ruteo de la clase
module.exports = function ()
{
    //---------------------------------------------------------------
    //Muestra el método CRUL Listar que muestra todas las personas con INNER JOIN
    router.get("/P/", function (req, res)
    {
        PerModel.getPersInner(function (error, data)
        {
            res.status(200).json(data);
        });
    });
    //---------------------------------------------------------------
    //Muestra el método CRUL Listar que muestra todas las personas
    router.get("/", function (req, res)
    {
        PerModel.getPers(function (error, data)
        {
            res.status(200).json(data);
        });
    });

    //---------------------------------------------------------------
    //Muestra el método CRUL read(leer), que muestra la persona solicitada con INNER JOIN
    router.get("/P/:id", function (req, res)
    {
        var id = req.params.id;

        //solo actualizamos si la id es un número
        if (!isNaN(id))
        {
            PerModel.getPerInner(id, function (error, data)
            {
                //si el tipo de documento existe lo mostramos en formato json
                if (typeof data !== 'undefined' && data.length > 0)
                {
                    res.status(200).json(data);
                }
                //en otro caso mostramos una respuesta conforme no existe
                else
                {
                    res.json(404, 
                    { 
                        "msg": "Registro no Existe" 
                    });
                }
            });
        }
        else //si hay algún error
        {
            res.status(500).json({ "msg": "error" });
        }
    });
    //---------------------------------------------------------------
    //Muestra el método CRUL read(leer), que muestra la persona solicitada
    router.get("/:id", function (req, res)
    {
        var id = req.params.id;

        //solo actualizamos si la id es un número
        if (!isNaN(id))
        {
            PerModel.getPer(id, function (error, data)
            {
                //si la persona existe lo mostramos en formato json
                if (typeof data !== 'undefined' && data.length > 0)
                {
                    res.status(200).json(data);
                }
                //en otro caso mostramos una respuesta conforme no existe
                else
                {
                    res.json(404, 
                    { 
                        "msg": "Registro no Existe" 
                    });
                }
            });
        }
        else //si hay algún error
        {
            res.status(500).json({ "msg": "error" });
        }
    });

    //---------------------------------------------------------------
    //Muestra y captura los datos del método CRUL crear, usando el verbo post
    router.post("/", function (req, res)
    {
        //creamos un objeto Json con los datos de la persona
        var PerData =
            {
                id_persona: null,
                primer_nombre_persona: req.body.primer_nombre_persona,
                segundo_nombre_persona: req.body.segundo_nombre_persona,
                primer_apellido_persona: req.body.primer_apellido_persona,
                segundo_apellido_persona: req.body.segundo_apellido_persona,
                direccion_correro_persona: req.body.direccion_correro_persona,
                contrasena_persona: req.body.contrasena_persona,
                direccion_residencia_persona: req.body.direccion_residencia_persona,
                numero_documento_persona: req.body.numero_documento_persona,
                fecha_nacimiento_persona: req.body.fecha_nacimiento_persona,
                numero_celular_persona: req.body.numero_celular_persona,
                numero_telefono_persona: req.body.numero_telefono_persona,
                id_tipo_documento: req.body.id_tipo_documento,
                id_tipo_persona: req.body.id_tipo_persona,
                id_municipio: req.body.id_municipio

            };
        //usamos la funcion para insertar
        PerModel.insertPer(PerData, function (error, data)
        {
            //se muestra el mensaje correspondiente
            if (data)
            {
                res.status(200).json(data);
            }
            else
            {
                res.status(500).send({ error: "boo:(" });
            }
        });
    });

    //---------------------------------------------------------------
    //Muestra y captura los datos para el método CRUL update (actualizar), usando el verbo put
    router.put("/", function (req, res)
    {
        //almacenamos los datos de la petición en un objeto

        var PerData =
            {
                id_persona: req.body.id_persona,
                primer_nombre_persona: req.body.primer_nombre_persona,
                segundo_nombre_persona: req.body.segundo_nombre_persona,
                primer_apellido_persona: req.body.primer_apellido_persona,
                segundo_apellido_persona: req.body.segundo_apellido_persona,
                direccion_correro_persona: req.body.direccion_correro_persona,
                contrasena_persona: req.body.contrasena_persona,
                direccion_residencia_persona: req.body.direccion_residencia_persona,
                numero_documento_persona: req.body.numero_documento_persona,
                fecha_nacimiento_persona: req.body.fecha_nacimiento_persona,
                numero_celular_persona: req.body.numero_celular_persona,
                numero_telefono_persona: req.body.numero_telefono_persona,
                id_tipo_documento: req.body.id_tipo_documento,
                id_tipo_persona: req.body.id_tipo_persona,
                id_municipio: req.body.id_municipio
            };


        //usamos la funcion para actualizar
        PerModel.updatePer(PerData, function (error, data)
        {
            //se muestra el mensaje correspondiente
            if (data && data.msg)
            {
                res.status(200).json(data);
            }
            else
            {
                res.status(500).send(
                { 
                    error: "boo:(" 
                });
            }
        });
    });


    //exportamos el objeto para tenerlo disponible en EL APP
    return router;
}