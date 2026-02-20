const express = require('express')
const routerApi = require('./routes')
const {
  logErrors,
  errorHandler,
  boomErrorHandler,
} = require('./middleware/error.handler')

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

app.use(logErrors)
app.use(boomErrorHandler)
app.use(errorHandler)

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`)
})
