const state = {
    view: {
        squares: document.querySelectorAll('.square'),
        inimigo: document.querySelector('.inimigo'),
        tempoRestante: document.querySelector('#timeLeft'),
        score: document.querySelector('#score'),
        bestScore: document.querySelector('#bestScore'),
        lifesLeft: document.querySelector('#lifes'),
        divRestart: document.querySelector('#restart'),
        buttonRestart: document.querySelector('#buttonRestart'),
        endH2: document.querySelector('#endH2'),
        restartH2: document.querySelector('#restartH2'),
        pelement: document.querySelector('#pelement'),
    },

    values: {
        lifes: 3,
        result: 0,
        bestResult: 0,
        hitPosition: 0,
        tempoAtual: 75,
    },

    actions: {
        timer: 0,
        countDownTimer: 0,
    }
}

function playSound(audioName) {
    let audio = new Audio(`./src/audios/${audioName}`);
    audio.playbackRate = 1.5;
    audio.volume = 0.2;
    audio.play();
}

function countDown() {
    state.values.tempoAtual--;
    state.view.tempoRestante.textContent = state.values.tempoAtual + 's';
    if (state.values.tempoAtual <= 0) {
        gameEnd();
    }

}

function downLifes() {
    state.values.lifes--;
    state.view.lifesLeft.textContent = 'x' + state.values.lifes;
    playSound("wrong.mp3");
    state.values.hitPosition = null;
    if (state.values.lifes <= 0) {
        gameEnd();
    }
}

function gameEnd() {
    clearInterval(state.actions.timer);
    clearInterval(state.actions.countDownTimer);
    playSound("game-end.mp3");
    state.view.divRestart.style = 'width: 30rem;' + 'height: 30rem';
    state.view.endH2.textContent = 'Fim de jogo!';
    state.view.pelement.textContent = 'Sua pontuação foi ' + state.values.result;
    state.view.buttonRestart.style = 'width: 10rem;' + 'padding: 1rem';
    state.view.restartH2.textContent = 'Restart';
    if (state.values.result > state.values.bestResult) {
        state.values.bestResult = state.values.result;
    }

}

function randomSquare() {
    state.view.squares.forEach(square => {
        square.classList.remove('inimigo');
    });

    let randomNumber = Math.floor(Math.random() * 9);
    let randomSquare = state.view.squares[randomNumber];
    randomSquare.classList.add('inimigo');
    state.values.hitPosition = randomSquare.id;
}

function addListenerHitBox() {
    state.view.squares.forEach(square => {
        square.addEventListener("click", () => {
        if (state.values.hitPosition === null) {
            return;
        } else if (square.id === state.values.hitPosition) {
            state.values.result++;
            playSound("hit.m4a");
            state.view.score.textContent = state.values.result;
            state.values.hitPosition = null;
        } else {
            downLifes();
        }
    });
});
}

function init() {
    state.values.lifes = 3;
    state.values.result = 0;
    state.values.tempoAtual = 75;
    state.view.bestScore.textContent = state.values.bestResult;
    state.view.lifesLeft.textContent = 'x' + state.values.lifes;
    state.view.score.textContent = 0;
    state.view.tempoRestante.textContent = state.values.tempoAtual + 's';
    state.view.divRestart.style = 'width: 0rem;' + 'height: 0rem;';
    state.view.buttonRestart.style = 'width: 0rem;' + 'padding: 0rem';
    state.view.endH2.textContent = '';
    state.view.pelement.textContent = '';
    state.view.restartH2.textContent = '';
    state.actions.timer = setInterval(randomSquare, 1000);
    state.actions.countDownTimer = setInterval(countDown, 1000);

    addListenerHitBox();
}

init();