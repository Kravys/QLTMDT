const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db'); 

const User = sequelize.define('users', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true 
    },
    password: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    email: {
        type: DataTypes.STRING(100),
        allowNull: true,
        unique: true 
    },
    role: {
        type: DataTypes.ENUM('admin', 'employee', 'customer'),
        allowNull: false,
        defaultValue: 'customer' 
    },
    status: {
        type: DataTypes.ENUM('active', 'banned'),
        allowNull: false,
        defaultValue: 'active' 
    },
    address: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    phone_number: {
        type: DataTypes.STRING(15),
        allowNull: true
    },
    created_at: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: Sequelize.NOW 
    },
    updated_at: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: Sequelize.NOW,
        onUpdate: Sequelize.NOW 
    }
}, {
    timestamps: false 
});

module.exports = User;
