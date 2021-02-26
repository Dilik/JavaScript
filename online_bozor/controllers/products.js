const Product = require('../models/product');
const categories = ['', 'furnitures', 'cars', 'baked items', 'vitamins', 'cell-phones', 'electronics', 'toys',
    'food', 'laptops', 'other'
];
const conditions = ['', 'new', 'used-like new', 'used-good', 'used-fair'];

module.exports.index = async (req, res) => {
    const { category } = req.query

    if (category) {
        const products = await Product.find({ category });
        res.render('products/index', { products, categories, category });
    } else {
        const products = await Product.find({});
        res.render('products/index', { products, categories, category: 'All' });
    }
}

module.exports.newProductForm = (req, res) => {
    res.render('products/new', { categories, conditions });
}

module.exports.createNewProduct = async (req, res, next) => {
    const newProduct = new Product(req.body.product);
    newProduct.author = req.user._id;
    await newProduct.save();
    req.flash('success', 'Successfully created new product');
    res.redirect(`products/${newProduct._id}`)
}

module.exports.showProduct = async (req, res) => {
    const product = await Product.findById(req.params.id).populate({
        path: 'reviews',
        populate: {
            path: 'author'
        }
    }).populate('author');
    if (!product) {
        req.flash('error', 'Product not found');
        res.redirect('/products');
    }
    res.render('products/show', { product, categories })
}

module.exports.editForm = async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (!product) {
        req.flash('error', 'Product not found');
        res.redirect('/products');
    }
    res.render('products/edit', { product, categories, conditions });
}

module.exports.updateProduct = async (req, res) => {
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, { ...req.body.product });
    req.flash('success', 'Successfully updated a product');
    res.redirect(`/products/${product._id}`);
}

module.exports.deleteProduct = async (req, res) => {
    const { id } = req.params;
    await Product.findByIdAndDelete(id);
    req.flash('success', 'Successfully deleted a product');
    res.redirect('/products');
}