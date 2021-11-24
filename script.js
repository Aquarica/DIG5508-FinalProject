let grid;
let cols;
let rows;
let resolution = 10;
let startGame = false;
let gameState = "Click Cell to Change Color \n Left arrow to start \n Right arrow to pause "

function make2DArray(cols, rows) {
    let arr = new Array(cols);
    for (let i = 0; i < arr.length; i++) {
        arr[i] = new Array(rows);
    }
    return arr;
}



function setup() {
    createCanvas(600, 400);
    cols = width / resolution;
    rows = height / resolution;

    createRandomArray();
}

function draw() {
    background(0);

    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            let x = i * resolution;
            let y = j * resolution;
            if (grid[i][j] == 1) {
                fill(255);
                stroke(0);
                rect(x, y, resolution - 1, resolution - 1);
            }
        }
    }

    if (startGame) {
        nextGridCompute();
        gameState = " "
    }
    fill(50, 200, 100)
    textSize(30)
    strokeWeight(4)
    text(gameState, width / 2, height / 2);
    textAlign(CENTER);
    strokeWeight(0.5)

    function nextGridCompute() {
        let next = make2DArray(cols, rows);

        // Compute next based on grid
        for (let i = 0; i < cols; i++) {
            for (let j = 0; j < rows; j++) {
                let state = grid[i][j];
                // Count neighbors 
                let sum = 0;
                let neighbors = countNeighbors(grid, i, j);

                if (state == 0 && neighbors == 3) {
                    next[i][j] = 1;
                } else if (state == 1 && (neighbors < 2 || neighbors > 3)) {
                    next[i][j] = 0;
                } else {
                    next[i][j] = state;
                }
            }
        }

        grid = next;
    }
}

function countNeighbors(grid, x, y) {
    let sum = 0;
    for (let i = -1; i < 2; i++) {
        for (let j = -1; j < 2; j++) {
            let col = (x + i + cols) % cols;
            let row = (y + j + rows) % rows;
            sum += grid[col][row];
        }
    }
    sum -= grid[x][y];
    return sum;
}

function mousePressed() {
    console.log(grid[floor(mouseX / resolution)][floor(mouseY / resolution)])
    // if (grid[floor(mouseX / resolution)][floor(mouseY / resolution)] == 1) {
    //     grid[floor(mouseX / resolution)][floor(mouseY / resolution)] = 0;
    // }
    if (grid[floor(mouseX / resolution)][floor(mouseY / resolution)] == 0) {
        grid[floor(mouseX / resolution)][floor(mouseY / resolution)] += 1;
    }
    else {
        grid[floor(mouseX / resolution)][floor(mouseY / resolution)] = 0;
    }


}

//FOR pausing and starting the game again
function keyPressed() {
    if (keyCode === LEFT_ARROW) {
        startGame = true;
    }
    if (keyCode === RIGHT_ARROW) {
        startGame = false;
        gameState = "Paused \n Tip: Up arrow clears board, \n down makes new random board"
    }
    if (keyCode === UP_ARROW) {
        for (let i = 0; i < cols; i++) {
            for (let j = 0; j < rows; j++) {
                grid[i][j] = 0;
            }
        }
    }
    if (keyCode === DOWN_ARROW) {
        for (let i = 0; i < cols; i++) {
            for (let j = 0; j < rows; j++) {
                grid[i][j] = floor(random(2));
            }
        }
    }
}

function createRandomArray() {
    grid = make2DArray(cols, rows);
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            grid[i][j] = floor(random(2));
        }
    }
}