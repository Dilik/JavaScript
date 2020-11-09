const btnClick = document.querySelector('#btn1');
const btnClick2 = document.querySelector('#btn2'); 
const screamer = document.querySelector('h1');

btnClick.onclick = function(){
    console.log('You clicked me');
}

function scream(){ 
    screamer.innerText = 'Warning !!! Do Not Click Second Button'
}

btnClick2.onmouseenter = scream;
btnClick2.addEventListener('mouseleave',()=>{screamer.innerText = 'GoodJob'});

const btn3 = document.querySelector('#btn3');
btn3.addEventListener('mouseup', ()=> {
    alert('Clicked')
})