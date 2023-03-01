
  
// this function is kept in its barebones, for we may wish to expand it with pauses, game menu, whatever else
currentlyPlaying = false;
function currentPlaying() {
  return currentlyPlaying;
}

// the function that will draw the game menu
// it is not actually currently handled in the game code
function startMenu() {}

// the function that will draw the pause menu
function pauseMenu() {}

function setup() {
  createCanvas(400, 400);
}

// will draw the background of the game
// it should flush the current screen such that we do not have any ghosts
function drawBackground() {}

// this hash will contain the various obstacles generated, their position, etc
worldMatrix = []

// this function will generate the next column of obstacles, enemies, etc and place it in the world matrix
// it will be guaranteed to check against placing two items in the same space
function generateNextColumn() {}

// renders the world matrix using actual assests or colored blocks or whatever
function drawWorld() {}

// handles the various entities, including the player
// moves them forward along in the world
// gravity, etc
function doPhysics() {}

// the draw() function is called by p5js once per tick
// it is the game logic loop
function draw() {
  if (!currentPlaying()) {
    pauseMenu();
    return;
  }
  
  doPhysics();
  generateNextColumn();
  
  drawBackground();
  drawWorld();
}

function keyPressed() {}