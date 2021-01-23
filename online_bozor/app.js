if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}
const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const dbUrl = process.env.DB_URL || 'mongodb://localhost:27017/anyBay';
const Product = require('./models/product');
const methodOverride = require('method-override');

mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})

//check db conncetion
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database Connected");
});

const categories = ['', 'furnitures', 'cars', 'baked items', 'vitamins', 'cell-phones', 'electronics', 'toys',
    'food', 'laptops', 'other'
];
const conditions = ['', 'new', 'used-like new', 'used-good', 'used-fair'];

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true })); //this will help to parse datat from form
app.use(methodOverride('_method'));

app.get('/products', async(req, res) => {
    const products = await Product.find({});
    res.render('products/index', { products });
})

app.post('/products', async(req, res) => {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.redirect(`products/${newProduct._id}`)
})

app.get('/products/new', (req, res) => {
    res.render('products/new', { categories, conditions });
})

app.get('/products/:id', async(req, res) => {
    const product = await Product.findById(req.params.id);
    res.render('products/show', { product })
})

app.get('/products/:id/edit', async(req, res) => {
    const product = await Product.findById(req.params.id);
    res.render('products/edit', { product, categories, conditions });
})

app.put('/products/:id', async(req, res) => {
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body, { runValidators: true, new: true });
    res.redirect(`/products/${product._id}`);
})

app.delete('/products/:id', async(req, res) => {
    const { id } = req.params;
    await Product.findByIdAndDelete(id);
    res.redirect('/products');
})

const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`Serving at port ${port}`);
})