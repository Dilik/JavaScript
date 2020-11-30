const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/shopApp', {useNewUrlParser: true, useUnifiedTopology: true })
.then(()=>{
    console.log("Connection Established !!!");
})
.catch(err=>{
    console.log("Cannot Connect: ", err);
})

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxlength: 20
    },
    price: {
        type: Number,
        required: true, 
        min: 0
    },
    onSale: {
        type: Boolean,
        default: false
    },
    categories:[String],
    qty:{
        online: {
            type: Number,
            default: 0
        },
        inStore: {
            type: Number,
            default: 0
        }
    }
})

const Product = mongoose.model('Product', productSchema);

const bikeHelmet = new Product({ name: "Bike Helmet", price: 29.99, onSale: true, categories: ['Cycling', 'Safety']});
bikeHelmet.save()
    .then(data =>{
        console.log("It Worked", data);
    })
    .catch(err =>{
        console.log("Error", err);
    })