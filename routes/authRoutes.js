const express = require('express');
const authRouter =express.Router();
const auth = require('../middleware/auth');
const { userRegister, userLogin, userInfo } = require('../controllers/authControllers');


authRouter.post('/api/register',userRegister);  
authRouter.post('/api/login',userLogin);  
authRouter.get('/api/info',auth,userInfo);

module.exports = authRouter;