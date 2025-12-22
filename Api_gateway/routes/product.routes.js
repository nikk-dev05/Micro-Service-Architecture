const express = require("express");
const router = express.Router();
const productService = require("../services/product.service");

router.get("/", productService.getProducts);
router.get("/:id", productService.getProductById);
router.post("/create", productService.createProduct);
router.put("/update/:id", productService.updateProduct);
router.delete("/delete/:id", productService.deleteProduct);

module.exports = router;
