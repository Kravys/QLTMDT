const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db'); 
const Order =require('../models/order.model');
const Product = require('../models/product.model');
const OrderItems = sequelize.define('order_items', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    order_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    product_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references :{
            model: Product,
            key : 'id'
        },
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    }
});
module.exports = OrderItems; 