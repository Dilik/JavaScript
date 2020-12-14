//require Express, execute it, and get the abolute path, and requiring mongoose
const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const AppError = require('./AppError');

//database schema and model in seperate folder
const Product = require('./models/product');

//Installing this package allows to use Patch, Put .. etc  requests  
const methodOverride = require('method-override')

//test connection to mongoDB
mongoose.connect('mongodb://localhost:27017/farmStand', {useNewUrlParser: true, useUnifiedTopology: true })
.then(()=>{
    console.log("MONGO Connection Established !!!");
})
.catch(err=>{
    console.log("Cannot Connect to MONGO: ", err);
})

//set absolute path to views folder, and use ejs engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: true})); //middleware ot parse req.body IOT post
app.use(methodOverride('_method')) //supports PATCH, PUT ... etc requests

//categories to pass dynamically
const categories = ['fruit', 'vegetable','dairy', 'baked goods'];

//product page finds all product
app.get('/products', async(req, res)=>{
    const { category } = req.query;
    if(category){
        const products = await Product.find({category});
        res.render('products/index', { products, category });
    } else {
        const products = await Product.find({});
        res.render('products/index', { products, category: 'All' });
    }
})

//create new product
app.get('/products/new', (req,res)=>{
    res.render('products/new', {categories});
})
//post the new product
app.post('/products', async(req,res, next)=>{
    try{
        const newProduct = new Product(req.body);
        await newProduct.save();
        res.redirect(`/products/${newProduct._id}`);    
    }catch(e){
        next(e);
    }
    
})

//instead of keep calling try catch to handle error in each function
//why not create wrapAsync funtion that handels all try catch
function wrapAsync(fn){
    return function(req, res, next){
        fn(req, res, next).catch(e => next(e));
    }
}

//creating show page that shows specific product detail
//asyc error must have next parameter passes in order to handle it
app.get('/products/:id', wrapAsync(async(req,res,next)=>{
    const { id } = req.params;
    const product = await Product.findById(id);
    if(!product){
        throw new AppError('Product Not Found', 404);
    }
    res.render('products/show', { product });
}));

//Update: editing the product
app.get('/products/:id/edit', wrapAsync(async(req, res, next)=>{
        const { id } = req.params;
        const product = await Product.findById(id); 
        if(!product){
            throw new AppError('Product Not Found', 404);
        }
        res.render('products/edit', { product, categories });
}));

app.put('/products/:id', async(req, res, next)=>{
    
    try{
        const { id } = req.params;
        const product = await Product.findByIdAndUpdate(id, req.body, {runValidators: true, new: true});
        res.redirect(`/products/${ product._id }`);
    }catch(e){
        next(e);
    }
    
})

//delete product
app.delete('/products/:id', async(req, res, next)=>{
    try{
        const { id } = req.params;
        const deletedProduct = await Product.findByIdAndDelete(id);
        res.redirect('/products')
    }catch(e){
        next(e);
    }
})

//example of handling specific errors in mongoose

const handleValidationErr = err=>{
    console.dir(err);
    return new AppError(`Validation failed ...${err.message}`, 400);
}

app.use((err, req, res, next)=>{
     console.log(err.name);
     if(err.name === 'ValidationError') err = handleValidationErr(err);
     next(err);
})

//async error handling
app.use((err,req,res,next)=>{
    const {status = 500, message = 'Something went wrong'} = err;
    res.status(status).send(message);
})

//port 300 is listening requests and responses
app.listen(3000, ()=>{
    console.log("Listening Port 3000");
})