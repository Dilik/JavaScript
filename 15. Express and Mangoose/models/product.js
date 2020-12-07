const mongoose = require('mongoose');

//Skeleton of product that will be saved in DB
const productSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true,
        min: 0
    },
    category:{
        type: String,
        lowercase: true,
        enum: ['fruit', 'vegetable', 'dairy']
    }
});

//creating the Product model based on Schema
const Product = new mongoose.model('Product', productSchema);

//exporting product to be able to use in other folders
module.exports = Product;