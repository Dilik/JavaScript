const mongoose = require('mongoose');
const { campgroundSchema } = require('../schemas');
const Review = require('./review');
const Schema = mongoose.Schema;


const imageSchema = new Schema({
    url: String,
    filename: String
})

imageSchema.virtual('thumbnails').get(function () {
    return this.url.replace('/upload', '/upload/w_200');
})

const opt = { toJSON: { virtuals: true }};

const CampgroundSchema = new Schema({
    title: String,
    images: [imageSchema],
    geometry: {
        type: {
            type: String, 
            enum: ['Point'],
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    },
    price: Number,
    description: String,
    location: String,
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Review'
        }
    ]
}, opt)

CampgroundSchema.virtual('properties.popUpMarkup').get(function () {
    return `<strong>
    <a href="/campgrounds/${this._id}">${this.title}</a>
    <p> ${this.description.substr(0, 50)}...</p>
    </strong>`
})

//once campground is deleted following middleware will delete
//all the associated reviews
CampgroundSchema.post('findOneAndDelete', async function (doc) {
    if (doc) {
        await Review.remove({
            _id: {
                $in: doc.reviews
            }
        })
    }
})

module.exports = mongoose.model('Campground', CampgroundSchema);