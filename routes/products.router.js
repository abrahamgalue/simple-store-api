const express = require('express')
const router = express.Router()

const ProductService = require('../services/products.service')
const validatorHandler = require('../middleware/validator.handler')
const {
  createProductScheme,
  getProductScheme,
  updateProductScheme,
} = require('../schemas/product.schema')

const service = new ProductService()

router.get('/', async (req, res) => {
  const products = await service.find()

  res.json(products)
})

router.get('/filter', (req, res) => {
  res.send('I am a filter')
})

router.get(
  '/:id',
  validatorHandler(getProductScheme, 'params'),
  async (req, res) => {
    const { id } = req.params

    const product = await service.findOne(id)

    res.json(product)
  },
)

router.post(
  '/',
  validatorHandler(createProductScheme, 'body'),
  async (req, res) => {
    const body = req.body

    const newProduct = await service.create(body)

    res.status(201).json({
      message: 'Created',
      data: newProduct,
    })
  },
)

router.patch(
  '/:id',
  validatorHandler(getProductScheme, 'params'),
  validatorHandler(updateProductScheme, 'body'),
  async (req, res) => {
    const { id } = req.params
    const body = req.body

    const updatedProduct = await service.update(id, body)

    res.json(updatedProduct)
  },
)

router.delete(
  '/:id',
  validatorHandler(getProductScheme, 'params'),
  async (req, res) => {
    const { id } = req.params

    const response = await service.delete(id)

    res.json(response)
  },
)

module.exports = router
