const { pool } = require('../config/db');

const createIncomeRecord=async(req,res,next)=>{
try{
    const{month,platform,income,deductions,recordTotal}=req.body;

    if (!month || !platform || income === undefined || deductions === undefined || recordTotal === undefined) {
        return res.status(400).json({
            success: false,
            message: 'Month, platform, income, deductions, and record total are required',
        });
    }

    const insertquery='INSERT INTO income_records (month, platform, income, deductions, record_total) VALUES (?, ?, ?, ?, ?)';
    const values=[month,platform,income,deductions,recordTotal];

    const [result]=await pool.execute(insertquery,[
        month,
        platform,
        income,
        deductions,
        recordTotal
    ]);

    return res.status(201).json({
        success: true,
        message: 'Income record created successfully',
        data:{
        id: result.insertId,
        month,
        platform,
        income,
        deductions,
        recordTotal,
        },
    });
}


catch(error){
    next(error);
}
    
};
const getIncomeRecords=async(req,res,next)=>{
    try{
        const selectQuery=`
            select *
            from income_records
            order by id desc
            `;
                 
       const [rows]=await pool.execute(selectQuery);
       return res.status(200).json({
           success: true,
           data: rows,
           count: rows.length,
       });
    
    }
    catch(error){
        next(error);
    }
};

module.exports={
    createIncomeRecord,
    getIncomeRecords
};