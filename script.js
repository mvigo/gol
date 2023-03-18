const container = document.getElementById('container');
const cells = [];
const gridSize = 50;

for (let i = 0; i < gridSize; i++) {
    cells[i] = [];
    for (let j = 0; j < gridSize; j++) {
        const cell = document.createElement('div');
        cell.className = 'cell';
        cell.addEventListener('click', () => {
            cell.classList.toggle('alive');
        });
        container.appendChild(cell);
        cells[i][j] = cell;
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
            }
        })
    );
}

setInterval(nextGeneration, 100);
