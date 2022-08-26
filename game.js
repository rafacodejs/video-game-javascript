const canvas = document.querySelector('#game');
const game = canvas.getContext('2d');
const btnUp = document.querySelector('#up');
const btnLeft = document.querySelector('#left');
const btnRight = document.querySelector('#right');
const btnDown = document.querySelector('#down');
let canvasSize;
let elementsSize;

const playerPosition = {
  x: undefined,
  y: undefined,
};

window.addEventListener('load', setCanvasSize);
window.addEventListener('resize', setCanvasSize);

function setCanvasSize() {
  if (window.innerHeight > window.innerWidth) {
    canvasSize = window.innerWidth * 0.8;
  } else {
    canvasSize = window.innerHeight * 0.8;
  }
  canvas.setAttribute('width', canvasSize);
  canvas.setAttribute('height', canvasSize);
  elementsSize = canvasSize / 10;
  startGame();
}
function startGame() {
  game.font = elementsSize + 'px Poppins';
  game.textAlign = 'end';

  const map = maps[0];
  const mapRows = map.trim().split('\n');
  const mapRowCols = mapRows.map((row) => row.trim().split(''));

  mapRowCols.forEach((row, rowIndex) => {
    row.forEach((col, colIndex) => {
      const emoji = emojis[col];
      const positionX = elementsSize * (colIndex + 1);
      const positionY = elementsSize * (rowIndex + 1);

      if (col == 'O') {
        playerPosition.x = positionX;
        playerPosition.y = positionY;
        console.log(playerPosition);
      }
      game.fillText(emoji, positionX, positionY);
    });
  });
}
movePlayer();

function movePlayer() {
  game.fillText(emojis['PLAYER'], playerPosition.x, playerPosition.y);
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
  playerPosition.y -= elementsSize;
  movePlayer();
}
function moveLeft() {
  console.log('Me quiero mover hacia izquierda');
}
function moveRight() {
  console.log('Me quiero mover hacia derecha');
}
function moveDown() {
  console.log('Me quiero mover hacia abajo');
}
