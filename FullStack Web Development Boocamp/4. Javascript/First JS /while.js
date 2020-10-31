let input = prompt("Hey Say Something!!!");

while(true){
    input = prompt(input);

    if(input === "stop copying me" || input === "quit")
        break;
}

console.log("Finally You Got Out The Loop!!!");