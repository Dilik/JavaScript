//way to set default value
function rollDie (numSide = 6 ){
    return Math.floor(Math.random() * numSide) + 1
} 

//Spread

const numbers = [12, 43, 12, 321, 321, 13, 765, 76, 5, 7, 34 ]

let max = Math.max(...numbers)
let min = Math.min(...numbers)

//Spread array literals

const cats = ['blue', 'scout', 'rocket']
const dogs = ['rusty', 'whyatt']

const allPets = [...cats, ...dogs]

//spread with objects

const cenine = {leg: 4, family: 'Caniae'}
const feline = {isFurry: true, family: 'Falidae'}

const AllDogs = {...cenine, ...feline};
const arraySpread= {...[3, 4, 5, 1, 1, ]}

//object spread real life example
const dataFromForm = {
    email: 'bluen1@gmail.com',
    password: 'Asdw@asd1',
    username: 'tfFunk'
}

//adding to data form
const newUser = {...dataFromForm, id: 3, isAdmin: false}

//rest function, how to pass multiple arguments to function

function sum(...nums){
    return nums.reduce((total, num) => total+num )
}

function raceResults(gold, silver, ...everyoneElse){
    console.log(`Gold goes to ${gold}`)
    console.log(`Silver goes to ${silver}`)
    console.log(`Greate thanks for ${everyoneElse} for participating in the race`)
}

//destructuring - singling out the varaibles

const raceResult = ['Eluide Kipchoge', 'Feyisa Lelisa', 'Galen Rupp']

const [gold, silver, bronze] = raceResult;
const [fastest, ...everyoneLeft] = raceResult;

//Destructuring Objects

const user = {
    email: 'alex@gmail.com',
    password: 'mahoneasdasd',
    firstname: 'Alex',
    lastname: 'Fergus',
    born: 1980,
    died: 2019,
    bio: 'Alex Fergus was a nickname for Abbos who have studied IT in Germany Information Tech Univeristy',
    city: 'Dallas',
    state: 'Texas'
}

const {email, lastname, firstname, bio, born, died} = user;
const {born: birthYear} = user;

//Destrcuturing Parameters 
function fullName({firstname, lastname}){
    return `${firstname} ${lastname}`
}