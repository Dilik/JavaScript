const player1 = {
    score: 0,
    button: document.querySelector('#p1'), 
    display: document.querySelector('#ps1')
}

const player2 = {
    score: 0, 
    button: document.querySelector('#p2'),
    display: document.querySelector('#ps2')
}

const reset = document.querySelector('#reset'); 
const playTo = document.querySelector('#playTo');
let winningScore = 5;
let isGameOver = false;

function updateScore(player, opponent){
    if(!isGameOver){
        player.score += 1;
        if(player.score === winningScore){
            isGameOver = true;
            player.button.disabled = true; 
            opponent.button.disabled = true;
            player.display.classList.add('winner');
            opponent.display.classList.add('loser');
        }
        player.display.textContent = player.score;
    }
}

player1.button.addEventListener('click', ()=>{
    updateScore(player1, player2);
})

player2.button.addEventListener('click', ()=>{
    updateScore(player2, player1);
})

reset.addEventListener('click', resetAll);

function resetAll (){ 
    isGameOver = false;
    for(let p of [player1, player2]){
        p.score = 0;
        p.display.textContent = 0;
        p.display.classList.remove('winner','loser'); 
        p.button.disabled = false;
    }
}

playTo.addEventListener('change', ()=>{
    winningScore = parseInt(playTo.value);
    resetAll();
})
