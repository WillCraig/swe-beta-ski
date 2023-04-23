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
let startButtonInstructions;

// Game setup
function setup() {
  createCanvas(600, 500);
  instruction = 0;
  rocks = [];
  
  startButton = createButton('Start');
  startButton.position(250, 250);
  startButton.mousePressed(startGame);//

  startButtonInstructions = createButton('Start');
  startButtonInstructions.hide();
  
  instructionsButton = createButton('Instructions');
  instructionsButton.position(230, 280);
  instructionsButton.mousePressed(instructions);

  isRestart = false;
  rightButton = loadImage('assets/right.png');
  leftButton = loadImage('assets/left.png');

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
  text('Press the start button to begin the game', 110, 200);
  snow();
}

function instructions() {
  // instructions page
  instruction = 4;
  background(50, 55, 100);
  textSize(15);
  fill(255, 255, 255);
  text('Move the object using the left and right arrows to avoid obstacles', 70, 200);
  instructionsButton.hide();
  startButton.hide();

  startButtonInstructions.show();
  startButtonInstructions.position(250, 350);
  startButtonInstructions.mousePressed(startGame);//

  image(rightButton, 300, 250);
  rightButton.resize(50, 0);

  image(leftButton, 200, 250);
  leftButton.resize(48, 0);

  textSize(15);
  fill(255, 255, 255);
  text('Move Left', 190, 320);

  textSize(15);
  fill(255, 255, 255);
  text('Move Right', 290, 320);


  
}

// score on the top right needs to be fix a little
function Score() { 
    rect(460, 15, 90, 30);
    textSize(30);
    text(score, 500, 40);
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
    background(220);
    Score();
    line(200, 0, 200, height);
    line(400, 0, 400, height);
    stroke(126);

    let t = frameCount / 60; // update time

    // create a random number of snowflakes each frame
    for (let i = 0; i < random(5); i++) {
      snowflakes.push(new snowflake()); // append snowflake object
    }

    // loop through snowflakes with a for..of loop
    for (let flake of snowflakes) {
      flake.update(t); // update snowflake position
      flake.display(); // draw snowflake
    }
    
    // dimensions of rect (which is our sprite for now)
    rect(recX, height-60, 24, 24);
    
    // fill the rocks list randomly
    if(random(1)<0.02) { 
      rocks.push(new Obstacle());
    }

    console.log(height-60);
    
    for(let rock of rocks) {
      rock.move();
      rock.display();
      console.log("new rock");
      console.log(rock.y);

      if(rock.y < height - 60 && rock.y > height - 60 - 24 && rock.x == recX + 10){
         instruction = 3;
         }
      if(rock.y > 500) { // removing rocks no longer on screen to free up memory
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
}

function startGame() {
  startButtonInstructions.hide();
  instruction=1;
  text(score, 540, 40);
  startButton.hide();
  instructionsButton.hide();
  setStartScore();
}

function loseScreen() {
  background(50, 55, 100);
    noStroke();
    fill(255, 255, 255);
    textSize(60);
    text("Game Over", 130,200);
    if(!isRestart) {
      restartButton = createButton('Restart');
      isRestart = true;
    }
    
    restartButton.position(255, 280);
    restartButton.mousePressed(restart);
  
}

function keyPressed() {
  
  // player can move rectangle left and right w/ arrow keys
  if (keyCode === RIGHT_ARROW || keyCode === 68) {
    if (recX == 490) {
      recX += 0;
    }else if(recX == 290) {
      recX = 490;
    }else if(recX == 90) {
      recX = 290;
    }
  }
  
  if (keyCode === LEFT_ARROW || keyCode === 65) {
    //console.log(recX);
    //changeScore(-50) this was our first scoring procedure, and am leaving it incase something happens to the current procedure.
    if (recX == 90) {
      recX += 0;
      keyCode = -1;
    }else if(recX == 290) {
      recX = 90;
      keyCode = -1;
    }else if(recX == 490) {
      recX = 290;
      keyCode = -1;
    }
  }
}
