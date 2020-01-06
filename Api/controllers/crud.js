const database = require('../models/index');

exports.get = async (req, res) => {
    const model = req.query.model;
    const result =
        await database[model]
            .findAll(req.body)
            .then(
                function (result) {
                    res.send({
                        result: true,
                        data: result,
                        message: 'Registros consultados exitosamente.'
                    })
                })
            .catch(
                function (commandError) {
                    res.send({
                        result: false,
                        data: null,
                        message: 'Error al consultar el registro. ' + commandError
                    })
                });
}

exports.add = async (req, res) => {
    const model = req.query.model;
    const result = await database[model]
        .create(req.body)
        .then(
            function (result) {
                res.send({
                    result: true,
                    data: result,
                    message: 'Registros creado exitosamente.'
                })
            })
        .catch(
            function (commandError) {
                res.send({
                    result: false,
                    data: null,
                    message: 'Error al crear el registro. ' + commandError
                })
            });
}

exports.update = async (req, res) => {
    const model = req.query.model;
    const id = req.query.id;
    const result = await database[model]
        .update(req.body, { where: { id: id } })
        .then(
            function (result) {
                res.send({
                    result: true,
                    data: result,
                    message: 'Registros actualizado exitosamente.'
                })
            })
        .catch(
            function (commandError) {
                res.send({
                    result: false,
                    data: null,
                    message: 'Error al actualizar el registro. ' + commandError
                })
            });
}

exports.delete = async (req, res) => {
    const model = req.query.model;
    const id = req.query.id;
    const result = await database[model]
        .destroy({ where: { id: id } })
        .then(
            function (result) {
                res.send({
                    result: true,
                    data: result,
                    message: 'Registros eliminado exitosamente.'
                })
            })
        .catch(
            function (commandError) {
                res.send({
                    result: false,
                    data: null,
                    message: 'Error al eliminar el registro. ' + commandError
                })
            });
};

/*
// Find an Area by Id
exports.findByPk = (req, res) => {
    Area.findByPk(req.params.id).then(area => {
      res.send(area);
    })
  };
*/


