const database = require('../models/index');
//const sequelize = require('sequelize');

exports.get = async(req, res) => {
    const model = req.query.model;
    const result =
        await database[model]
        .findAll()
        .then(
            function(result) {
                res.send({
                    result: true,
                    data: result,
                    message: 'Registros consultados exitosamente.'
                })
            })
        .catch(
            function(commandError) {
                res.send({
                    result: false,
                    data: null,
                    message: 'Error al consultar el registro. ' + commandError
                })
            });
}

exports.getDynamicQuery = async(req, res) => {
    const model = req.query.model;
    const dynamicQuery = unescape(req.query.query);
    const result =
        //await database
        await database.sequelize
        //.query(dynamicQuery, { type: sequelize.QueryTypes.SELECT })
        .query(dynamicQuery)
        .then(
            function(result) {
                res.send({
                    result: true,
                    data: result[0],
                    message: 'Registros consultados exitosamente.'
                })
            })
        .catch(
            function(commandError) {
                res.send({
                    result: false,
                    data: null,
                    message: 'Error al consultar el registro. ' + commandError
                })
            });
}


exports.getSearch = async(req, res) => {
    const model = req.query.model;
    const searchCriteria = JSON.parse(req.query.searchCriteria);
    const result =
        await database[model]
        .findAll(searchCriteria)
        .then(
            function(result) {
                res.send({
                    result: true,
                    data: result,
                    message: 'Registros consultados exitosamente.'
                })
            })
        .catch(
            function(commandError) {
                res.send({
                    result: false,
                    data: null,
                    message: 'Error al consultar el registro. ' + commandError
                })
            });
}

exports.add = async(req, res) => {
    const model = req.query.model;
    const result = await database[model]
        .create(req.body)
        .then(
            function(result) {
                res.send({
                    result: true,
                    data: result,
                    message: 'Registros creado exitosamente.'
                })
            })
        .catch(
            function(commandError) {
                res.send({
                    result: false,
                    data: null,
                    message: 'Error al crear el registro. ' + commandError
                })
            });
}

exports.update = async(req, res) => {
    const model = req.query.model;
    const id = req.query.id;
    const result = await database[model]
        .update(req.body, { where: { id: id } })
        .then(
            function(result) {
                res.send({
                    result: true,
                    data: result,
                    message: 'Registros actualizado exitosamente.'
                })
            })
        .catch(
            function(commandError) {
                res.send({
                    result: false,
                    data: null,
                    message: 'Error al actualizar el registro. ' + commandError
                })
            });
}

exports.delete = async(req, res) => {
    const model = req.query.model;
    const id = req.query.id;
    const result = await database[model]
        .destroy({ where: { id: id } })
        .then(
            function(result) {
                res.send({
                    result: true,
                    data: result,
                    message: 'Registros eliminado exitosamente.'
                })
            })
        .catch(
            function(commandError) {
                res.send({
                    result: false,
                    data: null,
                    message: 'Error al eliminar el registro. ' + commandError
                })
            });
};