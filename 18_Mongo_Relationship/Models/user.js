const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/relationshipDBDemo', {
    useNewUrlParser: true,
    useCreateIndex: true, 
    useUnifiedTopology: true
})
.then(()=>{
    console.log("Mongo Connection Open");
})
.catch(err=>{
    console.log("Oh No Connection Error");
    console.log(err);
})

const userSchema = new mongoose.Schema({
    first: String,
    last: String,
    addresses:[
        {
            _id: {id: false},
            street: String,
            city: String,
            state: String,
            country:String
        }
    ]
})

const User = new mongoose.model('User', userSchema);

const makeUser = async()=>{
    const u = new User({
        first: 'Mark',
        last: 'Walberg',
    })
    u.addresses.push({
        street: '1543 Bay 40th Street',
        city: 'Brooklyn',
        state: 'NY',
        country: 'USA'
    })

    const res = await u.save();
    console.log(res);
}

const addAddress = async (id) =>{
    const user = await User.findById(id);
    user.addresses.push({
        street: '13A 40th Street',
        city: 'Queens',
        state: 'NY',
        country: 'USA'
    })
    const res = await user.save();
    console.log(res);
}

makeUser();
addAddress('5fdfd4175ccb2f0e3ec930a7')