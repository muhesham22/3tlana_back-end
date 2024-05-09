const Product = require('../models/product');
const Order = require('../models/order');

exports.getproducts = async (req, res, next) => {
    try {
        const products = await Product.find();
        res.status(200).json({ message: 'products returned', products });

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'internal Server Error' });        
    }
};

exports.getOneproduct = async (req,res,next)=>{
    try {
        const productId = req.params.productId;
        if (!productId || !mongoose.Types.ObjectId.isValid(productId)) {
            return res.status(422).json({ error: 'product id invalid' });
        }
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ error: 'product not found' });
        }
        res.json({ message: 'products returned', product });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'internal Server Error' });
    }
};