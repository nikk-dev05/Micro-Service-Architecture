const axios = require("axios");

const AUTH_SERVICE = "http://localhost:3001";

exports.register = async (req, res) => {
  try {
    const response = await axios.post(`${AUTH_SERVICE}/create`, req.body);
    res.status(response.status).json(response.data);
  } catch (err) {
    res.status(500).json({ message: "Auth service error" });
  }
};

exports.login = async (req, res) => {
  try {
    const response = await axios.post(`${AUTH_SERVICE}/login`, req.body);
    res.status(response.status).json(response.data);
  } catch (err) {
    res.status(500).json({ message: "Auth service error" });
  }
};
