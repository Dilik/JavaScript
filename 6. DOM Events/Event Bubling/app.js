const button = document.querySelector('button');
const paragraph = document.querySelector('p');
const section = document.querySelector('section');
const buttonBg = document.querySelector('#btn-bg');
const container = document.querySelector('#container')

button.addEventListener('click', ()=>{
    alert('Button clicked');
})

paragraph.addEventListener('click', ()=>{
    alert('paragraph clicked');
})

section.addEventListener('click', ()=>{
    alert('section clicked');
})

const randomColor = ()=>{
    const r = Math.floor(Math.random()* 255);
    const g = Math.floor(Math.random()* 255);
    const b = Math.floor(Math.random()* 255);
    return `rgb(${r}, ${g}, ${b})`;
}

buttonBg.addEventListener('click', (e)=>{
    container.style.backgroundColor = randomColor();
    e.stopPropagation();    
})

container.addEventListener('click', (e)=>{
    container.classList.toggle('hide');
    e.stopPropagation();
})