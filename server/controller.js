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

  post: (req, res) => {
    let { productCategory, productName, price, brandName, onlineExclusive, reviewStarCount, reviewCount, colors, colorImages, fit, sizeStandard, sizePetite, sizePlus, sizesUnavailable, sizePetiteUnavailable, sizePlusUnavailable, image } = req.body;
    createProduct(productCategory, productName, price, brandName, onlineExclusive, reviewStarCount, reviewCount, colors, colorImages, fit, sizeStandard, sizePetite, sizePlus, sizesUnavailable, sizePetiteUnavailable, sizePlusUnavailable, image)
    .then(data => res.status(201).send(data))
    .catch(err => res.status(401).send(err));
  },

  put: (req, res) => {
    let { id } = req.params;
    let {productCategory, productName, price, brandName, onlineExclusive, reviewStarCount, reviewCount, colors, colorImages, fit, sizeStandard, sizePetite, sizePlus, sizesUnavailable, sizePetiteUnavailable, sizePlusUnavailable, image } = req.body;
    updateProduct(id, productCategory, productName, price, brandName, onlineExclusive, reviewStarCount, reviewCount, colors, colorImages, fit, sizeStandard, sizePetite, sizePlus, sizesUnavailable, sizePetiteUnavailable, sizePlusUnavailable, image)
    .then(data => res.status(202).send(data))
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