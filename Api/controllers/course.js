const database = require('../models/index');
const Course = database.Course;

// Post a Course
exports.create = (req, res) => {
  Course.create({
    course: req.body.course,
    active: req.body.active,
    year: req.body.year,
    order: req.body.order
  }).then(course => {
    res.send(course);
  });
};

// FETCH all Courses
exports.findAll = (req, res) => {
  Course.findAll().then(courses => {
    res.send(courses);
  });
};

// Find a Course by Id
exports.findByPk = (req, res) => {
  Course.findByPk(req.params.id).then(course => {
    res.send(course);
  })
};

// Update a Course
exports.update = (req, res) => {
  var id = req.params.id;
  Course.update({
    course: req.body.course,
    active: req.body.active,
    year: req.body.year,
    order: req.body.order
  }, {
    where: {
      id: req.params.id
    }
  }).then(() => {
    res.status(200).send({message:"updated successfully a course with id = " + id});
  });
};

// Delete a Course by Id
exports.delete = (req, res) => {
  const id = req.params.id;
  Course.destroy({
    where: {
      id: req.params.id
    }
  }).then(() => {
    res.status(200).send({message:"deleted successfully a course with id = " + id});
  });
};