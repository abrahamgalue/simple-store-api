const { faker } = require('@faker-js/faker')

class ProductService {
  constructor() {
    this.products = []
    this.generate()
  }

  generate() {
    const limit = 25

    for (let index = 0; index < limit; index++) {
      this.products.push({
        id: faker.string.uuid(),
        name: faker.commerce.productName(),
        price: parseFloat(faker.commerce.price()),
        image: faker.image.url(),
      })
    }
  }

  async create(data) {
    const newProduct = {
      id: faker.string.uuid(),
      name: data.name ?? faker.commerce.productName(),
      price: data.price ?? parseFloat(faker.commerce.price()),
      image: data.image ?? faker.image.url(),
    }

    this.products.push(newProduct)

    return newProduct
  }

  async find() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.products)
      }, 500)
    })
  }

  async findOne(id) {
    return this.products.find((product) => product.id === id)
  }

  async update(id, changes) {
    const index = this.products.findIndex((product) => product.id === id)

    if (index === -1) {
      throw new Error('Product not found')
    }

    const product = this.products[index]

    this.products[index] = {
      ...product,
      name: changes.name ? changes.name : product.name,
      price: changes.price ? changes.price : product.price,
      image: changes.image ? changes.image : product.image,
    }

    return this.products[index]
  }

  async delete(id) {
    const index = this.products.findIndex((product) => product.id === id)

    if (index === -1) {
      throw new Error('Product not found')
    }

    this.products.splice(index, 1)

    return { id }
  }
}

module.exports = ProductService
