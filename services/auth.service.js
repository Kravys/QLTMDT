const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const registerUser = async (userData) => {
    const { email, password, username } = userData;

   console.log(userData)
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
        throw new Error('Email already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
  
    return await User.create({
        email,
        password: hashedPassword,
        username,
    });
};

const loginUser = async (email, password) => {
    
    const user = await User.findOne({ where: { email } });
    if (!user) {
        throw new Error('Invalid email or password');
    }

    
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        throw new Error('Invalid email or password');
    }

    
    const token = jwt.sign(
        { id: user.id, email: user.email, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: '1d' }
    );

    return { token, user };
};

module.exports = { registerUser, loginUser };
