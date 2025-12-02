
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
    const collection = await getMenu()
    const all = await collection.find().toArray()
    if (all) res.send(all)
    else res.send({ error: { message: `Could not find any menu items.`}})
})

// GET /api/v1/events
router.get('/events', async (req, res) => {
    const collection = await getEvent()
    const all = await collection.find().toArray()
    if (all) res.send(all)
    else res.send({ error: { message: `Could not find any event items.`}})
})

// GET /api/v1/menu/:id
router.get('/menu/:id', async (req, res) => {
    const { id } = req.params
    const collection = await getMenu()
    const found = await collection.findOne({ "_id": new ObjectId(id) })
    if (found) res.send(found)
    else res.send({ error: { message: `Could not find menu item with id: ${id}`}})
})

// GET /api/v1/events/:id
router.get('/events/:id', async (req, res) => {
    const { id } = req.params
    const collection = await getEvent()
    const found = await collection.findOne({ "_id": new ObjectId(id) })
    if (found) res.send(found)
    else res.send({ error: { message: `Could not find event item with id: ${id}`}})
})

/////////////
// POST /api/v1/menu
router.post('/menu', async (req, res) => {
    const { name, description, price, url } = req.body
    const collection = await getMenu()
    const { acknowledged, insertedId } = await collection.insertOne({ name, description, price, url })
    res.send({ acknowledged, insertedId })
})

// POST /api/v1/events
router.post('/events', async (req, res) => {
    const { name, location, date, time } = req.body
    const collection = await getEvent()
    const { acknowledged, insertedId } = await collection.insertOne({ name, location, date, time })
    res.send({ acknowledged, insertedId })
})

module.exports = router