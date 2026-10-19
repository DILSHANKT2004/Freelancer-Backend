const app=require('./app');
const { pool, initializeDatabase } = require('./config/db');
require('dotenv').config();

const PORT=Number(process.env.PORT) || 5000;
const startServer=async()=>{
    try{
        await initializeDatabase();
        const connection=await pool.getConnection();
        console.log('Database connected successfully');
        connection.release();

        app.listen(PORT,()=>{
            console.log('Successfully connected to the server');
        });
    }
    catch(error){
        console.error('Error:', error.message);
        process.exit(1);
    }
}
startServer();