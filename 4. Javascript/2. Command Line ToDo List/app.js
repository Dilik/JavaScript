// 1. new - add to do list
// 2. list - list to do list
// 3. delete - delete the task
// 4. quit - get out the system

let userInput = prompt('What you want to do'); 
const toDos = ['Buy Egg', 'Wash Dishes', 'Daily Workout'];

while(userInput !== 'quit' && userInput !== 'q'){
    if(userInput === 'list'){
        console.log('*******************************');
        for(let i=0; i < toDos.length; i++){
            console.log(`#${i}: ${toDos[i]}`)
        }
        console.log('*******************************');
    } else if(userInput === 'new'){
        const newToDo = prompt('Ok, what is new todo');
        toDos.push(newToDo);
        console.log(`${newToDo} added to the list`);
    } else if(userInput === 'delete'){
        let index = parseInt(prompt('Ok, enter index to delete: '));
        if(!Number.isNaN(index)){
            while (index > toDos.length || Number.isNaN(index)){
                console.log('Index is invalid');
                index = parseInt(prompt('enter valid index to delete: '));
            }
            const deleted = toDos.splice(index, 1);
            console.log(`You are deleted ${deleted[0]}`);   
        }
    
    }
    userInput = prompt('What you want to do');
}
console.log('You got out the program');