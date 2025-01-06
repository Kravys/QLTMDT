const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db'); 

const Product = sequelize.define('products', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        validate:{
            min: 0,
            isDecimal : true
        }
    },
    quantity: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        validate:{
            min:0
        }
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    image_url: {
        type: DataTypes.STRING,
        allowNull: true
    },
    category: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
    },
    updated_by: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    created_by: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    status: {
        type: DataTypes.ENUM('available','out_of_stock'),
        allowNull: false,
        defaultValue: 'available',
        validate :{
            isIn : [['available','out_of_stock']]
        }
    }
}, {
    timestamps: false,
    hook:{
        beforeUpdate: (product)=>{
            if (product.quantity === 0){
                product.status = 'out_of_stock'
            }
        }
    }
});


module.exports = Product;
