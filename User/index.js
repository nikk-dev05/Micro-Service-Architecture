const express = require('express');
const app = express();
const connectDB = require('./db/db.js');
const route = require('./Routes/routes.js');
app.use(express.json());
app.use(express.urlencoded({extended:true}));
connectDB();
app.use(route);
app.listen(3001);