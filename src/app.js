const express=require('express');
const cors=require('cors');
const helmet=require('helmet');
const morgan=require('morgan');
require('dotenv').config();

const incomeRoutes=require('./routes/incomeRoutes');
const apiRateLimiter  = require('./middlewares/rateLimiter');
const notFound = require('./middlewares/notFound');
const errorHandler = require('./middlewares/errorHandler');

const app=express();

app.use(helmet());
app.use(morgan('dev'));

app.use('/api',apiRateLimiter);

app.use(cors({
    origin:'*',
    methods:['GET','POST'],
    allowedHeaders:['Content-Type','Authorization'],

}));
app.use(express.json());


app.use(express.urlencoded({ extended: true }));
app.get('/health',(req,res)=>{
    res.status(200).json({
        message:'Server is running',
        success:true,
    });
});

app.use('/api/income-records', incomeRoutes);
app.use(notFound);
app.use(errorHandler);

module.exports=app;