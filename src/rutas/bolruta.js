//obtenemos el modelo bolmodel con toda la funcionalidad
var BolModel = require('../modelos/bolmodel');
var express = require('express');
var router = express.Router();

//creamos el ruteo de la clase
module.exports = function () {

    //---------------------------------------------------------------
    //Muestra el método CRUL Listar que muestra todas las boletas con INNER JOIN
    router.get("/B/", function (req, res) {
        BolModel.getBolsInner(function (error, data) {
            res.status(200).json(data);
        });
    });
    //---------------------------------------------------------------
    //Muestra el método CRUL Listar que muestra todas las boletas
    router.get("/", function (req, res) {
        BolModel.getBols(function (error, data) {
            res.status(200).json(data);
        });
    });

    //---------------------------------------------------------------
    //Muestra el método CRUL read(leer), que muestra la boleta solicitada con INNER JOIN

    router.get("/B/:id", function (req, res) {
        var id = req.params.id;

        //solo actualizamos si la id es un número
        if (!isNaN(id)) {
            BolModel.getBolInner(id, function (error, data) {
                //si la boleta existe lo mostramos en formato json
                if (typeof data !== 'undefined' && data.length > 0) {
                    res.status(200).json(data);
                }
                //en otro caso mostramos una respuesta conforme no existe
                else {
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

    router.get("/INF1/:id/:f2/:f1", function (req, res) {
        var id = req.params.id;
        var f1 = req.params.f1;
        var f2 = req.params.f2;

        //solo actualizamos si la id es un número
        if (!isNaN(id, f1, f2)) {
            BolModel.getBolInnerInforme1(id, f1, f2, function (error, data) {
                //si la boleta existe lo mostramos en formato json
                if (typeof data !== 'undefined' && data.length > 0) {
                    res.status(200).json(data);
                }
                //en otro caso mostramos una respuesta conforme no existe
                else {
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

    router.get("/INF2/:id/:f2/:f1", function (req, res) {
        var id = req.params.id;
        var f1 = req.params.f1;
        var f2 = req.params.f2;

        //solo actualizamos si la id es un número
        if (!isNaN(id)) {
            BolModel.getBolInnerInforme2(id, f1, f2, function (error, data) {
                //si la boleta existe lo mostramos en formato json
                if (typeof data !== 'undefined' && data.length > 0) {
                    res.status(200).json(data);
                }
                //en otro caso mostramos una respuesta conforme no existe
                else {
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
    //Muestra el método CRUL read(leer), que muestra la boleta solicitada
    router.get("/:id", function (req, res) {
        var id = req.params.id;

        //solo actualizamos si la id es un número
        if (!isNaN(id)) {
            BolModel.getBol(id, function (error, data) {
                //si la boleta existe lo mostramos en formato json
                if (typeof data !== 'undefined' && data.length > 0) {
                    res.status(200).json(data);
                }
                //en otro caso mostramos una respuesta conforme no existe
                else {
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
    router.post("/", function (req, res) {
        //creamos un objeto Json con los datos de la boleta
        var BolData =
        {
            id_boleta: null,
            precio_boleta: req.body.precio_boleta,
            numero_asiento_bolesta: req.body.numero_asiento_bolesta,
            id_evento: req.body.id_evento,
            id_persona: req.body.id_persona,
            id_punto_de_venta: req.body.id_punto_de_venta
        };


        //usamos la funcion para insertar
        BolModel.insertBol(BolData, function (error, data) {
            //se muestra el mensaje correspondiente
            if (data) {
                res.status(200).json(data);
            }
            else {
                res.status(500).send({ error: "boo:(" });
            }
        });
    });

    //---------------------------------------------------------------
    //Muestra y captura los datos para el método CRUL update (actualizar), usando el verbo put
    router.put("/", function (req, res) {
        //almacenamos los datos de la petición en un objeto

        var BolData =
        {
            id_boleta: req.body.id_boleta,
            precio_boleta: req.body.precio_boleta,
            numero_asiento_bolesta: req.body.numero_asiento_bolesta,
            id_evento: req.body.id_evento,
            id_persona: req.body.id_persona,
            id_punto_de_venta: req.body.id_punto_de_venta
        };


        //usamos la funcion para actualizar
        BolModel.updateBol(BolData, function (error, data) {
            //se muestra el mensaje correspondiente
            if (data && data.msg) {
                res.status(200).json(data);
            }
            else {
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