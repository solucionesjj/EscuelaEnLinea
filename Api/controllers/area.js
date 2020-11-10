const database = require('../models/index');
const sequelize = require('sequelize');
let Model = require('../models/').Area;

exports.get = async(request, result) => {
    let commandResult;
    await Model.findAll()
        .then(
            output => {
                commandResult = new CommandResult(true, output);
            }
        )
        .catch(
            output => {
                commandResult = new CommandResult(false, output);
            }
        )
    result.send(commandResult);
}

exports.getById = async(request, result) => {
    let commandResult;
    const id = request.query.id;
    await Model.findAll({ where: { id: id } })
        .then(
            output => {
                commandResult = new CommandResult(true, output);
            }
        )
        .catch(
            output => {
                commandResult = new CommandResult(false, output);
            }
        )
    result.send(commandResult);
}

exports.add = async(request, result) => {
    let commandResult;
    await Model.create(request.body)
        .then(
            output => {
                commandResult = new CommandResult(true, output);
            }
        )
        .catch(
            output => {
                commandResult = new CommandResult(false, output);
            }
        )
    result.send(commandResult);
}

exports.update = async(request, result) => {
    let commandResult;
    const id = request.query.id;
    await Model.update(req.body, { where: { id: id } })
        .then(
            output => {
                commandResult = new CommandResult(true, output);
            }
        )
        .catch(
            output => {
                commandResult = new CommandResult(false, output);
            }
        )
    result.send(commandResult);
}

exports.delete = async(request, result) => {
    let commandResult;
    const id = request.query.id;
    await Model.destroy({ where: { id: id } })
        .then(
            output => {
                commandResult = new CommandResult(true, output);
            }
        )
        .catch(
            output => {
                commandResult = new CommandResult(false, output);
            }
        )
    result.send(commandResult);
};