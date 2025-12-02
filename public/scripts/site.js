

const path = require('path')
const router = require('express').Router()

const root = path.join(__dirname, '..', 'public')

function sendIndex(response) {
    response.sendFile('index.html', {root})
}

router.get('/', (request, response) => {
    // response.sendFile('index.html', {root})
    sendIndex(response)
})

router.get('/pokemon/:id', (request, response) => {
    // response.sendFile('index.html', {root})
    sendIndex(response)
})

router.get('/type/:type', (request, response) => {
    //response.sendFile('index.html', {root})
    sendIndex(response)
})

module.exports = router