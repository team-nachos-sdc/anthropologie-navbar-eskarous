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

// router
//   .route('/products/random')
//     .get(controller.get)

// router
//   .route('/products/:id')
//     .get(sqlController.get)
//     .delete(sqlController.delete)
//     .put(sqlController.put)

// router
//   .route('/products')
//     .post(sqlController.post)

module.exports = router;