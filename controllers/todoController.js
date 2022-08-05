const { default: mongoose } = require('mongoose');
let todoTask = require('../models/todoTask');

module.exports = {
    create: function(req, res) {
        let tarea = new todoTask(req.body)
        tarea.save(function(err, task) {
            if (err) {
                return res.status(500).json({
                    message: 'Error al guardar la tarea',
                    error: err
                })
            }

            return res.status(200).json({
                message: 'Se guardó la tarea',
                _id: task._id
            })
        })
    },


    list: function(req, res) {
        todoTask.find(function(err, task) {
            if (err) {
                return res.status(500).json({
                    message: 'Error obteniendo las tareas'
                })
            }
            return res.json(task)
        })
    },



    search: function(req, res) {
        todoTask.find({ title: req.params.title }, function(err, task) {
            if (err) {
                return res.status(500).json({
                    message: 'Error en la búsqueda'
                })
            }
            return res.json(task)
        })
    },



    remove: function(req, res) {
        todoTask.deleteMany({ title: req.body.title }, function(err, task) {
            if (err) {
                return res.status(500).json({
                    message: 'Error en la búsqueda de la task a borrar'
                })
            }
            return res.status(200).json({ message: 'Se borro correctamente la tarea con el id: ' + req.params.id })
        })
    },



    update: function(req, res) {
        var title = req.body.titlep
        todoTask.findOne({ title: title }, function(err, task) {
            if (err) {
                return res.status(404).json({
                    message: 'Se ha producido un error al guardar la task',
                    error: err
                })
            }

            if (!task) {
                return res.status(404).json({
                    message: 'No hemos encontrado la task'
                })
            }

            // task.id = req.body.id
            task.title = req.body.title
            task.completed = req.body.completed

            task.save(function(err, task) {
                if (err) {
                    return res.status(404).json({
                        message: 'Error al guardar la task'
                    })
                }
                if (!task) {
                    return res.status(404).json({
                        message: 'No hemos encontrado la task'
                    })
                }
                return res.json(task)
            })
        })
    },

}