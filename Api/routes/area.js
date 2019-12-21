var express = require('express');
var bodyParser = require('body-parser').json();
var areaController = require('../controllers/area');
var router = express.Router();

// Create a new Customer
router.post('/create',bodyParser, areaController.create);

// Retrieve all Customer
router.get('/', areaController.findAll);

// Retrieve a single Customer by Id
router.get('/:id', areaController.findByPk);

// Update a Customer with Id
router.put('/:id',bodyParser, areaController.update);

// Delete a Customer with Id
router.delete('/:id', areaController.delete);

module.exports = router;