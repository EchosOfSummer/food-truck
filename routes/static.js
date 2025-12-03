const path = require('path')
const router = require('express').Router()

const root = path.join(__dirname, '..', 'public')

// function sendIndex(res) {
    
// }

// Home page
router.get('/', (req, res) => {
    res.sendFile('index.html', {root})
})

// Event details page
router.get('/event/:id', (request, response) => {
    res.sendFile('event.html', {root})
})

// Menu item details page
router.get('/menu/:id', (req, res) => {
    res.sendFile('index.html', {root})
})

// Admin page
router.get('/admin', (req, res) => {
    res.sendFile('admin.html', {root})
})
module.exports = router