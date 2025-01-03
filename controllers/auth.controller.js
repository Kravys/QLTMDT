require('dotenv').config();
const authService = require('../services/auth.service');
const register = async (req, res) => {
    try {
        const newUser = await authService.registerUser(req.body);
        res.status(201).json({ message: 'User registered successfully', user: newUser });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const { token, user } = await authService.loginUser(email, password);
        res.status(200).json({ message: 'Login successful', token, user });
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
};

module.exports = { register, login };
