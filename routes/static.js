

const path = require('path')
const router = require('express').Router()

const root = path.join(__dirname, '..', 'public')

function sendIndex(res) {
    res.sendFile('index.html', {root})
}

// Home page
router.get('/', (req, res) => {
    sendIndex(res)
})

// Event details page
router.get('/event/:id', (request, response) => {
    sendIndex(res)
})

// Menu item details page
router.get('/menu/:id', (req, res) => {
    sendIndex(res)
})

// Admin page
router.get('/admin', (req, res) => {
    sendIndex(res)
})
module.exports = router