//function expression
const square = (x) =>{
    return x**2;
}

const add = (x, y) =>{
    return x+y;
}

const rollDie = () =>{
    return Math.floor(Math.random() * 10) +1;
}

const movies = [
    
    {
        title: "The Gladiator", 
        score: 90
    },
    {
        title: "Home Alone",
        score: 95
    },
    {
        title: "Amadeus",
        score: 79
    },
    {
        title: "Zoolander",
        score: 65
    }
]

// Map example
const MoviePrint = movies.map(movie => (
    `${movie.title} - ${movie.score / 10}`
))

setTimeout(()=>{
    console.log("It has been a great course on array methods and function expressions");
    console.log("CallBack example");
}, 1000);


setInterval(() => {
    console.log(Math.random());
}, 2000);

//filter
const numbers = [1, 2, 1, 5,6,7,8,8,4,3,1,2,3,4,5,6123,123,123,321,312,312,3];

const newnum = numbers.filter(n => {
    if (n%2 === 0) return n;
})