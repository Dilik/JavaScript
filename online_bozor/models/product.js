const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    description: {
        type: String,
        required: true
    },
    condition: {
        type: String,
        lowercase: true,
        enum: ['new', 'used-like new', 'used-good', 'used-fair'],
        required: true
    },
    category: {
        type: String,
        lowercase: true,
        enum: ['furnitures', 'cars', 'baked items', 'vitamins', 'cell-phones', 'electronics', 'toys',
            'food', 'laptops', 'other'
        ],
        required: true
    },
    tags: {
        type: String,
        lowercase: true
    }
})

module.exports = mongoose.model('Product', productSchema)