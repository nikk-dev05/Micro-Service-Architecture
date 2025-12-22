const express = require("express");

const authRoutes = require("./routes/auth.routes");
const productRoutes = require("./routes/product.routes");
const orderRoutes = require("./routes/order.routes");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use( authRoutes);
app.use("/product", productRoutes);
app.use("/order", orderRoutes);

app.listen(3000, () => {
  console.log("API Gateway running on port 3000");
});
