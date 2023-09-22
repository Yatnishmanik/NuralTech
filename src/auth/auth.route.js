const express = require('express');
const router= express.Router();

const {register,login}= require('./auth.controller');

router.post('/sigup',register);
router.post('/login',login);

module.exports= router;

