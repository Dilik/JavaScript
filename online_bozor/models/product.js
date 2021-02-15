const mongoose = require('mongoose');
const Review = require('./review');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    name: String,
    image: String,
    price: Number,
    description: String,
    location: String,
    condition: {
        type: String,
        enum: ['new', 'used-like new', 'used-good', 'used-fair'],
    },
    category: {
        type: String,
        enum: ['furnitures', 'cars', 'baked items', 'vitamins', 'cell-phones', 'electronics', 'toys',
            'food', 'laptops', 'other'
        ],
    },
    tags: {
        type: String,
        lowercase: true
    },
    reviews: [{
        type: Schema.Types.ObjectId,
        ref: 'Review'
    }]
})

productSchema.post('findOneAndDelete', async function(doc) {
    if (doc) {
        await Review.remove({
            _id: {
                $in: doc.reviews
            }
        })
    }
})

module.exports = mongoose.model('Product', productSchema)