const { getChannel } = require("../rabbitmq");
const productmodel = require("../Models/models");

const consumeOrderQueue = async () => {
  const channel = getChannel();
  const queue = "order_queue";

  await channel.assertQueue(queue);

  channel.consume(queue, async (msg) => {
    if (msg) {
      const { productId, quantity } = JSON.parse(msg.content.toString());

      await productmodel.findByIdAndUpdate(productId, {
        $inc: { stock: -quantity }
      });

      channel.ack(msg);
      console.log("Stock updated for product:", productId);
    }
  });
};

module.exports = { consumeOrderQueue };
