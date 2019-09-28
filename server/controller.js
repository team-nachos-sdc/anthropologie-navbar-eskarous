const { 
  getById,
  createProduct,
  updateProduct,
  deleteProduct
} = require('../database/dbHelpers.js');

const controller = {

  get: (req, res) => {
    let { id } = req.params;
    console.log('what is id', id)
    getById(id)
    .then(data => res.status(200).send(data))
    .catch(err => res.status(400).send(err));
  },

  // get: (req, res) => {
  //   let { id } = req.params;
  //   console.log('what is id', id)
  //   getById(Math.floor(Math.random() * (Math.floor(10000000) - Math.ceil(9000001) + 1)) + Math.ceil(9000001))
  //   .then(data => res.status(200).send(data))
  //   .catch(err => res.status(400).send(err));
  // },

  post: (req, res) => {
    let { product_category, product_name, price, brand_name, online_exclusive, review_star_count, review_count, colors, color_images, fit, size_standard, size_petite, size_plus, sizes_unavailable, size_petite_unavailable, size_plus_unavailable, image } = req.body;
    createProduct(product_category, product_name, price, brand_name, online_exclusive, review_star_count, review_count, colors, color_images, fit, size_standard, size_petite, size_plus, sizes_unavailable, size_petite_unavailable, size_plus_unavailable, image)
    .then(data => res.status(201).send(data))
    .catch(err => res.status(401).send(err));
  },

  put: (req, res) => {
    let { id } = req.params;
    let { product_category, product_name, price, brand_name, online_exclusive, review_star_count, review_count, colors, color_images, fit, size_standard, size_petite, size_plus, sizes_unavailable, size_petite_unavailable, size_plus_unavailable, image } = req.body;
    updateProduct(id, product_category, product_name, price, brand_name, online_exclusive, review_star_count, review_count, colors, color_images, fit, size_standard, size_petite, size_plus, sizes_unavailable, size_petite_unavailable, size_plus_unavailable, image)
    .then(data => res.status(202).send('sucessfully updated'))
    .catch(err => res.status(402).send(err));
  },

  delete: (req, res) => {
    let { id } = req.params;
    // console.log(`deleted id: ${id}`);
    deleteProduct(id)
    .then(data => res.status(203).send(`deleted id: ${id}`))
    .catch(err => res.status(403).send(err));
  }

}

module.exports = controller;