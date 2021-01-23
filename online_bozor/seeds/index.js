if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const mongoose = require('mongoose');
const Product = require('../models/product');
const dbUrl = process.env.DB_URL || 'mongodb://localhost:27017/anyBay';

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

const seedProducts = [
    {
        name: 'Workout Resistance Band',
        price: 10,
        description: 'Awsome workout bands, I have bough extra no need anymore',
        condition: 'used-like new',
        category: 'workout'
    }, 
    {
        name: 'Coffee Cup',
        price: 10,
        description: 'Coffee cup with efile tower picture on it',
        condition: 'new',
        category: 'kitchen applience'
    },
    {
        name: 'Calcium Vitamin',
        price: 20,
        description: 'Natural Vitamin product herbal non gmo',
        condition: 'new',
        category: 'Supplements',
        tags: ['supplements', 'vitamin', 'calcium C']
    }
]

Product.insertMany(seedProducts)
    .then(p => console.log(p))
    .catch(e => console.log(e));