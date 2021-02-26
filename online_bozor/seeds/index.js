if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const mongoose = require('mongoose')
const Product = require('../models/product');
const dbUrl = process.env.DB_URL || 'mongodb://localhost:27017/anyBay';
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers')

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

//populate some camp names for each location
const sampleName = (array) => array[Math.floor(Math.random() * array.length)];
const categories = ['furnitures', 'cars', 'baked items', 'vitamins', 'cell-phones', 'electronics', 'toys',
    'food', 'laptops', 'other'
]
const conditions = ['new', 'used-like new', 'used-good', 'used-fair']
const seedDB = async() => {
    await Product.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const product = new Product({
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            name: `${sampleName(descriptors)} ${sampleName(places)}`,
            price: price,
            author: '6032f033e6a3383226070bac',
            description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Qui beatae eveniet cumque illum reiciendis non assumenda totam facere? Eaque suscipit a sequi eveniet nesciunt nulla quibusdam magnam accusamus nihil expedita!",
            category: `${sampleName(categories)}`,
            condition: `${sampleName(conditions)}`,
            tags: `${sampleName(categories)}`,
            image: 'https://source.unsplash.com/collection/9900551'

        })
        await product.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})