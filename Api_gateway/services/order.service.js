const axios = require("axios");
const ORDER_SERVICE = "http://localhost:3003";

const forwardHeaders = (req) => ({
  headers: { Authorization: req.headers.authorization }
});

exports.createOrder = async (req, res) => {
  const r = await axios.post(
    `${ORDER_SERVICE}/create`,
    req.body,
    forwardHeaders(req)
  );
  res.json(r.data);
};

exports.getMyOrders = async (req, res) => {
  const r = await axios.get(
    `${ORDER_SERVICE}/getMy`,
    forwardHeaders(req)
  );
  res.json(r.data);
};

exports.getOrderById = async (req, res) => {
  const r = await axios.get(
    `${ORDER_SERVICE}/get/${req.params.id}`,
    forwardHeaders(req)
  );
  res.json(r.data);
};
