const database = require('../models/index');

exports.get = async (req, res) => {
    try {
        const model = req.query.model;
        const result = await database[model].findAll(req.body);
        res.send({
            result: true,
            data: result,
            message: 'Registros consultados exitosamente.'
        });
    } catch (error) {
        res.send({
            result: false,
            data: result,
            message: 'Error al consultar los registros: ' + JSON.stringify(error)
        });
    }

}

exports.add = async (req, res) => {
    try {
        const model = req.query.model;
        const result = await database[model].create(req.body);
        res.send({
            result: true,
            data: result,
            message: 'Registro creado correctamente.'
        });
    } catch (error) {
        res.send({
            result: false,
            data: result,
            message: 'Error al crear el registro: ' + JSON.stringify(error)
        });
    }
}

exports.update = async (req, res) => {
    try {
        const model = req.query.model;
        const id = req.query.id;
        const result = await database[model].update(req.body, { where: { id: id } });
        res.send({
            result: true,
            data: result,
            message: 'Registro actualizado correctamente.'
        });
    } catch (error) {
        res.send({
            result: true,
            data: result,
            message: 'Error al actualizar el registro: ' + JSON.stringify(error)
        });
    }
}

exports.delete = async (req, res) => {
    try {
        const model = req.query.model;
        const id = req.query.id;
        const result = await database[model].destroy({ where: { id: id } });
        res.send({
            result: true,
            data: result,
            message: 'Registro eliminado correctamente.'
        });
    } catch (error) {
        res.send({
            result: true,
            data: result,
            message: 'Error al eliminar el registro: ' + JSON.stringify(error)
        });
    }

/*
// Find an Area by Id
exports.findByPk = (req, res) => {
    Area.findByPk(req.params.id).then(area => {
      res.send(area);
    })
  };
*/


};