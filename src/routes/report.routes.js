const express = require("express");
const router = express.Router();

const reportController = require("./../controllers/report.controller");

router.get("/daily-sales", reportController.findAllDailySale);

router.get("/summary-sale-transaction-item", reportController.findAllSummarySaleTransactionItem);

router.get('/summary-sale-item', reportController.findAllSummarySaleItem)

router.get('/daily-incomes', reportController.findAllDailyIncome)

module.exports = router;
