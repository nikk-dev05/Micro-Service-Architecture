const express = require('express');
const router =  express.Router();
const {createUser,LoginUser} = require('../UserController/controller.js');

router.post('/create',createUser);
router.post('/login',LoginUser);
module.exports = router;