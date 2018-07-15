const express = require('express')
const router = express.Router()

const tradeController = require('./controller')

router.post('/', (req, res) => {
    tradeController
        .sendRequest(req.body)
        .then(data => res.send(data))
        .catch(err => res.send(err))
})

router.get('/:id', (req, res) => {
    tradeController
        .getRequest(req.params.id)
        .then(data => res.send(data))
        .catch(err => res.send(err))
})

router.post('/:id/accept', (req, res) => {
    tradeController
        .acceptRequest(req.params.id)
        .then(data => {
            res.send(data)})
        .catch(err => res.send(err))
})

router.post('/:id/deny', (req, res) => {
    tradeController
        .denyRequest(req.params.id)
        .then(data => {
            res.send(data)})
        .catch(err => res.send(err))
})

router.get('/all/:id', (req, res) => {
    tradeController
        .getAllRequest(req.params.id)
        .then(data => res.send(data))
        .catch(err => res.send(err))
})

module.exports = router