require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const bodyparser = require('body-parser');
const connectDB = require('./server/config/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookies = require('cookies');
const cookieparser = require('cookie-parser');
const port = process.env.PORT;

app.use(cookieparser());
app.use(bodyparser.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,'server','public')));
app.set('views','./server/views');
app.set('view engine','ejs');

app.use('/',require('./server/routes/HomeRouter'));
app.use('/check-in',require('./server/routes/HomeRouter'));
app.use('/admin',require('./server/routes/AdminRouter'));

connectDB();
app.listen(port,()=>{
    console.log('listening post runng is on '+port);
});
