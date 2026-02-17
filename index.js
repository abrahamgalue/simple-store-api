const express = require('express')
const routerApi = require('./routes')

const app = express()
const port = 3000

app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/v2', (req, res) => {
  res.send('Hello World! V2')
})

routerApi(app)

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`)
})
