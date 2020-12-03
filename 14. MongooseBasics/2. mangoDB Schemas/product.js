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
        maxlength: [20, 'Cannot be more than 20 characters']
    },
    price: {
        type: Number,
        required: true, 
        min: [0, 'price must be positive']
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
    },
    size:{
        type: String,
        enum: ['S', 'M', 'L', 'XL', 'XLL']
    }
})

//creating our own method for schema, 
// ensure to create presonnel methods before creating a model
productSchema.methods.greet = function(){
    console.log('Hi!'); 
    console.log(`From Product- ${this.name} - $${this.price}`);
}

//method that toggl onSale
productSchema.methods.toggleOnSale = function(){
    this.onSale = !this.onSale;
    return this.save();
}

//method that adds to categories
productSchema.methods.addCategories = function(newCat){
    this.categories.push(newCat);
    return this.save();
}

const Product = mongoose.model('Product', productSchema);

const bikeHelmet = new Product({ name: "Army Tan T Shirt", price: 10.99, categories: ['Uniform', 'Army'], size: 'M'});
bikeHelmet.save()
    .then(data =>{
        console.log("It Worked", data);
    })
    .catch(err =>{
        console.log("Error", err);
    })

// Product.findOneAndUpdate({name: "Green Army Toys"}, {price: 15.99, onSale: true}, {new: true, runValidators: true})
//     .then(data =>{
//         console.log("It Worked", data);
//     })
//     .catch(err =>{
//         console.log("Error", err);
//     })


// const findProduct = async()=>{
//     const foundProduct = await Product.findOne({name: 'Army Tan T Shirt'});
//     foundProduct.greet();
// }

// findProduct();


const findProduct = async()=>{
    const foundProduct = await Product.findOne({name: 'Army Tan T Shirt'});
    console.log(foundProduct);
    await foundProduct.toggleOnSale();
    console.log(foundProduct);
    await foundProduct.addCategories('Military');
    console.log(foundProduct);
}

findProduct();