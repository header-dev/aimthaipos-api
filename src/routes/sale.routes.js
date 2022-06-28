const express = require('express');
const router = express.Router();

const saleController = require('./../controllers/sale.controller');

router.get('/check-cashdrawer', saleController.checkInitialCash);
router.post('/init-cashdrawer', saleController.initialCash);
router.post('/order', saleController.createOrUpdateOrder);
router.get('/order', saleController.findAllOrder);
router.get('/order/:id', saleController.findOneOrder);
router.post('/order-detail', saleController.createOrderDetail);
router.post('/order-table', saleController.addTableOrder);
router.delete('/order-detail/:id', saleController.destroyOrderDetail);
router.get('/menu', saleController.findAllMenu);
router.get('/table', saleController.findAllTable);
router.get('/customer', saleController.findAllCustomer);
router.post('/customer', saleController.createCustomer);
router.put('/merge-table/:id', saleController.mergeTable);
router.put('/order/:id', saleController.updateOrder);
router.put('/order-detail/:id', saleController.updateOrderDetail);
router.put('/order-detail-discount/:id', saleController.createDiscount);

module.exports = router;
