// https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png

const container = document.querySelector('#container'); 
const baseURL = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/';

for(let i=1; i<=151; i++){
    const image = document.createElement('img');
    const peokemon = document.createElement('div');
    const label = document.createElement('span');
    peokemon.classList.add('pokemon')
    
    label.innerText = `#${i}`;
    image.src = `${baseURL}${i}.png`
    
    peokemon.appendChild(image);
    peokemon.appendChild(label);
    container.appendChild(peokemon);
}
