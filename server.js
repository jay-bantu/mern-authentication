require('dotenv').config({path:"./config.env"});
const express = require('express');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/error');



//connect db
connectDB();


const app = express();

app.use(express.json());

app.use('/api/auth', require('./routes/auth'));
app.use('/api/private', require('./routes/private'));

//error handler should be the last piece of middleware

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

server = app.listen(PORT, () => {
    console.log(`App running on port ${PORT}`);
    process.on('unhandledRejection', (err, promise)=>{
        console.log(`Logged Error: ${err} `);
        server.close(()=> process.exit(1));
    })
});