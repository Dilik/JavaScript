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