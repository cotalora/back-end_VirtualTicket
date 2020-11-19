//obtenemos el modelo punvenmodel con toda la funcionalidad
var PunVenModel = require('../modelos/punvenmodel');
var express = require('express');
var router = express.Router();

//creamos el ruteo de la clase
module.exports = function ()
{

    //---------------------------------------------------------------
    //Muestra el método CRUL Listar que muestra todos los puntos de venta con INNER JOIN
    router.get("/PU/", function (req, res)
    {
        PunVenModel.getPunVensInner(function (error, data)
        {
            res.status(200).json(data);
        });
    });
    //---------------------------------------------------------------
    //Muestra el método CRUL Listar que muestra todos los puntos de venta con INNER JOIN
    router.get("/", function (req, res)
    {
        PunVenModel.getPunVens(function (error, data)
        {
            res.status(200).json(data);
        });
    });

    //---------------------------------------------------------------
    //Muestra el método CRUL read(leer), que muestra el punto de venta solicitado con INNER JOIN
    router.get("/PU/:id", function (req, res)
    {
        var id = req.params.id;

        //solo actualizamos si la id es un número
        if (!isNaN(id))
        {
            PunVenModel.getPunVenInner(id, function (error, data)
            {
                //si el punto de venta existe lo mostramos en formato json
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
    //Muestra el método CRUL read(leer), que muestra el punto de venta solicitado
    router.get("/:id", function (req, res)
    {
        var id = req.params.id;

        //solo actualizamos si la id es un número
        if (!isNaN(id))
        {
            PunVenModel.getPunVen(id, function (error, data)
            {
                //si el punto de venta existe lo mostramos en formato json
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
        //creamos un objeto Json con los datos del punto de venta
        var PunVenData =
            {
                id_punto_de_venta: null,
                nombre_punto_de_venta: req.body.nombre_punto_de_venta,
                direccion_punto_de_venta: req.body.direccion_punto_de_venta,
                nombre_punto_de_venta: req.body.nombre_punto_de_venta,
                id_municipio: req.body.id_municipio
            };


        //usamos la funcion para insertar
        PunVenModel.insertPunVen(PunVenData, function (error, data)
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

        var PunVenData =
            {
                id_punto_de_venta: req.body.id_punto_de_venta,
                direccion_punto_de_venta: req.body.direccion_punto_de_venta,
                nombre_punto_de_venta: req.body.nombre_punto_de_venta,
                id_municipio: req.body.id_municipio
            };


        //usamos la funcion para actualizar
        PunVenModel.updatePunVen(PunVenData, function (error, data)
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
