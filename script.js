const board = document.getElementById('game-board');
const timerDisplay = document.getElementById('timer');

let cards = ['🐱','🐱','😺','😺','😻','😻','😼','😼','🙀','🙀','😿','😿','😹','😹','😽','😽'];
let flippedCards = [];
let matchedCards = 0;
let time = 0;
let timer;

function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

function startTimer() {
    timer = setInterval(() => {
        time++;
        timerDisplay.textContent = `Time: ${time}s`;
    }, 1000);
}

function createBoard() {
    shuffle(cards).forEach((emoji, index) => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.emoji = emoji;
        card.addEventListener('click', flipCard);
        board.appendChild(card);
    });
    startTimer();
}

function flipCard() {
    if (flippedCards.length < 2 && !this.classList.contains('flipped') && !this.classList.contains('matched')) {
        this.classList.add('flipped');
        this.textContent = this.dataset.emoji;
        flippedCards.push(this);

        if (flippedCards.length === 2) {
            setTimeout(checkMatch, 800);
        }
    }
}

function checkMatch() {
    const [card1, card2] = flippedCards;
    if (card1.dataset.emoji === card2.dataset.emoji) {
        card1.classList.add('matched');
        card2.classList.add('matched');
        matchedCards += 2;
        if (matchedCards === cards.length) {
            clearInterval(timer);
            alert(`You won! Time: ${time}s`);
        }
    } else {
        card1.classList.remove('flipped');
        card2.classList.remove('flipped');
        card1.textContent = '';
        card2.textContent = '';
    }
    flippedCards = [];
}

createBoard();
