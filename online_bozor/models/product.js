const mongoose = require('mongoose');
const Review = require('./review');
const Schema = mongoose.Schema;

const imageSchema = new Schema({
    url: String,
    filename: String
})

imageSchema.virtual('thumbnail').get(function () {
    return this.url.replace('/upload', '/upload/w_100');
})

imageSchema.virtual('imageResize').get(function () {
    return this.url.replace('/upload', '/upload/w_250,h_250,c_fill');
})

imageSchema.virtual('imageFit').get(function () {;
    return this.url.replace('/upload', '/upload/w_300,h_350,c_fill')
})

const productSchema = new Schema({
    name: String,
    images: [imageSchema],
    price: Number,
    description: String,
    phoneNumber: String,
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    condition: {
        type: String,
        enum: ['new', 'used-like new', 'used-good', 'used-fair'],
    },
    category: {
        type: String,
        enum: ['', 'Apparel and Accessorires', 'Style and Fashion', 'Home and Garden', 'Sporting Goods', 'Health and Wellness', 'Medical Health', 'Kids and Infants', 'Pets and Pet Supplies',
            'Electronics', 'Home Improvement', 'Services', 'Other Categories']
    },
    tags: {
        type: String,
        lowercase: true
    },
    reviews: [{
        type: Schema.Types.ObjectId,
        ref: 'Review'
    }],
},
    { timestamps: true}
)

productSchema.post('findOneAndDelete', async function (doc) {
    if (doc) {
        await Review.remove({
            _id: {
                $in: doc.reviews
            }
        })
    }
})

module.exports = mongoose.model('Product', productSchema)