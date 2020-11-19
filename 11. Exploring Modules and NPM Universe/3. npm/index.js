const joke = require('give-me-a-joke'); 
const color = require('colors');

// console.dir(joke);
joke.getRandomDadJoke((joke)=> console.log(joke.red));