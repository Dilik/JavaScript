const mongooose = require('mongoose');
const Campground = require('../models/campground');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers')

mongooose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useCreateIndex: true, 
    useUnifiedTopology: true
});

//check db conncetion
const db = mongooose.connection; 
db.on("error", console.error.bind(console,"connection error:"));
db.once("open", ()=>{
    console.log("Database Connected");
});

//populate some camp names for each location
const sampleName = (array)=> array[Math.floor(Math.random() * array.length)];

//seed to populate some data in DB
const seedDB = async ()=>{
    await Campground.deleteMany({});
    for(let i=0; i<50; i++){
        const random1000 = Math.floor(Math.random()*1000);
        const price = Math.floor(Math.random()*20) + 10;
        const camp = new Campground({
            author: '5ff50c4f356e6922b1c73706',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sampleName(descriptors)} ${sampleName(places)}`,
            image: 'https://source.unsplash.com/collection/483251',
            description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Qui beatae eveniet cumque illum reiciendis non assumenda totam facere? Eaque suscipit a sequi eveniet nesciunt nulla quibusdam magnam accusamus nihil expedita!", 
            price: price
        })
        await camp.save();
    }
    
}

seedDB().then(()=>{
    mongooose.connection.close();
})