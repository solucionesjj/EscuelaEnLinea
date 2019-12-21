var express = require('express');
var bodyParser = require('body-parser').json();
var courseController = require('../controllers/course');
var router = express.Router();

// Create a new Customer
router.post('/create',bodyParser, courseController.create);

// Retrieve all Customer
router.get('/', courseController.findAll);

// Retrieve a single Customer by Id
router.get('/:id', courseController.findByPk);

// Update a Customer with Id
router.put('/:id',bodyParser, courseController.update);

// Delete a Customer with Id
router.delete('/:id', courseController.delete);

module.exports = router;