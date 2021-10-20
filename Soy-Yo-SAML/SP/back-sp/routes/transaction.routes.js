const express = require('express')
const router = express.Router();
const transactionController = require('../controllers/transaction.controller');

router.post('/', transactionController.addTransaction);
router.get('/:id', transactionController.getTransaction);
router.put('/:id/status', transactionController.updateStatusTransaction); // Esta es el conducto para actualizar el estado de una tarea especifica SoftDelete

module.exports = router;
