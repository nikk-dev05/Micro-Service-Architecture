const ordermodel = require('../Models/model.js');
const { getChannel } = require('../rabbitmq');

const createorder = async (req,res)=>{
    try{
                 const { productId, quantity,price } = req.body;

    if (!productId || !quantity||!price) {
      return res.status(400).json({ message: "productId ,price and quantity are required" });
    }

   
    const order = await ordermodel.create({
      userId: req.userId,
      products: [
        {
          productId,
          quantity,
          priceAtPurchase: price
        }
      ],
      totalAmount:price * quantity
    });
     const channel = getChannel();
    const queue = "order_queue";

    await channel.assertQueue(queue);
    channel.sendToQueue(
      queue,
      Buffer.from(JSON.stringify({
        orderId: order._id,
        productId,
        quantity
      }))
    );

    console.log("Order message sent to Product Service");


    res.status(201).json(order);

    }
    catch(error){
        res.status(500).json({
            message:"Internal server error"
        })
        console.log(error);
    }
}
const getorder = async (req,res)=>{
    try{
             const orders = await ordermodel.find({ userId: req.userId });
               res.status(200).json(orders);
    }
    catch(error){
        res.status(500).json({
            message:"Internal server error"
        })
        console.log(error);
    }
}
const getorderbyId = async (req,res)=>{
    try{
      const order = await ordermodel.findById(req.params.id);
    if (!order) return res.status(404).json({ message: "Order not found" });

    if (order.userId !== req.userId) {
      return res.status(403).json({ message: "Forbidden" });
    }
    res.status(200).send(order);
}
    catch(error){
        res.status(500).json({
            message:"Internal server error"
        })
        console.log(error);
    }
}
module.exports ={
    createorder,
    getorder,
    getorderbyId
}