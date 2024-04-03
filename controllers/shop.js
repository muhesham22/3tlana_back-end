const Product = require('../models/product');
const Order = require('../models/order');

exports.getproducts = async (req, res, next) => {
    try {
        const products = await Product.find();
        res.status(200).json({ products });

    } catch (error) {
        console.log(error);
    }
};

exports.getOneproduct = async (req,res,next)=>{
    try {
        const prodId = req.params.productId;
        const product =await Product.findById(prodId);
        res.status(200).json({product});

    } catch (error) {
        console.log(error);
    }
}