const express = require('express');
const app = express();
const path = require('path');
const ejsMate = require('ejs-mate');
const Joi = require('joi');
const {campgroundSchema, reviewSchema} = require('./schemas.js');
const catchAsync = require('./utils/catchAsync');
const ExpressError = require('./utils/ExpressError');
const mongooose = require('mongoose');
const methodOverride = require('method-override');
const Campground = require('./models/campground');
const Review = require('./models/review');
const { urlencoded } = require('express');

mongooose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useCreateIndex: true, 
    useUnifiedTopology: true
})

//check db conncetion
const db = mongooose.connection; 
db.on("error", console.error.bind(console,"connection error:"));
db.once("open", ()=>{
    console.log("Database Connected");
});

app.engine('ejs', ejsMate); //helps to boilerplate template
app.set('view engine', 'ejs'); //use ejs template
app.set('views', path.join(__dirname, 'views')); //get the view folder path
app.use(express.urlencoded({ extended: true})); //helps to parse req.body
app.use(methodOverride('_method')); //_method is variable to query other req methods

const validateCampground = (req, res, next)=>{
    const { error } = campgroundSchema.validate(req.body);
    if(error){
        const msg = error.details.map(el=> el.message).join(',');
        throw new ExpressError(msg, 400);
    }else{
        next();
    }
}

const validateReview = (req, res, next)=>{
    const { error } = reviewSchema.validate(req.body);
    if(error){
        const msg = error.details.map(el=> el.message).join(',');
        throw new ExpressError(msg, 400);
    }else{
        next();
    }
}

app.get('/', (req,res)=>{
    res.render('home');
});

//display all campgrounds
app.get('/campgrounds', catchAsync(async(req,res)=>{
    const campgrounds = await Campground.find({});
    res.render('campgrounds/index', { campgrounds } );
}));

//create new camp, it requires get and post method
app.get('/campgrounds/new', (req,res)=>{
    res.render('campgrounds/new');
})
//now post the new camp
app.post('/campgrounds', validateCampground, catchAsync(async(req,res)=>{
    const campground = new Campground(req.body.campground);
    await campground.save();
    res.redirect(`/campgrounds/${campground._id}`);
}))

//showpage for specific camp ground
app.get('/campgrounds/:id', catchAsync(async(req,res)=>{
    const campground = await Campground.findById(req.params.id).populate('reviews');
    res.render('campgrounds/show', {campground});
}));

//IOT edit the campground, we need a form route to edit
//and then post the edited from for update
app.get('/campgrounds/:id/edit', catchAsync(async(req,res)=>{
    const campground = await Campground.findById(req.params.id);
    res.render('campgrounds/edit', {campground});
}));
app.put('/campgrounds/:id',validateCampground, catchAsync(async(req,res)=>{
    const {id} = req.params;
    const campground = await Campground.findByIdAndUpdate(id, {...req.body.campground});
    res.redirect(`/campgrounds/${campground._id}`);
}));

//delete the campground
app.delete('/campgrounds/:id', catchAsync(async(req,res)=>{
    const {id} = req.params;
    await Campground.findByIdAndDelete(id);
    res.redirect('/campgrounds');
}));

//review route
app.post('/campgrounds/:id/reviews', validateReview, catchAsync(async(req, res)=>{
    const campground = await Campground.findById(req.params.id);
    const review = new Review(req.body.review);
    campground.reviews.push(review);
    await review.save();
    await campground.save();
    res.redirect(`/campgrounds/${campground._id}`);
}));

//delete review
app.delete('/campgrounds/:id/reviews/:reviewId', catchAsync(async(req, res)=>{
    const { id, reviewId } = req.params;
    await Campground.findByIdAndUpdate(id, {$pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    res.redirect(`/campgrounds/${id}`);
}));

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