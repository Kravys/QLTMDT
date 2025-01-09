const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Cart = sequelize.define('Cart', {
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = Cart;
