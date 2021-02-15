if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}
const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const dbUrl = process.env.DB_URL || 'mongodb://localhost:27017/anyBay';
const methodOverride = require('method-override');
const ejsMate = require('ejs-mate');
const ExpressError = require('./util/ExpressError');
const products = require('./routes/products');
const reviews = require('./routes/reviews');

const categories = ['', 'furnitures', 'cars', 'baked items', 'vitamins', 'cell-phones', 'electronics', 'toys',
    'food', 'laptops', 'other'
];

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

app.set('views', path.join(__dirname, 'views'));
app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true })); //this will help to parse datat from form
app.use(methodOverride('_method'));

app.use('/products', products);
app.use('/products/:id/reviews', reviews);

app.get('*', (req, res, next) => {
    next(new ExpressError('Page Not Found', 404))
})

app.use((err, req, res, next) => {
    const { status = 505 } = err;
    if (!err) err.message = 'Something Went Wrong';
    res.status(status).render('error', { err, categories });
})

const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`Serving at port ${port}`);
})