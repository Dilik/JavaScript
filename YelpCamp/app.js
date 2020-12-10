const express = require('express');
const app = express();
const path = require('path');
const ejsMate = require('ejs-mate');
const mongooose = require('mongoose');
const methodOverride = require('method-override');
const Campground = require('./models/campground');
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

app.engine('ejs', ejsMate);
app.set('view engine', 'ejs'); 
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true})); //helps to parse req.body
app.use(methodOverride('_method')); //_method is variable to query other req methods

app.get('/', (req,res)=>{
    res.render('home');
});

//display all campgrounds
app.get('/campgrounds', async(req,res)=>{
    const campgrounds = await Campground.find({});
    res.render('campgrounds/index', { campgrounds } );
});

//create new camp, it requires get and post method
app.get('/campgrounds/new', (req,res)=>{
    res.render('campgrounds/new');
})
//now post the new camp
app.post('/campgrounds', async(req,res)=>{
    const campground = new Campground(req.body.campground);
    await campground.save();
    res.redirect(`/campgrounds/${campground._id}`);
})

//display specific camp ground
app.get('/campgrounds/:id', async(req,res)=>{
    const campground = await Campground.findById(req.params.id);
    res.render('campgrounds/show', {campground});
});

//IOT edit the campground, we need a form route to edit
//and then post the edited from for update
app.get('/campgrounds/:id/edit', async(req,res)=>{
    const campground = await Campground.findById(req.params.id);
    res.render('campgrounds/edit', {campground});
});
app.put('/campgrounds/:id', async(req,res)=>{
    const {id} = req.params;
    const campground = await Campground.findByIdAndUpdate(id, {...req.body.campground});
    res.redirect(`/campgrounds/${campground._id}`);
})

//delete the campground
app.delete('/campgrounds/:id', async(req,res)=>{
    const {id} = req.params;
    await Campground.findByIdAndDelete(id);
    res.redirect('/campgrounds');
})

app.listen(3000, ()=>{
    console.log('Serving on port 3000');
});