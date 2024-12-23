const productService = require('../services/product.service');
const createProduct = async (req, res) => {
    try {
        const product = await productService.createProduct(req.body);
        res.status(201).json({ message: 'Product created successfully', product });
        if (req.user.role !== 'admin' && req.user.role !== 'employee') {
            return res.status(403).json({ message: 'No permission.' });
        }
      
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getAllProducts = async (req, res) => {
    try {
        const products = await productService.getAllProducts();
        res.status(200).json( products );
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getProductById = async (req, res) => {
    try {
        const product = await productService.getProductById(req.params.id);
        res.status(200).json({ product });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

const updateProduct = async (req, res) => {
    try {
        const product = await productService.updateProduct(req.params.id, req.body);
        res.status(200).json({ message: 'Product updated successfully', product });
        if (req.user.role !== 'admin' && req.user.role !== 'employee') {
            return res.status(403).json({ message: 'No permission.' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const deleteProduct = async (req, res) => {
    try {
        await productService.deleteProduct(req.params.id);
        res.status(200).json({ message: 'Product deleted successfully' });
        if (req.user.role !== 'admin' && req.user.role !== 'employee') {
            return res.status(403).json({ message: 'No permission.' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const searchProducts = async (req, res) => {
    try {
        const products = await productService.searchProducts(req.query.q);
        res.status(200).json({ products });
    } catch (error) {
        res.status(400).json({ message: error.message });
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
