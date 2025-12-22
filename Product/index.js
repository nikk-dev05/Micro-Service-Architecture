const express = require('express');
const app = express();
const connectDB = require('./db/db.js');
const route = require('./Routes/routes.js');
const { connectRabbitMQ } = require('./rabbitmq.js');
const { consumeOrderQueue } = require('./Productcontroller/consumer.js');

(async () => {
  await connectRabbitMQ();      
  await consumeOrderQueue();   
})();
app.use(express.json());
app.use(express.urlencoded({extended:true}))
connectDB();
app.use(route);

app.listen(3002);