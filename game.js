const TILE_STATUSES = {
    HIDDEN: "hidden",
    MINE: "mine",
    NUMBER: "number",
    MARKED: "marked",
}

export function createBoard(boardSize, numberOfMines) {

    for (let i = 0; i < boardSize; i++) {
        let row = [];
        for (let j = 0; j < boardSize; j++) {
            const element = document.createElement('div');
            element.dataset.status =  TILE_STATUSES.HIDDEN;
           
            let tile = {
                i,
                j,
                get status() {
                    return this.element.dataset.status 
                },
                set status(value) {
                    this.element.dataset.status = value;
                }
            }

            row.push(tile);
        }

        board.push(row);
    }
    return board;
}

