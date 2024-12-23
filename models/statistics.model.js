const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db'); 

const Statistics = sequelize.define('statistics', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    product_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    sold_count: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    total_revenue:{
        type: DataTypes.DECIMAL(10,2),
        allowNUll: true
    },
    last_sold:{
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: Sequelize.NOW
    }
}, {
    timestamps: true
});
module.exports = Statistics;