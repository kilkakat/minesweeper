export const TILE_STATUSES = {
    HIDDEN: "hidden",
    MINE: "mine",
    NUMBER: "number",
    MARKED: "marked",
}

export function createBoard(boardSize, numberOfMines) {
    let board = [];
    let minePositions = getMinePositions(boardSize, numberOfMines);
    
    for (let i = 0; i < boardSize; i++) {
        let row = [];
        for (let j = 0; j < boardSize; j++) {
            const element = document.createElement('div');
            element.dataset.status = TILE_STATUSES.HIDDEN;
           
            let tile = {
                element,
                i,
                j,
                mine: minePositions.some(positionMatch.bind(null, {i, j})),
                get status() {
                    return this.element.dataset.status;
                },
                set status(value) {
                    this.element.dataset.status = value;
                },
            }

            row.push(tile);
        }

        board.push(row);
    }
    return board;
}

export function markTile(tile) {
    if (
        tile.status !== TILE_STATUSES.HIDDEN &&
        tile.status !== TILE_STATUSES.MARKED
    ) {
        return
    }

    if (tile.status === TILE_STATUSES.MARKED) {
        tile.status = TILE_STATUSES.HIDDEN;
    } else {
        tile.status = TILE_STATUSES.MARKED;
    }
}

export function revealTile(board, tile) {
    if (tile.status !== TILE_STATUSES.HIDDEN) {
        return;
    }

    if (tile.mine) {
        tile.status = TILE_STATUSES.MINE;
        return;
    }

    tile.status = TILE_STATUSES.NUMBER;
    const adjacentTiles = nearbyTiles(board, tile);
    const mines = adjacentTiles.filter(t => t.mine);
    if (mines.length === 0) {
        adjacentTiles.forEach(revealTile.bind(null, board))
    } else {
        tile.element.textContent = mines.length;
    }
};

export function checkWin(board) {
        return board.every(row => {
            return row.every(tile => {
                return (
                    tile.status === TILE_STATUSES.NUMBER ||
                    (tile.mine &&
                    (tile.status === TILE_STATUSES.HIDDEN ||
                    tile.status === TILE_STATUSES.MARKED))
                )
            })
        })
}

export function checkLose(board) {
    return board.some(row => {
        return row.some(tile => {
            return tile.status === TILE_STATUSES.MINE;
        });
    });
}

function getMinePositions(boardSize, numberOfMines) {
    const positions = [];

    while (positions.length < numberOfMines) {
        const position = {
            i: randomNumber(boardSize),
            j: randomNumber(boardSize)
        }

        if (!positions.some(positionMatch.bind(null, position))) {
            positions.push(position);
        }
    }

    return positions;
}

function positionMatch(a, b){
    return a.i === b.i && a.j === b.j;
}

function randomNumber(size) {
    return Math.floor(Math.random() * size);
}

function nearbyTiles(board, {i, j}) {
    const tiles = [];

    for (let iOffSet = -1; iOffSet <= 1; iOffSet++) {
        for (let jOffSet = -1; jOffSet <= 1; jOffSet++) {
            const tile = board[i + iOffSet]?.[j + jOffSet];
            if (tile) tiles.push(tile);
        }
    }
    
    return tiles;
}