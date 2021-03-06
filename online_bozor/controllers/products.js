const Product = require('../models/product');
const { cloudinary } = require('../cloudinary');

const categories = ['', 'Apparel and Accessorires', 'Style and Fashion', 'Home and Garden', 'Sporting Goods', 'Health and Wellness', 'Medical Health', 'Kids and Infants', 'Pets and Pet Supplies',
'Electronics', 'Home Improvement', 'Services', 'Other Categories'
];
const conditions = ['', 'new', 'used-like new', 'used-good', 'used-fair'];

module.exports.index = async (req, res) => {
    const { category } = req.query

    if (category) {
        const products = await Product.find({ category });
        res.render('products/index', { products, categories, category });
    } else {
        const products = await Product.find({});
        res.render('products/index', { products, categories, category: 'All Products' });
    }
}

module.exports.newProductForm = (req, res) => {
    res.render('products/new', { categories, conditions });
}

module.exports.createNewProduct = async (req, res, next) => {
    const newProduct = new Product(req.body.product);
    newProduct.images = req.files.map(f => ({ url: f.path, filename: f.filename }));
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
    const imgs = req.files.map(f => ({ url: f.path, filename: f.filename }));
    product.images.push(...imgs);
    await product.save();
    if(req.body.deleteImages){
        for(let filename of req.body.deleteImages){
            await cloudinary.uploader.destroy(filename);
        }
        await product.updateOne({ $pull: { images: { filename: { $in: req.body.deleteImages } } } });
    }
    req.flash('success', 'Successfully updated a product');
    res.redirect(`/products/${product._id}`);
}

module.exports.deleteProduct = async (req, res) => {
    const { id } = req.params;
    const product = await Product.findById(id);
    product.images.forEach(async(img)=>{
        await cloudinary.uploader.destroy(img.filename);
    })
    await Product.findByIdAndDelete(id);
    req.flash('success', 'Successfully deleted a product');
    res.redirect('/products');
}