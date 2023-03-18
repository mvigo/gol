const container = document.getElementById('container');
const cells = [];
const gridSize = 50;
let gameInterval;
const blueColors = [
  '#1c7aa8',
  '#24688c',
  '#2b5070',
  '#344c61',
  '#3a3a52',
  '#1e3c50',
  '#104d5f',
  '#0a5e6e',
];

for (let i = 0; i < gridSize; i++) {
    cells[i] = [];
    for (let j = 0; j < gridSize; j++) {
        const cell = document.createElement('div');
        cell.className = 'cell';
        cell.addEventListener('click', () => {
            if (cell.classList.contains('alive')) {
                cell.classList.remove('alive');
                cell.style.backgroundColor = '';
            } else {
                cell.classList.add('alive');
                cell.style.backgroundColor = blueColors[Math.floor(Math.random() * blueColors.length)];
            }
        });
        container.appendChild(cell);
        cells[i][j] = cell;
    }
}

function randomizeGrid() {
    for (let i = 0; i < gridSize; i++) {
        for (let j = 0; j < gridSize; j++) {
            const cell = cells[i][j];
            cell.classList.remove('alive');
            cell.style.backgroundColor = '';
            if (Math.random() < 0.3) {
                cell.classList.add('alive');
                cell.style.backgroundColor = blueColors[Math.floor(Math.random() * blueColors.length)];
            }
        }
    }
}

function nextGeneration() {
    const newCells = cells.map((row, x) =>
        row.map((cell, y) => {
            const neighbors = [
                cells[x - 1]?.[y - 1],
                cells[x - 1]?.[y],
                cells[x - 1]?.[y + 1],
                cells[x]?.[y - 1],
                cells[x]?.[y + 1],
                cells[x + 1]?.[y - 1],
                cells[x + 1]?.[y],
                cells[x + 1]?.[y + 1],
            ];
            const aliveNeighbors = neighbors.filter(n => n?.classList.contains('alive')).length;

            if (cell.classList.contains('alive')) {
                return aliveNeighbors === 2 || aliveNeighbors === 3 ? 'alive' : '';
            } else {
                return aliveNeighbors === 3 ? 'alive' : '';
            }
        })
    );

    cells.forEach((row, i) =>
        row.forEach((cell, j) => {
            cell.className = 'cell';
            if (newCells[i][j] === 'alive') {
                cell.classList.add('alive');
                cell.style.backgroundColor = blueColors[Math.floor(Math.random() * blueColors.length)];
            } else {
                cell.style.backgroundColor = '';
            }
        })
    );
}

function startGame() {
    if (gameInterval) {
        clearInterval(gameInterval);
    }
    gameInterval = setInterval(nextGeneration, 100); // High speed: 50 ms per generation
}

randomizeGrid();
startGame();

container.addEventListener('click', () => {
    clearInterval(gameInterval);
});

container.addEventListener('mouseleave', () => {
    startGame();
});
