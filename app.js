
const express = require('express')
const app = express()
const port = 3000



// allow us to send json
app.use(express.json())
// allow us to respond with static webpages
app.use(express.static('public'))

// attatch endpoints
app.use('/api/v1/', require('./routes/api/v1/food-truck'))
app.use(require('./routes/static'))

app.listen(port, () => console.log(`http://localhost:${port}/`))