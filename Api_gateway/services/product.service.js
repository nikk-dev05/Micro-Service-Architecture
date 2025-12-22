const axios = require("axios");
const PRODUCT_SERVICE = "http://localhost:3002";

const forwardHeaders = (req) => ({
  headers: { Authorization: req.headers.authorization }
});

exports.getProducts = async (req, res) => {
  const r = await axios.get(`${PRODUCT_SERVICE}/products`);
  res.json(r.data);
};

exports.getProductById = async (req, res) => {
  const r = await axios.get(`${PRODUCT_SERVICE}/products/${req.params.id}`);
  res.json(r.data);
};

exports.createProduct = async (req, res) => {
  
  const r = await axios.post(
    `${PRODUCT_SERVICE}/create`,
    req.body,
    forwardHeaders(req)
   
  );
    res.json(r.data);


};

exports.updateProduct = async (req, res) => {
  const r = await axios.put(
    `${PRODUCT_SERVICE}/update/${req.params.id}`,
    req.body,
    forwardHeaders(req)
  );
  res.json(r.data);
};

exports.deleteProduct = async (req, res) => {
  const r = await axios.delete(
    `${PRODUCT_SERVICE}/delete/${req.params.id}`,
    forwardHeaders(req)
  );
  res.json(r.data);
};
