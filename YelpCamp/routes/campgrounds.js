const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const Campground = require('../models/campground');
const {isLoggedIn, isAuthor, validateCampground} = require('../middleware');

//display all campgrounds
router.get('/', catchAsync(async(req,res)=>{
    const campgrounds = await Campground.find({});
    res.render('campgrounds/index', { campgrounds } );
}));

//create new camp, it requires get and post method
router.get('/new',isLoggedIn, (req,res)=>{
    res.render('campgrounds/new');
})
//now post the new camp
router.post('/', isLoggedIn, validateCampground, catchAsync(async(req,res)=>{
    const campground = new Campground(req.body.campground);
    campground.author = req.user._id;
    await campground.save();
    req.flash('success', 'Successfully Created New Campground');
    res.redirect(`/campgrounds/${campground._id}`);
}))

//showpage for specific camp ground
router.get('/:id', catchAsync(async(req,res)=>{
    const campground = await Campground.findById(req.params.id)
        .populate({
            path:'reviews',
            populate: {
                path:'author'
            }
        }).populate('author');
    console.log(campground);
    if(!campground){
        req.flash('error', 'Cannot find the campground');
        return res.redirect('/campgrounds');
    }
    res.render('campgrounds/show', {campground});
}));

//IOT edit the campground, we need a form route to edit
//and then post the edited from for update
router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(async(req,res)=>{
    const {id} = req.params;
    const campground = await Campground.findById(id);
    if(!campground){
        req.flash('error', 'Cannot find the campground');
        return res.redirect('/campgrounds');
    }
    res.render('campgrounds/edit', {campground});
}));
router.put('/:id', isLoggedIn, isAuthor, validateCampground, catchAsync(async(req,res)=>{
    const {id} = req.params;
    const campground = await Campground.findByIdAndUpdate(id, {...req.body.campground});
    req.flash('success', 'Successfully Updated Campground')
    res.redirect(`/campgrounds/${campground._id}`);
}));

//delete the campground
router.delete('/:id', isLoggedIn, isAuthor, catchAsync(async(req,res)=>{
    const {id} = req.params;
    const campground = await Campground.findById(id);
    await Campground.findByIdAndDelete(id);
    req.flash('success', 'Successfully deleted campground');
    res.redirect('/campgrounds');
}));

module.exports = router;