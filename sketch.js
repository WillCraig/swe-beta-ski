
  
// this function is kept in its barebones, for we may wish to expand it with pauses, game menu, whatever else
currentlyPlaying = false;
function currentPlaying() {
  return currentlyPlaying;
}

// the function that will draw the game menu
function startMenu() {}

// the function that will draw the pause menu
function pauseMenu() {}

function setup() {
  createCanvas(400, 400);
  startMenu();
}

// the draw() function is called by p5js once per tick
// it is the game logic loop
function draw() {
  if (!currentPlaying()) {
    pauseMenu();
    return;
  }
}

function keyPressed() {
}