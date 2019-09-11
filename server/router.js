let router = require('express').Router();
const controller = require('./controller.js');

router
  .route('/products/:id')
    .get(controller.get)
    .delete(controller.delete)
    .put(controller.put)

router
  .route('/products')
    .post(controller.post)

module.exports = router;