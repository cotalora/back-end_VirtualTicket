//obtenemos el modelo evenmodel con toda la funcionalidad
var EvenModel = require('../modelos/evenmodel');
var express = require('express');
var router = express.Router();

//creamos el ruteo de la clase
module.exports = function ()
{

    //---------------------------------------------------------------
    //Muestra el método CRUL Listar que muestra todos los eventos con INNER JOIN
    router.get("/E/", function (req, res)
    {
        EvenModel.getEvensInner(function (error, data)
        {
            res.status(200).json(data);
        });
    });
    //---------------------------------------------------------------
    //Muestra el método CRUL Listar que muestra todos los eventos
    router.get("/", function (req, res)
    {
        EvenModel.getEvens(function (error, data)
        {
            res.status(200).json(data);
        });
    });

    //---------------------------------------------------------------
    //Muestra el método CRUL read(leer), que muestra el evento solicitado con INNER JOIN
    router.get("/E/:id", function (req, res)
    {
        var id = req.params.id;

        //solo actualizamos si la id es un número
        if (!isNaN(id))
        {
            EvenModel.getEvenInner(id, function (error, data)
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
    //Muestra el método CRUL read(leer), que muestra el evento solicitado
    router.get("/:id", function (req, res)
    {
        var id = req.params.id;

        //solo actualizamos si la id es un número
        if (!isNaN(id))
        {
            EvenModel.getEven(id, function (error, data)
            {
                //si el evento existe lo mostramos en formato json
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
        //creamos un objeto Json con los datos del evento
        var EvenData =
            {
                id_evento: null,
                nombre_evento: req.body.nombre_evento,
                descripcion_evento: req.body.descripcion_evento,
                direccion_evento: req.body.direccion_evento,
                aforo_evento: req.body.aforo_evento,
                fecha_hora_inicio_evento: req.body.fecha_hora_inicio_evento,
                fecha_hora_fin_evento: req.body.fecha_hora_fin_evento,
                imagenes: req.body.imagenes,
                id_municipio: req.body.id_municipio,
                id_tipo_evento: req.body.id_tipo_evento
            };


        //usamos la funcion para insertar
        EvenModel.insertEven(EvenData, function (error, data)
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

        var EvenData =
            {
                id_evento: req.body.id_evento,
                nombre_evento: req.body.nombre_evento,
                descripcion_evento: req.body.descripcion_evento,
                direccion_evento: req.body.direccion_evento,
                aforo_evento: req.body.aforo_evento,
                fecha_hora_inicio_evento: req.body.fecha_hora_inicio_evento,
                fecha_hora_fin_evento: req.body.fecha_hora_fin_evento,
                imagenes: req.body.imagenes,
                id_municipio: req.body.id_municipio,
                id_tipo_evento: req.body.id_tipo_evento
            };


        //usamos la funcion para actualizar
        EvenModel.updateEven(EvenData, function (error, data)
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