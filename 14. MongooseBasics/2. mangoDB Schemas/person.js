const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/shopApp', {useNewUrlParser: true, useUnifiedTopology: true })
.then(()=>{
    console.log("Connection Established !!!");
})
.catch(err=>{
    console.log("Cannot Connect: ", err);
})

const personSchema = new mongoose.Schema({
    first: String,
    last: String
})

//Creating virtual 
personSchema.virtual('fullname').get(function(){ 
    return `${this.first} ${this.last}`;
})

//middleware pre - before we save
personSchema.pre('save', async function(){
    console.log('About the save');
})

personSchema.post('save', async function(){
    console.log('Saved');
})

const Person = mongoose.model('Person', personSchema);