//importing product.js
//this seeds.js is for putting some initial data to our databse
const mongoose = require('mongoose');
const Product = require('./models/product');

//connecting to farmStand database. 
// if it doesn't exsist it will create one in pluralizes the name
mongoose.connect('mongodb://localhost:27017/farmStand', {useNewUrlParser: true, useUnifiedTopology: true })
    .then(()=>{
        console.log("MONGO Connection Established !!!");
    })
    .catch(err=>{
        console.log("Cannot Connect to MONGO: ", err);
    })

// const p = new Product({
//     name: 'Green Grape Fruit', 
//     price: 1.99,
//     category: 'fruit'
// })

// p.save().then(p=>{
//         console.log(p)
//     })
//     .catch(err => {
//         console.log(err)
//     })

const seedProducts = [
    {
        name: 'Apple',
        price: 2.19,
        category: 'fruit'
    },
    {
        name: 'Carrot',
        price: 2.99,
        category: 'vegetable'
    },
    {
        name: 'Milk',
        price: 1.99,
        category: 'dairy'
    },
    {
        name: '10 Year Aged Cheese',
        price: 7.99,
        category: 'dairy'
    },
    {
        name: 'Cabbage',
        price: 4.99,
        category: 'vegetable'
    },
    {
        name: 'pomegranate',
        price: 6.99,
        category: 'fruit'
    }
]

//insertMany doesn't need to call save() it saves automatically
Product.insertMany(seedProducts)
    .then(res => {
        console.log(res);
    })
    .catch(err=>{
        console.log(err);
    })