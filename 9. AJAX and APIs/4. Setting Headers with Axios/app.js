const jokes = document.querySelector('ul'); 
const button = document.querySelector('button');
const errorMessage = document.querySelector('#error')

const getDadJoke = async () => {
    try{
        const config = {headers: {Accept: 'application/json'}};
        const jasonData = await axios.get('https://icanhazdadjoke.com/', config);
        return jasonData.data.joke;
    } catch(e){
        errorMessage.innerText = `Something went wrong ${e}`; 
    }
    
}

const addNewJoke = async () =>{
    const jokeText = await getDadJoke();
    const newLI = document.createElement('li');
    newLI.append(jokeText);
    jokes.append(newLI);
}

button.addEventListener('click', addNewJoke);