var express = require('express');
var bodyParser = require('body-parser').json();
var crudController = require('../controllers/crud');
var router = express.Router();

// Create a new record
router.post('/', bodyParser, crudController.add);

// Retrieve all records
router.get('/', crudController.get);

// Retrieve specific records
router.get('/search', crudController.getSearch);

// Retrieve specific records requested by sql query
router.get('/getbyquery', crudController.getDynamicQuery);

// Update a record 
router.put('/', bodyParser, crudController.update);

// Delete a record
router.delete('/', crudController.delete);

module.exports = router;