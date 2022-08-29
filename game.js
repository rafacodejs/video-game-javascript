const canvas = document.querySelector('#game');
const game = canvas.getContext('2d');
const btnUp = document.querySelector('#up');
const btnLeft = document.querySelector('#left');
const btnRight = document.querySelector('#right');
const btnDown = document.querySelector('#down');
const livesCounter = document.querySelector('#live');
let canvasSize;
let elementsSize;
let level = 0;
let lives = 3;

const playerPosition = {
  x: undefined,
  y: undefined,
};

const giftPosition = {
  x: undefined,
  y: undefined,
};

let enemyPosition = [];

window.addEventListener('load', setCanvasSize);
window.addEventListener('resize', setCanvasSize);

function setCanvasSize() {
  if (window.innerHeight > window.innerWidth) {
    canvasSize = window.innerWidth * 0.85;
  } else {
    canvasSize = window.innerHeight * 0.85;
  }
  canvas.setAttribute('width', canvasSize);
  canvas.setAttribute('height', canvasSize);
  elementsSize = canvasSize / 10;
  startGame();
}
function startGame() {
  game.font = elementsSize + 'px Poppins';
  game.textAlign = 'end';

  const map = maps[level];

  if (!map) {
    gameWin();
    return;
  }

  const mapRows = map.trim().split('\n');
  const mapRowCols = mapRows.map((row) => row.trim().split(''));

  showLives();

  enemyPosition = [];
  game.clearRect(0, 0, canvasSize, canvasSize);

  mapRowCols.forEach((row, rowIndex) => {
    row.forEach((col, colIndex) => {
      const emoji = emojis[col];
      const positionX = elementsSize * (colIndex + 1);
      const positionY = elementsSize * (rowIndex + 1);

      if (col == 'O') {
        if (!playerPosition.x && !playerPosition.y) {
          playerPosition.x = positionX;
          playerPosition.y = positionY;
          console.log(playerPosition);
        }
      } else if (col === 'I') {
        giftPosition.x = positionX;
        giftPosition.y = positionY;
      } else if (col === 'X') {
        enemyPosition.push({
          x: positionX,
          y: positionY,
        });
      }

      game.fillText(emoji, positionX, positionY);
      enemiesPosition = '';
    });
  });

  movePlayer();
}

function movePlayer() {
  const giftCollisionX =
    playerPosition.x.toFixed(3) === giftPosition.x.toFixed(3);
  const giftCollisionY =
    playerPosition.y.toFixed(3) === giftPosition.y.toFixed(3);
  const giftCollision = giftCollisionX && giftCollisionY;

  if (giftCollision) {
    levelWin();
    levelLose();
  }

  const enemyCollision = enemyPosition.find((enemy) => {
    const enemyCollisionX = enemy.x.toFixed(3) === playerPosition.x.toFixed(3);
    const enemyCollisionY = enemy.y.toFixed(3) === playerPosition.y.toFixed(3);
    return enemyCollisionX && enemyCollisionY;
  });

  if (enemyCollision) {
    levelLose();
  }

  game.fillText(emojis['PLAYER'], playerPosition.x, playerPosition.y);
}

function levelWin() {
  level++;
  startGame();
}

function levelLose() {
  lives--;

  if (lives <= 0) {
    level = 0;
  }
  playerPosition.x = undefined;
  playerPosition.y = undefined;
  startGame();
}

function gameWin() {
  alert('GANASTE!!!');
}

function showLives() {
  const heartsArray = Array(lives).fill(emojis['HEART']);

  livesCounter.innerHTML = '';
  heartsArray.forEach((heart) => livesCounter.append(heart));
}

window.addEventListener('keydown', moveByKeys);
btnUp.addEventListener('click', moveUp);
btnLeft.addEventListener('click', moveLeft);
btnRight.addEventListener('click', moveRight);
btnDown.addEventListener('click', moveDown);

function moveByKeys(event) {
  event.key === 'ArrowUp'
    ? moveUp()
    : event.key === 'ArrowLeft'
    ? moveLeft()
    : event.key === 'ArrowRight'
    ? moveRight()
    : event.key === 'ArrowLeft'
    ? moveRight()
    : console.log('Esa tecla no mueve nada');
}
function moveUp() {
  console.log('Me quiero mover hacia arriba');

  if (playerPosition.y - elementsSize < elementsSize) {
    console.log('OUT');
  } else {
    playerPosition.y -= elementsSize;
    startGame();
  }
}
function moveLeft() {
  console.log('Me quiero mover hacia izquierda');

  if (playerPosition.x - elementsSize < elementsSize) {
    console.log('OUT');
  } else {
    playerPosition.x -= elementsSize;
    startGame();
  }
}
function moveRight() {
  console.log('Me quiero mover hacia derecha');

  if (playerPosition.x + elementsSize > canvasSize) {
    console.log('OUT');
  } else {
    playerPosition.x += elementsSize;
    startGame();
  }
}
function moveDown() {
  console.log('Me quiero mover hacia abajo');
  if (playerPosition.y + elementsSize > canvasSize) {
    console.log('OUT');
  } else {
    playerPosition.y += elementsSize;
    startGame();
  }
}
