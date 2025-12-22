const express = require('express');
const router = express.Router();
const{createorder,getorder,getorderbyId} = require('../Ordercontroller/controller.js');
const auth = require('../Middellwares/auth.js');
router.post('/create',auth,createorder);
router.get('/getMy',auth,getorder);
router.get('/get/:id',auth,getorderbyId);
module.exports = router;