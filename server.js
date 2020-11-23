const config = require('config');
const express=require('express');
const connectDB = require('./config/db');


const app=express();
connectDB();
// init middleware
app.use(express.json({extended:false}));
app.get('/', (req,res)=>{res.send("Hi MERN Stack World")});

//define rout
app.use('/api/users',require('./routes/api/users'));
app.use('/api/post',require('./routes/api/post'));
app.use('/api/auth',require('./routes/api/auth'));
app.use('/api/profile',require('./routes/api/profile'));

const PORT= process.env.PORT || 5000; 

app.listen(PORT,() => console.log(`Server is running on port ${PORT}`));