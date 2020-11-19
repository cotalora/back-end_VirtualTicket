//obtenemos el modelo munimodel con toda la funcionalidad
var MuniModel = require('../modelos/munimodel');
var express = require('express');
var router = express.Router();

//creamos el ruteo de la clase
module.exports = function ()
{

    //---------------------------------------------------------------
    //Muestra el método CRUL Listar que muestra todos los municipios con INNER JOIN
    router.get("/M/", function (req, res)
    {
        MuniModel.getMunisInner(function (error, data)
        {
            res.status(200).json(data);
        });
    });
    //---------------------------------------------------------------
    //Muestra el método CRUL Listar que muestra todos los municipios
    router.get("/", function (req, res)
    {
        MuniModel.getMunis(function (error, data)
        {
            res.status(200).json(data);
        });
    });

    //---------------------------------------------------------------
    //Muestra el método CRUL read(leer), que muestra el municipio solicitado con INNER JOIN
    router.get("/M/:id", function (req, res)
    {
        var id = req.params.id;

        //solo actualizamos si la id es un número
        if (!isNaN(id))
        {
            MuniModel.getMuniInner(id, function (error, data)
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
    //Muestra el método CRUL read(leer), que muestra el municipio solicitado
    router.get("/:id", function (req, res)
    {
        var id = req.params.id;

        //solo actualizamos si la id es un número
        if (!isNaN(id))
        {
            MuniModel.getMuni(id, function (error, data)
            {
                //si el municipio existe lo mostramos en formato json
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
        //creamos un objeto Json con los datos del municipio
        var MuniData =
            {
                id_municipio: null,
                nombre_municipio: req.body.nombre_municipio,
                id_departamento: req.body.id_departamento
            };


        //usamos la funcion para insertar
        MuniModel.insertMuni(MuniData, function (error, data)
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

        var MuniData =
            {
                id_municipio: req.body.id_municipio,
                nombre_municipio: req.body.nombre_municipio,
                id_departamento: req.body.id_departamento
            };


        //usamos la funcion para actualizar
        MuniModel.updateMuni(MuniData, function (error, data)
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