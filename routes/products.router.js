const express = require('express')
const router = express.Router()

const { faker } = require('@faker-js/faker')

router.get('/', (req, res) => {
  const { size } = req.query
  const limit = size || 10

  const products = []

  for (let index = 0; index < limit; index++) {
    products.push({
      name: faker.commerce.productName(),
      price: parseFloat(faker.commerce.price()),
      image: faker.image.url(),
    })
  }

  res.json(products)
})

router.get('/filter', (req, res) => {
  res.send('I am a filter')
})

router.get('/:id', (req, res) => {
  const { id } = req.params

  res.json({
    id,
    name: 'Lenovo ThinkPad T14 Gen 3',
    brand: 'Lenovo',
    model: 'L14',
    price: 500,
  })
})

router.post('/', (req, res) => {
  const body = req.body

  res.json({
    message: 'Created',
    data: body,
  })
})

router.patch('/:id', (req, res) => {
  const { id } = req.params
  const body = req.body

  res.json({
    id,
    message: 'Updated',
    data: body,
  })
})

router.delete('/:id', (req, res) => {
  const { id } = req.params

  res.json({
    id,
    message: 'Deleted',
  })
})

module.exports = router
