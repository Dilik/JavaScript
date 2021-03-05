if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}
const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const ejsMate = require('ejs-mate');
const ExpressError = require('./util/ExpressError');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
const localStrategy = require('passport-local');
const User = require('./models/user');
const mongoSanitize = require('express-mongo-sanitize');
const Product = require('./models/product');
const mongoDBStore = require('connect-mongo').default; //help to store session in mongoDB
const dbUrl = process.env.DB_URL || 'mongodb://localhost:27017/anyBay';

const categories = ['', 'Apparel & Accessorires', 'Style & Fashion', 'Home & Garden', 'Sporting Goods', 'Health & Wellness', 'Medical Health', 'Kids & Infants', 'Pets & Pet Supplies',
    'Electronics', 'Home Improvement', 'Services', 'Other Categories'
];


const productRoutes = require('./routes/products');
const reviewRoutes = require('./routes/reviews');
const userRoutes = require('./routes/users');


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

const secret = process.env.SECRET || 'thisshouldbebettersecret'

const sessionConfig = {
    store: mongoDBStore.create({mongoUrl: dbUrl}),
    touchAfter: 24*60*60,
    secret,
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}

app.use(session(sessionConfig));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
})

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true })); //this will help to parse datat from form
app.use(methodOverride('_method'));
app.use(mongoSanitize({
    replaceWith: '_'
}));

app.use('/', userRoutes);
app.use('/products', productRoutes);
app.use('/products/:id/reviews', reviewRoutes);

app.get('/', async (req, res) => {
    const { category } = req.query

    if (category) {
        const products = await Product.find({ category });
        res.render('products/index', { products, categories, category });
    } else {
        res.render('home', { categories });
    }
});

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