
const router = require('express').Router()
const { getCollection, ObjectId } = require('../../../dbconnect')

let collection = null
const getPokemon = async () => {
    if(!collection) collection = await getCollection('PokemonAPI', 'Pokemon')
    return collection
}
/* 
For this exercise, you will create and test two new endpoints:

GET /api/v1/pokemon/ - This endpoint should retrieve all of the pokemon from the database.

Hint: Use the find method without any parameters to retrieve all of the pokemon.
GET /api/v1/pokemon/byName/:name - This endpoint should retrieve a pokemon from the database by name. Additionally, I want you to use the following query parameters, to make the search case-insensitive:

const regexp = new RegExp(`^${name}`, 'i')
const found = await collection.findOne({ name: regexp })
*/
router.get('/', async (request, response) => {
    const collection = await getPokemon()
    const all = await collection.find().toArray()
    if (all) response.send(all)
    else response.send({ error: { message: `Could not find any pokemon.`}})
})

router.get('/byName/:name', async (request, response) => {
    const { name } = request.params
    const collection = await getPokemon()
    const regexp = new RegExp(`^${name}`, 'i')
    const found = await collection.findOne({ name: regexp })
    if (found) response.send(found)
    else response.send({ error: { message: `Could not find pokemon with name: ${name}`}})
})

router.get('/byId/:id', async (request, response) => {
    const { id } = request.params
    const collection = await getPokemon()
    const found = await collection.findOne({ "_id": new ObjectId(id) })
    if (found) response.send(found)
    else response.send({ error: { message: `Could not find pokemon with id: ${id}`}})
})

router.get('/random', async (request, response) => {
    const count = await collection.countDocuments()
    const number = Math.floor(Math.random() * count) + 1
    const collection = await getPokemon()
    const found = await collection.findOne({ "number": parseInt(number) })
    if (found) response.send(found)
    else response.send({ error: { message: `Could not find pokemon with id: ${number}`}})
})

router.post('/add', async (request, response) => {
    const { number, name, type } = request.body
    const collection = await getPokemon()
    const { acknowledged, insertedId } = await collection.insertOne({ number, name, type })
    response.send({ acknowledged, insertedId })
})

router.get('/:number', async(request, response) => {
    const { number } = request.params
    const collection = await getPokemon()
    const found = await collection.findOne({ "number": parseInt(number) })
    if (found) response.send(found)
    else response.send({ error: { message: `Could not find pokemon with id: ${number}`}})
})

router.get('/random/:type', async (request, response) => {
    const { type } = request.params
    const collection = await getPokemon()
    const foundOfTType = await collection.find({ "type": type }).toArray()
    const count = foundOfTType.length
    if (count === 0) response.send({ error: { message: `Could not find pokemon of type: ${type}`}})
    const number = Math.floor(Math.random() * count)
    response.send(foundOfTType[number])
})

module.exports = router