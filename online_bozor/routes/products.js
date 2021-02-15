const express = require('express')
const router = express.Router();
const catchAsync = require('../util/catchAsync');
const ExpressError = require('../util/ExpressError');
const Product = require('../models/product');
const { productSchema } = require('../schema');

const categories = ['', 'furnitures', 'cars', 'baked items', 'vitamins', 'cell-phones', 'electronics', 'toys',
    'food', 'laptops', 'other'
];
const conditions = ['', 'new', 'used-like new', 'used-good', 'used-fair'];

const validateProduct = (req, res, next) => {
    const { error } = productSchema.validate(req.body);

    if (error) {
        const msg = error.details.map(el => el.message).join(',');
        throw new ExpressError(msg, 400);
    } else {
        next();
    }
}

router.get('/', catchAsync(async(req, res) => {
    const { category } = req.query

    if (category) {
        const products = await Product.find({ category });
        res.render('products/index', { products, categories, category });
    } else {
        const products = await Product.find({});
        res.render('products/index', { products, categories, category: 'All' });
    }
}))

router.post('/', validateProduct, catchAsync(async(req, res, next) => {
    const newProduct = new Product(req.body.product);
    await newProduct.save();
    res.redirect(`products/${newProduct._id}`)
}))

router.get('/new', (req, res) => {
    res.render('products/new', { categories, conditions });
})

router.get('/:id', catchAsync(async(req, res) => {
    const product = await Product.findById(req.params.id).populate('reviews');
    res.render('products/show', { product, categories })
}))

router.get('/:id/edit', catchAsync(async(req, res) => {
    const product = await Product.findById(req.params.id);
    res.render('products/edit', { product, categories, conditions });
}))

router.put('/:id', validateProduct, catchAsync(async(req, res) => {
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, {...req.body.product });
    res.redirect(`/products/${product._id}`);
}))

router.delete('/:id', catchAsync(async(req, res) => {
    const { id } = req.params;
    await Product.findByIdAndDelete(id);
    res.redirect('/products');
}))

module.exports = router;