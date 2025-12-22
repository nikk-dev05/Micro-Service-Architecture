const express = require('express');
const router = express.Router();
const{createProduct,updateProduct,deleteProduct,getProducts,getProductsbyId} = require('../Productcontroller/productcontroller.js');
;
const auth = require('../Middlewares/auth.js');
router.get("/products",getProducts);
router.get("/products/:id",getProductsbyId);
router.post("/create",auth,createProduct);
router.put("/update/:id",auth,updateProduct);
router.delete("/delete/:id",auth,deleteProduct);

module.exports = router