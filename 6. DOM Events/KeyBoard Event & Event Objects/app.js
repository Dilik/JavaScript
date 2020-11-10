document.querySelector('button'),addEventListener('click', (evt)=> {
    console.log(evt);
})

document.querySelector('input').addEventListener('keydown', (evt)=>{
    console.log(evt.key);
    console.log(evt.code);
    console.log(evt.keyCode);
})

// document.querySelector('input').addEventListener('keyup', ()=>{
//     console.log('KEYUP')
// })

window.addEventListener('keydown', (e)=>{
    switch(e.code){
        case 'ArrowUp':
            console.log('UP');
            break;
        case 'ArrowDown': 
            console.log('DOWN');
            break;
        case 'ArrowLeft':
            console.log('LEFT');
            break;
        case 'ArrowRight': 
            console.log('RIGHT');
            break;
    }
})