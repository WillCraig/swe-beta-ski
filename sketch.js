var recX = 290;
let instruction;        // used to navigate between menu, game and lost screen. 0=menu, 1=game, 3=game over screen
let startButton;        // the stat button in the start menu
let instructionsButton; // the instructions button in the start menu
let restartButton;      // the restart button in the game over screen
let rocks;              // list that will be randomly populated with obstacles during the game
let isRestart;
var score = 0;
let rightButton;
let leftButton;
let startTime;
let startButtonInstructions;
let blurTimer = 0;
let ghostTimer = 0;
let lastRockTime = 0;
let blureff;
let obstaclesRate;
let flakesRate;
let positionsDict = {};

// Game setup
function setup() {
  createCanvas(1183, 585);
  instruction = 0;
  obstaclesRate = 0.5;
  flakesRate = 0.3;
  rocks = [];
  w = Math.round((1183 / 2) - 10);
  console.log("width is: " + 1183);
  console.log("height is: " + 585);

  startButton = createButton('Start');
  startButton.position(1183/2.2, 585/2);
  startButton.mousePressed(startGame);//

  startButtonInstructions = createButton('Start');
  startButtonInstructions.hide();
  
  instructionsButton = createButton('Instructions');
  instructionsButton.position(1183/2.3, 585/1.75);
  instructionsButton.mousePressed(instructions);

  isRestart = false;
  rightButton = loadImage('assets/right.png');
  leftButton = loadImage('assets/left.png');
  ghost = loadImage('assets/ghost.png');
  coinCollect = loadImage('./assets/coin.jpg');
  rockA = loadImage('./assets/rock.jpg');
  treeA = loadImage('./assets/tree.jpg');

  blureff = false;
  positionsDict[582] = 575;
  positionsDict[187] = 188;
  positionsDict[976] = 962;
}

// changes the score
function changeScore(amt) {
  score = score + 1; 
}

// sets the score
function setStartScore() {
  score = 0;
}

function restart() {
  instruction=1;
  setup();
  restartButton.hide();
}

function startMenu() {
  // the menu for the start and instructions button
  background(50, 55, 100);

  textSize(20);
  fill(255, 255, 255);
  text('Press the start button to begin the game', 1183/3, 585/3.2);
  snow();
}

function instructions() {
  // instructions page
  instruction = 4;
  background(50, 55, 100);
  textSize(15);
  fill(255, 255, 255);
  text('Move the object using the left and right arrows to avoid obstacles', 1183/3, 585/3.7);
  instructionsButton.hide();
  startButton.hide();

  startButtonInstructions.show();
  startButtonInstructions.position(1183/2.2, 585/1.75);
  startButtonInstructions.mousePressed(startGame);//

  //instruction button with width and heigth according to the window
  image(rightButton, 1183/2.5, 250);
  rightButton.resize(50, 0);

  image(leftButton, 1183/4, 250);
  leftButton.resize(48, 0);

  image(coinCollect, 1183/1.30, 250);
  coinCollect.resize(48, 0);
  
  image(rockA,1183/1.85, 255);
  rockA.resize(48, 0);
  
  image(treeA, 1183/1.55, 244);
  treeA.resize(48, 0);

  textSize(15);
  fill(255, 255, 255);
  text('Move Left', 1183/4.2, 320);

  textSize(15);
  fill(255, 255, 255);
  text('Move Right', 1183/2.6, 320);

  textSize(15);
  fill(255, 255, 255);
  text('avoid', 1183/1.70, 320);
  
  textSize(15);
  fill(255, 255, 255);
  text('collect', 1183/1.29, 320);
  
  
}

// score on the top right needs to be fix a little
function Score() { 
    rect(20, 15, 90, 30);
    textSize(30);
    text(score, 25, 40);
}

function draw() {  
  
  clear();
  
  if(instruction == 4) {
    instructions();
  }

  if(instruction==0) {
    // load the menu
    startMenu();
  }

  else if(instruction==1) {
    clear();
    // start the game
    blurTimer += 0.1;
    background(220);
    Score();
    line((1183/3), 0, (1183/3), height);
    line(((1183 * 2)/3), 0,  (((1183*2)/3)), height);
    stroke(126);

    if(blurTimer>60 && blurTimer<100){
      if(ghostTimer>0){ 
        drawingContext.filter = 'blur(12px)';
        blureff = true;
        flakesRate = 0.05;
      }else{ // display ghost mode screen
        instruction = 5;
      }

    }

    if(blurTimer>100){
      blurTimer = -100;
      drawingContext.filter = 'blur(0px)';
      ghostTimer = 0;
      blureff = true; // can be changed to true to bring blur effect after ghost mode (but causes lagging)
      snowflakes = [];
    }
    let t = frameCount / 60; // update time

    if(blureff == false){
      console.log("snowflakes length is " + snowflakes.length);
      // create a random number of snowflakes each frame
      if(random(1)<flakesRate) { 
        snowflakes.push(new snowflake()); // append snowflake object
      }

      // loop through snowflakes with a for..of loop
      for (let flake of snowflakes) {
        flake.update(t); // update snowflake position
        flake.display(); // draw snowflake'

        if(flake.y > 585) { // removing flakes no longer on screen to free up memory
          var index = snowflakes.indexOf(rock);
          if (index !== -1) {
            snowflakes.splice(index, 1);
            changeScore(1);
          }
        }
      }
    }


    // dimensions of rect (which is our sprite for now)
    rect(w, height-60, 24, 24);
    
    if (frameCount - lastRockTime > 20) {
      createRock();
      lastRockTime = frameCount;
    }


    console.log(height-60);
    
    for(let rock of rocks) {

      rock.move();
      rock.display();

      if(rock.y < height - 60 && rock.y > height - 60 - 24 && rock.x == positionsDict[w]){
         instruction = 3;
         }

      console.log("rocks length is: " + rocks.length);

      if(rock.y > 585) { // removing rocks no longer on screen to free up memory
        var index = rocks.indexOf(rock);
        if (index !== -1) {
          rocks.splice(index, 1);
          changeScore(1);
        }
      }


    }
  }
  else if(instruction==3) {
    loseScreen();
  }
  else if(instruction==5){
    ghostTimer += 1;
    ghostScreen();
  }
}

function createRock(){
      // fill the rocks list randomly
      if(random(1)<obstaclesRate) { 
        let newRock = new Obstacle();
        if(blureff==true){
          newRock.speed = 12;
        }else{
          newRock.speed = 6;
        }
        rocks.push(newRock);
      }
}

function startGame() {
  startButtonInstructions.hide();
  instruction=1;
  text(score, 1183, 585);
  startButton.hide();
  instructionsButton.hide();
  setStartScore();
}

function loseScreen() {
  background(50, 55, 100);
    noStroke();
    fill(255, 255, 255);
    textSize(60);
    text("Game Over", 1183/3, 585/3.2);
    drawingContext.filter = 'blur(0px)';
    if(!isRestart) {
      restartButton = createButton('Restart');
      isRestart = true;
    }
    
    restartButton.position(1183/2.2, 585/2);
    restartButton.mousePressed(restart);
    ghostTimer = 0;
    blurTimer = 0;

}

function ghostScreen(){
  drawingContext.filter = 'blur(0px)';
    background(50, 55, 100);
    noStroke();
    fill(255, 255, 255);
    textSize(30);
    text("Ghost mode on! Can you beat it?", 80,200);
    image(ghost, 200, 200);
    ghost.resize(400, 0);

    if(ghostTimer>120){
      instruction=1;
    }

}

function keyPressed() {
  // player can move rectangle left and right w/ arrow keys
  if (keyCode === RIGHT_ARROW || keyCode === 68) {
    if (w == Math.round((5*1183)/6) -10) {
      w += 0;
    }else if(w == Math.round((1183/2)-10)) {
      w = (Math.round((5*1183)/6) -10);
      console.log("new w is " + w);
    }else if(w == Math.round(1183/6 - 10)) {
      w = Math.round(1183/2 - 10);
      console.log("new w is " + w);
    }
  }
  
  if (keyCode === LEFT_ARROW || keyCode === 65) {
    //changeScore(-50) this was our first scoring procedure, and am leaving it incase something happens to the current procedure.
    if (w == (Math.round(1183/6)-10)) {
      w += 0;
      keyCode = -1;
    }else if(w == Math.round(1183/2 - 10)) {
      w = Math.round(1183/6-10);
      console.log("new w is " + w);
      keyCode = -1;
    }else if(w == Math.round(((5*1183)/6) -10)) {
      w = Math.round(1183/2 - 10);
      console.log("new w is " + w);
      keyCode = -1;
    }

  }
}


