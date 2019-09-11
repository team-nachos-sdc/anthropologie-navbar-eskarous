const ProductDetail = require('./model.js');

const dbHelpers = {
  getById: (productCategoryId) => {
    return ProductDetail.findOne({
      productCategoryId
    })
  },

  createProduct: (productCategoryId, productCategory, productName) => {

  },

  updateProduct: () => {

  },

  deleteProduct: (productCategoryId) => {
    return ProductDetail.deleteOne({
      productCategoryId
    })
  }

}

module.exports = dbHelpers;