'use strict';
//Declare variables for DOM manipulation
const currentScore = document.querySelector('.score');
const endScore = document.querySelector('.modalScore');
const myModal = document.getElementById('modal');
const currentLives = document.querySelector('.lives');
const currentTime = document.querySelector('.timer');
//Declare variables for game play
let score = 0;
let lives = 3;
let sec = 15;
let timer;
let time;
let elapsed;
let start;
let playing = false;
let paused = false;

class Player {
  constructor() {
    this.x = 2;
    this.y = 5;
    this.sprite = 'images/char-boy.png';
    this.moving = false;
    this.win = false;
  }
  update() {
    this.isOutOfBoundsX = this.x > 5;
    this.isOutOfBoundsY = this.y < 1;
    if (this.isOutOfBoundsY && !this.moving && !this.win) {
      score += 1;
      this.x = 2;
      this.y = 5;
      playing = false;
      clearTimer();
      initialClick();
    }
    if (sec === 0) {
      this.x = 2;
      this.y = 5;
      playing = false;
      clearTimer();
      initialClick();
      lives -= 1;
      sec = 15;
      if (lives <= 0) {
         openModal();
      }
    }
    currentScore.innerHTML = score;
    currentLives.innerHTML = lives;
    currentTime.innerHTML = sec;
  }
  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x * 101, this.y *83);
    this.moving = false;
  }
  handleInput(input) {
    switch (input) {
      case 'left':
        this.x = this.x > 0 ? this.x - 1 : this.x;
        break;
      case 'right':
        this.x = this.x < 4 ? this.x + 1 : this.x;
        break;
      default:
        break;
    }
    this.moving = true;
  }
}

const player = new Player();

document.addEventListener('keyup', function(e) {
  const allowedKeys = {
    37: 'left',
    39: 'right'
  };
  player.handleInput(allowedKeys[e.keyCode])
});

document.addEventListener('keydown', initialClick);

function initialClick() {
  if (playing === false) {
    start = new Date().getTime();
    setTimer();
    playing = true;
  }
}

//Timer function
function setTimer() {
timer = setInterval(function() {
    time = ((new Date().getTime()) - start);
    elapsed = Math.floor(time / 100) / 10;
    sec = 15  - (parseInt(elapsed%60));
}, 100);
}

//Function to stop the timer
function clearTimer() {
clearInterval(timer);
}

//End of game modal
function openModal() {
paused = true;
myModal.style.display = 'block';
endScore.innerHTML = score;
document.getElementsByClassName('play-again')[0].addEventListener('click', reset);
document.getElementsByClassName('quit')[0].addEventListener('click', clearModal);
}

//Function to reset game after modal display
function reset() {
clearModal();
lives = 3;
score = 0;
sec = 15;
currentTime.innerHTML = sec;
allEnemies.forEach(function(enemy) {
    enemy.enemySpeed = ((Math.random() * 3) + 0.5);
});
clearTimer();
playing = false;
paused = false;
}

function clearModal() {
  myModal.style.display = 'none';
}

// if needed for later
// function checkCollisions() {
//   allEnemies.forEach(function(enemy) {
//     if (enemy.y === player.y) {
//         if (enemy.x >= player.x - 0.5 && enemy.x <= player.x + 0.5) {
//             player.y = 5;
//             player.x = 2;
//             lives -= 1;
//             if (lives <= 0) {
//                 openModal();
//             }
//             playing = false;
//             clearTimer();
//             initialClick();
//         }
//     }
// });
// }