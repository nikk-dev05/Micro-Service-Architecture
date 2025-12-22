const amqp = require("amqplib");

const RABBITMQ_URL = "amqp://localhost:5672";

let channel;

async function connectRabbitMQ() {
  const connection = await amqp.connect(RABBITMQ_URL);
  channel = await connection.createChannel();
  console.log("RabbitMQ connected");
}
function getChannel(){
    return channel;
}

module.exports = { connectRabbitMQ, getChannel };
