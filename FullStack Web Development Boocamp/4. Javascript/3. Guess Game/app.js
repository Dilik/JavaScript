let maximum = parseInt(prompt("Please enter Maximum number"));

while(!maximum){
    maximum = parseInt(prompt("Please enter valid number"));
}

let targetNumber = Math.floor(Math.random() * maximum +1);

let guess = parseInt(prompt("Please guess a number"));
let attempts = 1; 
while(parseInt(guess) !== targetNumber){
    if(guess === 'q') break;
    attempts++;
    if(guess > targetNumber){
        guess = prompt("The number you gessed is high, Guess another number");
    } else{
        guess = prompt("The number you guessed is low, Guess another number");
    }
}

if(guess === 'q'){
    console.log("Quiting")
} else{
    console.log(`Congrats, it took you ${attempts} guesses`);
}