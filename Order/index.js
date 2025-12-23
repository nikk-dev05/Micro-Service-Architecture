const express = require('express');
const app = express();
const connectDB = require('./db/db.js');
const route = require('./Routes/route.js');
const { connectRabbitMQ } = require('./rabbitmq'); 
app.use(express.json());
app.use(express.urlencoded({extended:true}))
  const call =  async () => {
  await connectDB();
  await connectRabbitMQ(); 
  app.use(route);

  app.listen(3003, () => {
    console.log("Order service running on 3003");
  });
}
call();