# DIG5508-FinalProject
 Colorful Game of Life:
 Follows a modified version of Conway's Game of Life

 Instructions are included in a menu and can be pulled up by pressing 'i.'
 'p' will pause/ play the game (changes to the board can be made at any time)
 'x' makes a new random board
 'c' clears the board entirely

 You can click a cell to change the color and different colors correspond to neighbor counts 
 black = 0 (considered a dead cell)
 white = 1
 red = 2
 green = 3
 blue = 4

 Pressing R toggles between 2 sets of rules.
 At default the rules are as follows:
 If a cell is dead and has a 3 count for neighbors, then cell will become a count of 4 neighbors, if it has 4 neighbors it becomes a count of 3, 5 and it becomes a count of 2, 6 and it becomes a count of 1.
 If a cell has less than 4 count of neighbors or more than 10 then it dies.
 Otherwise the cell remains the same. 

This follows conway's game of life closer with a lack of randomization,

The second set of rules that can be toggled to uses a bit more randomization and the rules is as follows.
If a cell is dead and has a count of 3 neighbors then it becomes a random count from 1-4.
If a live cell has less than 2 neighbors or more than 3, then it dies.
Living cells have a 1% chance of dying randomly every turn. 
Beyond that the cell remains the same. 

This set of rules was provided because it of the visual interest provided by the introduction of a bit of random chance. 

The idea is to allow the player to modify the game of life while running to produce visually interesting patterns/animations. 

