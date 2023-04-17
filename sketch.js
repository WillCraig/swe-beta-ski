var recX = 290;
let instruction; // used to navigate between menu, game and lost screen. 0=menu, 1=game, 3=game over screen
let startButton; // the stat button in the start menu
let instructionsButton; // the instructions button in the start menu
let restartButton; // the restart button in the game over screen
let rocks; // list that will be randomly populated with obstacles during the game
let isRestart;

var score = 0;

//changes the score
function changeScore(amt){
  score = score + 1; // Here, I modified the score to change once evertime a circle is completely off of the screen.
}

function setup() {
  createCanvas(600, 500);
  instruction = 0;
  rocks = [];
  
  startButton = createButton('Start');
  startButton.position(250, 250);
  startButton.mousePressed(startGame);//
  
  instructionsButton = createButton('Instructions');
  instructionsButton.position(230, 280);
  instructionsButton.mousePressed(instructions);

  isRestart = false;

}

function restart(){
  instruction=1;
  setup();
  restartButton.hide();
}

function startMenu(){
  // the menu for the start and instructions button
  background(50, 55, 100);
  textSize(20);
  fill(255, 255, 255);
  text('Press the start button to begin the game', 110, 200);
}

function instructions(){
  // instructions page
  instruction = 4;
  background(50, 55, 100);
  textSize(20);
  fill(255, 255, 255);
  text('Move the  object using the left and right arrows to avoid obstacles', 15, 200);
  instructionsButton.hide();
  
}

// score on the top right needs to be fix a little
function Score(){ 
    rect(460, 15, 90, 30);
    textSize(30);
    text(score, 500, 40);
}

function draw() {  
  
  clear();
  
  if(instruction == 4){
    instructions();
  }
  if(instruction==0){
    // load the menu
    startMenu();
  }
  else if(instruction==1){
    clear();
    // start the game
    background(220);
    Score();
    line(200, 0, 200, height);
    line(400, 0, 400, height);
    
    stroke(126);
    
    // dimensions of rect
    rect(recX, height-60, 24, 24); // the moving character
    
    if(random(1)<0.005){ // randomly filling the rocks list
      rocks.push(new Obstacle());
    }
    
    for(let rock of rocks){
      rock.move();
      rock.display();
      if(rock.y == height-60 && rock.x == recX+10){
         instruction = 3;
         }
      if(rock.y>500){ // removing rocks no longer on screen to free up memory
        var index = rocks.indexOf(rock);
        if (index !== -1) {
          rocks.splice(index, 1);
          changeScore(1);
        }
      }
    }
  }
  else if(instruction==3){
    loseScreen();

  }
}

function startGame(){
  instruction=1;
  text(score, 540, 40);
  startButton.hide();
  instructionsButton.hide();
  
}

function loseScreen() {
  background(50, 55, 100);
    noStroke();
    fill(255, 255, 255);
    textSize(60);
    text("Game Over", 130,200);
    if(!isRestart){
      restartButton = createButton('Restart');
      isRestart = true;
    }
    
    restartButton.position(255, 280);
    restartButton.mousePressed(restart);
  
}

function keyPressed(){
  
  // player can move rectangle left and right w/ arrow keys
  
  if (keyCode === RIGHT_ARROW || keyCode === 68) {
    //changeScore(50) this was our first scoring procedure, and am leaving it incase something happens to the current procedure.
    if(recX==490){
      recX += 0;
    }else if(recX==290){
      recX = 490;
    }else if(recX==90){
      recX = 290;
    }
  }
  
  if (keyCode === LEFT_ARROW || keyCode === 65) {
    //console.log(recX);
    //changeScore(-50) this was our first scoring procedure, and am leaving it incase something happens to the current procedure.
    if(recX==90){
      recX +=0;
      keyCode = -1;
    }else if(recX==290){
      recX = 90;
      keyCode = -1;
    }
    else if(recX==490){
      recX = 290;
      keyCode = -1;
    }
  }
}
