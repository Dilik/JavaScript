const movieList = [
    {
        title: "Gone to the Wild",
        score: 90,
        year: 2000
    },
    {
        title: "The Day After Tomorrow",
        score: 80,
        year: 2010
    },
    {
        title: "The Firm",
        score: 85,
        year: 1990
    },
    {
        title: "God Father",
        score: 95,
        year: 1975
    },
    {
        title: "Amadeus",
        score: 75,
        year: 2005
    },
    {
        title: "Lord Of the Rings",
        score: 70,
        year: 2009
    },

]

const BestMovies = movieList.filter(movie => movie.score > 80 )
const newMovies = movieList.filter(movie => movie.year > 2000).map(movie => movie.title)

//every
let checkYear = movieList.every(movie => movie.year > 1980)

//some
let isAnyOldMovies = movieList.some(movie => movie.year < 1980) 

//reduce
const prices = [9.99, 1.99, 44.99, 29.99, 19.99, 99.99];
// const total = prices.reduce((total, price) => {
//     return total + price;
// })
let total = prices.reduce((total, price) => total + price)

//find min price value
let minPrice = prices.reduce((min, price) =>{
    if (min > price)
        return price; 
    return min;
})

//highest rated movie
const highestRatedMovie = movieList.reduce((bestMovie, currentMovie) =>{
    if (bestMovie.score > currentMovie.score)
        return bestMovie; 
    return currentMovie;
})