const express = require('express');
const app = require('./config/app');
const db = require('./config/db');

const Product = require('./models/product.model');
const Statistics = require('./models/statistics.model');

Product.hasOne(Statistics, { foreignKey: 'product_id', as: 'statistics' });
Statistics.belongsTo(Product, { foreignKey: 'product_id', as: 'product' });


db.sync().then(() => console.log('DB Connected'));
app.listen(3000, () => console.log('Server running on port 3000'));
