const database = require('../models/index');
const Area = database.Area;

// Post an Area
exports.create = (req, res) => {
  Area.create({
    area: req.body.area,
    order: req.body.order
  }).then(area => {
    res.send(area);
  });
};

// FETCH all Areas
exports.findAll = (req, res) => {
  Area.findAll().then(area => {
    res.send(area);
  });
};

// Find an Area by Id
exports.findByPk = (req, res) => {
  Area.findByPk(req.params.id).then(area => {
    res.send(area);
  })
};

// Update an Area
exports.update = (req, res) => {
  var id = req.params.id;
  Area.update({
    area: req.body.area,
    order: req.body.order
  }, {
    where: {
      id: req.params.id
    }
  }).then(() => {
    res.status(200).send({message:"Updated successfully id = " + id});
  });
};

// Delete an Area by Id
exports.delete = (req, res) => {
  const id = req.params.id;
  Area.destroy({
    where: {
      id: req.params.id
    }
  }).then(() => {
    res.status(200).send({message:"Deleted successfully id = " + id});
  });
};
