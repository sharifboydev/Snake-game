const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
let grid = 16;
let count = 0;
let score = 0;
let max = 0;
let snake = {
  x: 160,
  y: 160,

  dx: grid,
  dy: 0,

  maxCells: 1,
  cells: [],
};

const food = {
  x: 320,
  y: 320,
};

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function loop() {
  requestAnimationFrame(loop);
  if (++count < 7) {
    return;
  }

  count = 0;
  context.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);

  snake.x += snake.dx;
  snake.y += snake.dy;

  if (snake.x < 0) {
    snake.x = canvas.clientWidth - grid;
  } else if (snake.x >= canvas.clientWidth) {
    snake.x = 0;
  }

  if (snake.y < 0) {
    snake.y = canvas.clientHeight - grid;
  } else if (snake.y >= canvas.clientHeight) {
    snake.y = 0;
  }

  snake.cells.unshift({ x: snake.x, y: snake.y });

  if (snake.cells.length > snake.maxCells) {
    snake.cells.pop();
  }

  context.fillStyle = "green";
  context.fillRect(food.x, food.y, grid - 1, grid - 1);

  context.fillStyle = "#EC7063";

  snake.cells.forEach(function (cell, index) {
    context.fillRect(cell.x, cell.y, grid - 1, grid - 1);
    if (cell.x === food.x && cell.y === food.y) {
      snake.maxCells++;

      score += 1;
      document.getElementById("score").innerHTML = score;

      food.x = getRandomInt(0, 25) * grid;
      food.y = getRandomInt(0, 25) * grid;
    }
    for (var i = index + 1; i < snake.cells.length; i++) {
      if (cell.x === snake.cells[i].x && cell.y === snake.cells[i].y) {
        if (score > max) {
          max = score;
        }
        (snake.x = 160), (snake.y = 160), (snake.cells = []);
        snake.maxCells = 1;
        snake.dx = grid;
        snake.dy = 0;
        score = 0;
        food.x = getRandomInt(0, 25) * grid;
        food.y = getRandomInt(0, 25) * grid;
        document.getElementById("score").innerHTML = max;
      }
    }
  });
}

document.addEventListener("keydown", function (e) {
  if (e.keyCode === 37 && snake.dx === 0) {
    snake.dx = -grid;
    snake.dy = 0;
  } else if (e.keyCode === 38 && snake.dy === 0) {
    snake.dy = -grid;
    snake.dx = 0;
  } else if (e.keyCode === 39 && snake.dx === 0) {
    snake.dx = grid;
    snake.dy = 0;
  } else if (e.keyCode === 40 && snake.dy === 0) {
    snake.dy = grid;
    snake.dx = 0;
  }
});

requestAnimationFrame(loop);
