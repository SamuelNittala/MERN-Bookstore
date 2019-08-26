const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 5000;

/* MONGODB CONNECTION*/

const uri = process.env.ATLAS_URI;

mongoose.connect(uri, { useNewUrlParser : true, useCreateIndex : true});

const connection = mongoose.connection;

connection.once('open',()=>{
    console.log('MongoDB connection successful');
})

/* MONGODB CONNECTION SUCCESSFUL */

/* Importing Route files */
const bookRt = require('./routes/book');
const userRt = require('./routes/user');
//const purchaseRt = require('./routes/purchase');

//Adding routes to Express

app.use('/books',bookRt);
app.use('/user',userRt);
//app.use('/purchase',purchaseRt);



app.listen(port,()=>{
    console.log(`Listening on port ${port}`);
})



