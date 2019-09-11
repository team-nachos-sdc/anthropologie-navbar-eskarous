let router = require('express').Router();
const controller = require('./controller.js');

router
  .route('/products/:id')
    .get(controller.get)
    .delete(controller.delete)

router
  .route('/products')
    .post(controller.post)

module.exports = router;