const express=require('express');
const {
    createIncomeRecord,
    getIncomeRecords
} = require('./controllers/incomecontroller');
const router=express.Router();

router.post('/', createIncomeRecord);
router.get('/', getIncomeRecords);

module.exports=router;