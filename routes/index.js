const router = require('express').Router();
const express = require('express');
const path = require('path');
const task = require('./task');

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../index.html'))
})

router.use('/task', task)

router.use(express.static(path.join(__dirname, '../')));
// router.use(express.static(path.join(__dirname, '../js')));

module.exports = router;