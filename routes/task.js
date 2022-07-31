var todoController = require('../controllers/todoController');

const router = require('express').Router()


router.get('/', function(req, res) {
    todoController.list(req, res);
})

router.get('/:nombre', function(req, res) {
    todoController.search(req, res);
})

router.post('/', function(req, res) {
    todoController.create(req, res);
})

router.delete('/', function(req, res) {
    todoController.remove(req, res);
})

router.put('/', function(req, res) {
    todoController.update(req, res);
})

//url:puerto/api/peliculas
module.exports = router