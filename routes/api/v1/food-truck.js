
const router = require('express').Router()
const { getCollection, ObjectId } = require('../../../dbconnect')

const dbName = 'Food-TruckAPI'

let menuCollection = null
let eventCollection = null
const getMenu = async () => {
        if(!menuCollection) menuCollection = await getCollection(dbName, 'MenuItems')
    return menuCollection
}
const getEvent = async () => {
        if(!eventCollection) eventCollection = await getCollection(dbName, 'EventItems')
    return eventCollection
}

// GET /api/v1/menu
router.get('/menu', async (req, res) => {
    try {
        const collection = await getMenu()
        const all = await collection.find().toArray()
        if (all.length > 0) res.send(all)
        else res.send({ error: { message: `Could not find any menu items.`}})
    }catch(err){
        console.error(err)
        res.status(500).send({ error: { message: err.message }})
    }
})

// GET /api/v1/events
router.get('/events', async (req, res) => {
    try {
        const collection = await getEvent()
        const all = await collection.find().toArray()
        if (all.length > 0) res.send(all)
        else res.send({ error: { message: `Could not find any event items.`}})
    }catch(err){
        console.error(err)
        res.status(500).send({ error: { message: err.message }})
    }
})

// GET /api/v1/menu/:id
router.get('/menu/:id', async (req, res) => {
    try {
        const { id } = req.params
        if (!ObjectId.isValid(id)) {
            return res.status(400).send({ error: { message: 'Invalid ID format' }})
        }
        const collection = await getMenu()
        const found = await collection.findOne({ "_id": new ObjectId(id) })
        if (found) res.send(found)
        else res.send({ error: { message: `Could not find menu item with id: ${id}`}})
    }catch(err){
        console.error(err)
        res.status(500).send({ error: { message: err.message }})
    }
})

// GET /api/v1/events/:id
router.get('/events/:id', async (req, res) => {
    try {
        const { id } = req.params
        if (!ObjectId.isValid(id)) {
            return res.status(400).send({ error: { message: 'Invalid ID format' }})
        }
        const collection = await getEvent()
        const found = await collection.findOne({ "_id": new ObjectId(id) })
        if (found) res.send(found)
        else res.send({ error: { message: `Could not find event item with id: ${id}`}})
    }catch(err){
        console.error(err)
        res.status(500).send({ error: { message: err.message }})
    }
})

/////////////
// POST /api/v1/menu
router.post('/menu', async (req, res) => {
    try {
        const { name, description, price, url } = req.body
        const collection = await getMenu()
        const { acknowledged, insertedId } = await collection.insertOne({ name, description, price, url })
        res.send({ acknowledged, insertedId })
    }catch(err){
        console.error(err)
        res.status(500).send({ error: { message: err.message }})
    }
})

// POST /api/v1/events
router.post('/events', async (req, res) => {
    try {
        const { name, location, date, time } = req.body
        const collection = await getEvent()
        const { acknowledged, insertedId } = await collection.insertOne({ name, location, date, time })
        res.send({ acknowledged, insertedId })
    }catch(err){
        console.error(err)
        res.status(500).send({ error: { message: err.message }})
    }
})

module.exports = router