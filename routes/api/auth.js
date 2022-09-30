const express = require('express');
const authRoutes = express.Router();
const AuthController = require('./../../controllers/api/AuthController');

authRoutes.post("/registeruser", AuthController.registerUser);
authRoutes.post("/login", AuthController.loginUser);


module.exports = authRoutes;