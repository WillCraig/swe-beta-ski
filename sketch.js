// this function is kept in its barebones, for we may wish to expand it with pauses, game menu, whatever else
currentlyPlaying = true;
function currentPlaying() {
  return currentlyPlaying;
}

// the function that will draw the game menu
// it is not actually currently handled in the game code
function startMenu() {}

// the function that will draw the pause menu
function pauseMenu() {
  background(0);
  textSize(32);
  fill('white');
  text('Paused', canvas_x / 2, canvas_y / 2);
}

map_x = 25; // the number of columns
map_y = 8; // the number of rows

canvas_x = 800;
canvas_y = 400; // the dimensions of the game
                // make sure these are divisible by their respective map_x and map_y

sprite_w = canvas_x / map_x;
sprite_h = canvas_y / map_y; // the dimensions of each sprite

function setup() {
  createCanvas(canvas_x, canvas_y);
  console.log("canvas: " + canvas_x + " x " + canvas_y);
  console.log("sprite: " + sprite_w + " x " + sprite_h);
}

// will draw the background of the game
// it should flush the current screen such that we do not have any ghosts
function drawBackground() {
  background(220);
}

// this hash will contain the various obstacles generated, their position, etc
worldMatrix = []

spawn_rate = 0.1; // percentage chance of generating an enemy or obstacle
obstacle_rate = 0.75; // percentage chance of generating an obstacle

// this function will generate the next column of obstacles, enemies, etc and place it in the world matrix
// it will be guaranteed to check against placing two items in the same space
function generateNextColumn() {
  for (i = 0; i < map_y; i++) {
    spawn = Math.random() <= spawn_rate;
    if (spawn) {
      type = (Math.random() <= obstacle_rate) ? 'obstacle' : 'enemy';
      worldMatrix.push({
        x: map_x,
        y: i,
        type: type
      });
    }
  }
}

// converts a given (x, y) in the map to the graphics
function mapToGraphics(x, y) {
  return [x * sprite_w, y * sprite_h];
}

function drawEntity(entity) {
  // rect(x, y, w, h)
  x_y = mapToGraphics(entity.x, entity.y);
  x = x_y[0]; y = x_y[1];
  
  if (entity.type == 'enemy') {
    stroke('red');
  } else if (entity.type == 'obstacle') {
    stroke('orange');
  } else if (entity.type == 'player') {
    stroke('black');
  }
  
  if (entity.type != "player") { // player does not move
    entity.graphic -= (sprite_w / tick_rate);
  }
    
  rect(entity.graphic, y, sprite_w, sprite_h);
}

player = {
    x: Math.floor(map_x / 2),
    y: Math.floor(map_y / 2), // place the player in roughly the middle, always
  graphic: mapToGraphics(Math.floor(map_x / 2),0)[0],
    type: 'player'
  };

// renders the world matrix using actual assests or colored blocks or whatever
function drawWorld() {
  for (var i = 0; i < worldMatrix.length; i++) {
    drawEntity(worldMatrix[i]);
  }
  
  drawEntity(player);
}

didThePlayerLose = false; // this is a hack but i don't feel like debugging it rn

// handles the various entities, including the player
// moves them forward along in the world
// gravity, etc
// ensures the proper handling of collisions
function doPhysics() {
  for (var i = 0; i < worldMatrix.length; i++) {
    entity = worldMatrix[i];
    entity.x -= 1;
    
    entity.graphic = mapToGraphics(entity.x ,0)[0];
    
    if (entity.x < 0) {
      worldMatrix.splice(i, 1); // removes the entity seamlessly
      console.log("removed entity");
    }
    
    if (entity.x == player.x && entity.y == player.y) {
      didThePlayerLose = true;
    }
  }
}

tick_rate = 15; // the number of ticks before anything updates game-wise, e.g. movement, spawning, etc

current_tick = 0;

// the draw() function is called by p5js once per tick
// it is the game logic loop
function draw() {
  if (didThePlayerLose ){
    background(0);
    textSize(32);
    fill('white');
    text('You lost', canvas_x / 2, canvas_y / 2);
    return;
  }
  
  if (!currentPlaying()) { 
    pauseMenu();
  } else {
    if (current_tick > tick_rate) {
      generateNextColumn();
      doPhysics();
      current_tick = 0;      
    }

    drawBackground();
    drawWorld();

    current_tick += 1; // ticks do not increment when paused
  }
}

function keyPressed() {
  if (key == ' ') {
    currentlyPlaying = !currentlyPlaying; // for now toggles between ticking and not ticking the game
  }
  
  if (key == 's') {
    player.y += 1;
    if (player.y > map_y - 1) player.y = map_y - 1;
  } else if (key == 'w') {
    player.y -= 1;
    if (player.y < 0) player.y = 0;
  }
}