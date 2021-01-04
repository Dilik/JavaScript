const express = require('express');
const app = express();
const path = require('path');
const ejsMate = require('ejs-mate');
const session = require('express-session');
const Joi = require('joi');
const ExpressError = require('./utils/ExpressError');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const { urlencoded } = require('express');
const campgrounds = require('./routes/campgrounds');
const reviews = require('./routes/reviews');
const flash = require('connect-flash');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useCreateIndex: true, 
    useUnifiedTopology: true,
    useFindAndModify: false
})

//check db conncetion
const db = mongoose.connection; 
db.on("error", console.error.bind(console,"connection error:"));
db.once("open", ()=>{
    console.log("Database Connected");
});

app.engine('ejs', ejsMate); //helps to boilerplate template
app.set('view engine', 'ejs'); //use ejs template
app.set('views', path.join(__dirname, 'views')); //get the view folder path
app.use(express.urlencoded({ extended: true})); //helps to parse req.body
app.use(methodOverride('_method')); //_method is variable to query other req methods
app.use(express.static(path.join(__dirname, 'public'))); // be able to use public folder in boilerplate

const sessionConfig = {
    secret: 'thisshouldbebettersecret',
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        expires: Date.now()+ 1000 * 60 * 60 * 24 * 7, 
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}

app.use(session(sessionConfig));
app.use(flash());

//middleware to have access flash messages on template
app.use((req, res, next)=>{
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
})

app.use('/campgrounds', campgrounds);
app.use('/campgrounds/:id/reviews', reviews);

app.get('/', (req,res)=>{
    res.render('home');
});

//if nothing matched above  
app.all('*', (req, res, next)=>{
    next(new ExpressError('Page Not Found', 404));
})

//error handling
app.use((err, req, res, next)=>{
    const {status = 505} = err;
    if(!err) err.message = 'Something went wrong';
    res.status(status).render('error', {err});
})

app.listen(3000, ()=>{
    console.log('Serving on port 3000');
});