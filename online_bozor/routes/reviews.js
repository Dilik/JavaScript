const express = require('express')
const router = express.Router({ mergeParams: true });
const catchAsync = require('../util/catchAsync');
const ExpressError = require('../util/ExpressError');
const Product = require('../models/product');
const Review = require('../models/review');

const { reviewSchema } = require('../schema');

const validateReview = (req, res, next) => {
    const { error } = reviewSchema.validate(req.body);

    if (error) {
        const msg = error.details.map(el => el.message).join(',');
        throw new ExpressError(msg, 400);
    } else {
        next();
    }
}

router.post('/', validateReview, catchAsync(async(req, res) => {
    const product = await Product.findById(req.params.id);
    const review = new Review(req.body.review);
    product.reviews.push(review);
    await review.save();
    await product.save();
    res.redirect(`/products/${product._id}`);
}))

router.delete('/:reviewId', catchAsync(async(req, res) => {
    const { id, reviewId } = req.params;
    await Product.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(req.params.reviewId)
    res.redirect(`/products/${id}`);
}))

module.exports = router;