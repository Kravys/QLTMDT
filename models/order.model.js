const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('../models/user.model')
const OrderItem = require('../models/orderItem.model');
const Order = sequelize.define('orders', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references :{
            model : User,
            key : 'id'
        },
    },
    total_price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    payment_method: {
        type: DataTypes.ENUM('COD', 'credit_card'),
        allowNull: true,
        defaultValue: 'COD' 
    },
    delivery_status: {
        type: DataTypes.ENUM('pending', 'shipped', 'delivered', 'cancelled'),
        allowNull: false,
        defaultValue: 'pending'
    },
    address: {
        type: DataTypes.TEXT,
        allowNull: true,
        
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: Sequelize.NOW
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: Sequelize.NOW,
        onUpdate: Sequelize.NOW 
    }
}, {
    tableName: 'orders',
    timestamps: false
});
// Order.hasMany(OrderItem, { foreignKey: 'order_id' });
// OrderItem.belongsTo(Order, { foreignKey: 'order_id' });
Order.hasMany(OrderItem, { foreignKey: 'order_id', as: 'orderItems' });
OrderItem.belongsTo(Order, { foreignKey: 'order_id' });

module.exports = Order;
