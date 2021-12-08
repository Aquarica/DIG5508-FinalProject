let grid;
let cols, rows;
let resolution = 10;
let nonRandomizeRules = true;
let startGame = false;
let infoMenu = false;
let tipText;
let menuText = "Press 'i' for info";
let textColor = 220;

function setup() {
    createCanvas(600, 400);
    cols = width / resolution;
    rows = height / resolution;
    gridSet = new LifeBoard(cols, rows);
    gridSet.createRandomArray();
}

function draw() {
    background(0);
    gridSet.colorChange();
    if (startGame) {
        gridSet.nextGridCompute();
    }
    textManage();
}

function textManage() {
    if (infoMenu) {
        tipText = " "
    } else {
        tipText = "Info... \n i: toggle menu \n p: pause/play \n x: new random board \n c: clear board \n r: toggle rule randomization \n click: change cell color"
        fill(50)
        rectMode(CENTER)
        rect(width / 2, height / 2, 300, 200, 20)

        strokeWeight(3)
        textSize(20)
        fill(textColor)
        textAlign(LEFT, CENTER);
        text(tipText, width / 2 - 130, height / 2);
    }

    textSize(14)
    textAlign(LEFT, TOP);
    fill(textColor)
    strokeWeight(3)
    text(menuText, 5, 5);

    strokeWeight(0.5)
    rectMode(CORNER)
}

function mousePressed() {
    //console.log(grid[floor(mouseX / resolution)][floor(mouseY / resolution)])
    grid[floor(mouseX / resolution)][floor(mouseY / resolution)] += 1;

    if (grid[floor(mouseX / resolution)][floor(mouseY / resolution)] > 4) {
        grid[floor(mouseX / resolution)][floor(mouseY / resolution)] = 0;
    }
}

//GAME CONTROLS
function keyPressed() {
    //starts and pauses game
    if (keyCode === 80) {
        startGame = !startGame;
    }

    // if (keyCode === LEFT_ARROW) {
    //     if (resolution >= 5) {
    //         resolution = resolution - 1;
    //         console.log(resolution);
    //         cols = width / resolution;
    //         rows = height / resolution;
    //         gridSet = new LifeBoard(cols, rows);
    //         gridSet.createRandomArray();
    //     }
    // }
    // if (keyCode === RIGHT_ARROW) {
    //     if (resolution <= 20) {
    //         resolution = resolution + 1;
    //         console.log(resolution);
    //     }
    // }

    //clears the board
    if (keyCode === UP_ARROW) {
        gridSet.boardClear()
    }
    //makes new random array
    if (keyCode === DOWN_ARROW) {
        gridSet.createRandomArray()
    }
    //r key, makes it so rules can have some randomization
    if (keyCode === 82) {
        nonRandomizeRules = !nonRandomizeRules;
    }
    //i key
    if (keyCode === 73) {
        infoMenu = !infoMenu;
        //console.log(infoMenu);
    }
}


//Manages the Board and it's functions
class LifeBoard {
    constructor(cols, rows) {
        this.cols = cols;
        this.rows = rows;

    }
    make2DArray() {
        let arr = new Array(this.cols);
        for (let i = 0; i < arr.length; i++) {
            arr[i] = new Array(this.rows);
        }
        return arr;
    }
    createRandomArray() {
        grid = this.make2DArray(this.cols, this.rows);
        for (let i = 0; i < this.cols; i++) {
            for (let j = 0; j < this.rows; j++) {
                let randomNumber = floor(random(10));
                if (randomNumber > 0) {
                    grid[i][j] = floor(random(2));
                } else {
                    grid[i][j] = floor(random(5));
                }
            }
        }
    }

    //neighbor count is used to determine life/death of cell in nextGrid Compute
    countNeighbors(grid, x, y) {
        let sum = 0;
        for (let i = -1; i < 2; i++) {
            for (let j = -1; j < 2; j++) {
                let col = (x + i + cols) % this.cols;
                let row = (y + j + rows) % this.rows;
                sum += grid[col][row];
            }
        }
        sum -= grid[x][y];
        return sum;
    }

    //this is run every frame the game isn't paused
    nextGridCompute() {
        let next = this.make2DArray(this.cols, this.rows);
        // Compute next based on grid
        for (let i = 0; i < this.cols; i++) {
            for (let j = 0; j < this.rows; j++) {
                let state = grid[i][j];
                // Count neighbors 
                let sum = 0;
                let neighbors = this.countNeighbors(grid, i, j);
                if (nonRandomizeRules) {
                    if (state == 0 && neighbors == 3) {
                        next[i][j] = 4;
                    } else if (state == 0 && neighbors == 4) {
                        next[i][j] = 3;
                    } else if (state == 0 && neighbors == 5) {
                        next[i][j] = 2;
                    } else if (state == 0 && neighbors == 6) {
                        next[i][j] = 1;
                    }
                    else if (state >= 1 && (neighbors < 4 || neighbors > 10)) {
                        next[i][j] = 0;
                    }
                    else {
                        next[i][j] = state;
                    }
                } else {
                    if (state == 0 && neighbors == 3) {
                        next[i][j] = floor(random(5));
                    } else if (state == 1 && (neighbors < 2 || neighbors > 3)) {
                        next[i][j] = 0;
                    }
                    //COLOR CELLS HAVE 1% CHANCE OF DEATH seems to go against game of life, might remove
                    else if (state > 0 && random(100) < 1) {
                        next[i][j] = 0;
                    }
                    else {
                        next[i][j] = state;
                    }
                }
            }
        }

        grid = next;
    }
    colorChange() {
        for (let i = 0; i < this.cols; i++) {
            for (let j = 0; j < this.rows; j++) {
                let x = i * resolution;
                let y = j * resolution;
                if (grid[i][j] == 1) {
                    fill(255);
                    stroke(0);
                    rect(x, y, resolution - 1, resolution - 1);
                }
                if (grid[i][j] == 2) {
                    fill(255, 0, 0);
                    stroke(0);
                    rect(x, y, resolution - 1, resolution - 1);
                }
                if (grid[i][j] == 3) {
                    fill(0, 255, 0);
                    stroke(0);
                    rect(x, y, resolution - 1, resolution - 1);
                }
                if (grid[i][j] == 4) {
                    fill(0, 0, 255);
                    stroke(0);
                    rect(x, y, resolution - 1, resolution - 1);
                }


            }
        }
    }

    boardClear() {
        for (let i = 0; i < cols; i++) {
            for (let j = 0; j < rows; j++) {
                grid[i][j] = 0;
            }
        }
    }
}