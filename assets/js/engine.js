const state ={
    view:{
        squares: document.querySelectorAll('.square'),
        enemy: document.querySelector('.enemy'),
        time:document.querySelector('#time-left'),
        score:document.querySelector('#score-right'),
        lives: document.querySelector('#lives-left'),
    },
    values:{
        gameVelocity: 1000,
        hitPosition:0,
        result:0,
        currentTime:60,
        livesCount:3,
    },
    actions:{
        timerId: setInterval(randomSquare, 1000),
        countDownTimerId: setInterval(countDown, 300),
    }
}

function countDown(){
    state.values.currentTime--;
    state.view.time.textContent = state.values.currentTime;

    if(state.values.currentTime <= 0){
        clearInterval(state.actions.countDownTimerId);
        clearInterval(state.actions.timerId);
        alert('Game Over! O seu resultado foi: ' + state.values.result);
        location.reload();
    }
}

function playSound(audioName){
    let audio = new Audio(`./assets/sound/${audioName}.m4a`);
    audio.volume = 0.1;
    audio.play();
}

function randomSquare(){
    state.view.squares.forEach((square)=>{
        square.classList.remove('enemy');
    });

    let randomNumber = Math.floor(Math.random() * 9);
    let randomSquare = state.view.squares[randomNumber];
    randomSquare.classList.add('enemy');
    state.values.hitPosition = randomSquare.id;
}

function addListerHitBox(){
    state.view.squares.forEach((square)=>{
        square.addEventListener('mousedown', () => {
            if(square.id === state.values.hitPosition){
                state.values.result++;
                state.view.score.textContent = state.values.result;
                state.values.hitPosition = null;
                playSound('hit');
                
            } else {
                state.values.livesCount--;
                state.view.lives.textContent = 'x' + state.values.livesCount;
                if(state.values.livesCount <= 0){
                    clearInterval(state.actions.countDownTimerId);
                    clearInterval(state.actions.timerId);
                    alert('Game Over! O seu resultado foi: ' + state.values.result);
                    location.reload();
                }
                playSound('error');
            }
        })
    })
}




function init(){
    addListerHitBox();
}

init();