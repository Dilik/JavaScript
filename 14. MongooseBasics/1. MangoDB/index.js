const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/movieApp', {useNewUrlParser: true, useUnifiedTopology: true })
.then(()=>{
    console.log("Connection Established !!!");
})
.catch(err=>{
    console.log("Cannot Connect: ", err);
})

//determine the schema to store movies in this format
const movieSchema = new mongoose.Schema({
    title: String,
    year: Number,
    score: Number,
    rating: String
});

//mongoose will change Movie -> movies and creats collection in dbs
//Movie has to start with capital letter and singular
//Variable will be a movie class
const Movie = mongoose.model('Movie', movieSchema); 

//creating instance of movie
// need to call save mehtod IOT save in database
//const godFather = new Movie({title: "God Father I", year: 1975, score: 9.7, rating: "R"});

//isnertMany returns promise and you don't need to call save method
//insertMany is not commonly used. Most of the time we add data to dbs one at a time. 

// Movie.insertMany([
//     {title: 'Amelie', year: 2001, score: 8.3, rating: 'R'},
//     {title: 'Alien', year: 1979, score: 8.1, rating: 'R'},
//     {title: 'GoodFellas', year: 1991, score: 9.4, rating: 'PG'},
//     {title: 'High Crime', year: 2002, score: 7.9, rating: 'PG-13'}
// ])
// .then(data =>{
//     console.log('It Worked', data)
// })