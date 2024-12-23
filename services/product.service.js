const Product = require('../models/product.model');

const createProduct = async (data) => {
    try {
        const product = new Product(data);
        await product.save();
        return product;
    } catch (error) {
        throw new Error('Error creating product: ' + error.message);
    }
};
const getAllProducts = async () => {
    try {
        const products = await Product.findAll();
        return products;
    } catch (error) {
        throw new Error('Error creating product: ' + error.message);
    }
};
const getProductById = async (id) =>{
    try {
        const product = await Product.findByID(id);
        if(!product){
            throw new Error('Product not found');
        }
        return product;
    } catch (error) {
        throw new Error('Error creating product: ' + error.message);
    }
};
const updateProduct = async (id, data) => {
    try {
        const product = await Product.findByIDAndUpdate(id, data, {new : true});
        if(!product){
            throw new Error('Product not found');
        }
    } catch (error) {
        throw new Error('Error creating product: ' + error.message);
    }
};
const deleteProduct = async (id) => {
    try {
        const product = await Product.findByIDAndDelete(id);
        if (!product) {
            throw new Error('Product not found');
        }
        return product;
    } catch (error) {
        throw new Error('Error deleting product: ' + error.message);
    }
};
const searchProducts = async (query) => {
    try {
        const products = await Product.find({
            $or: [
                { name: { $regex: query, $options: 'i' } },
                { description: { $regex: query, $options: 'i' } },
            ],
        });
        return products;
    } catch (error) {
        throw new Error('Error searching products: ' + error.message);
    }
};

module.exports = {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct,
    searchProducts,
};
