var express = require('express');
var bodyParser = require('body-parser').json();
var areaController = require('../controllers/area');
var router = express.Router();

// Retrieve all records
router.get('/', areaController.get);

// // Create a new record
// router.post('/', bodyParser, crudController.add);

// // Retrieve specific records
// router.get('/search', crudController.getSearch);

// // Retrieve specific records requested by sql query
// router.get('/getbyquery', crudController.getDynamicQuery);

// // Update a record 
// router.put('/', bodyParser, crudController.update);

// // Delete a record
// router.delete('/', crudController.delete);

module.exports = router;