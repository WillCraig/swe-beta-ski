var recX = 290;
let instruction;        // used to navigate between menu, game and lost screen. 0=menu, 1=game, 3=game over screen
let startButton;        // the stat button in the start menu
let instructionsButton; // the instructions button in the start menu
let restartButton;      // the restart button in the game over screen
let rocks;              // list that will be randomly populated with obstacles during the game
let coins;
let player;
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
let paused;
let obstaclesRate;
let flakesRate;
let positionsDict = {};
let previousScores = [];
let currentTrack;
let t;

// Game setup
function setup() {
  
  createCanvas(1183, 585);
  instruction = 0;
  obstaclesRate = 0.5;
  flakesRate = 0.3;
  rocks = [];
  paused = false;
  coins = [];
  w = Math.round((1183 / 2) - 10);
  console.log("width is: " + 1183);
  console.log("height is: " + 585);

  startButton = createButton('Start');
  startButton.position(505, 585/2);
  startButton.size(100, 50);
  startButton.mousePressed(startGame);//

  startButtonInstructions = createButton('Start');
  startButtonInstructions.hide();
  
  instructionsButton = createButton('Instructions');
  instructionsButton.position(505, 350);
  instructionsButton.size(100, 50);
  instructionsButton.mousePressed(instructions);

  isRestart = false;
  rightButton = loadImage('assets/right.png');
  leftButton = loadImage('assets/left.png');
  ghost = loadImage('assets/ghost.png');
  coinCollect = loadImage('./assets/coin.jpg');
  rockA = loadImage('./assets/rock.jpg');
  treeA = loadImage('./assets/tree.jpg');
  player = loadImage('./assets/skier.png');

  tracks = [
    loadSound('./assets/soundtrack/track1.mp3'),
    loadSound('./assets/soundtrack/track2.mp3'),
    loadSound('./assets/soundtrack/track3.mp3'),
    loadSound('./assets/soundtrack/track4.mp3'),
    loadSound('./assets/soundtrack/track5.mp3'),
    loadSound('./assets/soundtrack/track6.mp3'),
    loadSound('./assets/soundtrack/track7.mp3')
  ]

  blureff = false;
  positionsDict[582] = 575;
  positionsDict[187] = 188;
  positionsDict[976] = 962;

  currentTrack = tracks[Math.floor(Math.random() * tracks.length)]
}

// changes the score
function changeScore(amt) {
  score = score + amt; 
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
  textSize(50);
  text('Haunted Hill', 427, 130);
  textSize(20);
  fill(255, 255, 255).textSize(30);
  text('Press the start button to begin the game', 320, 230);
  textFont('Georgia');
  snow();
}

function instructions() {
  // instructions page
  instruction = 4;
  background(50, 55, 100);
  textSize(20);
  fill(255, 255, 255);
  text('Move the object using the left and right arrows to avoid obstacles', 380-35, 150);
  text('Press the spacebar to pause the game', 380 + 55, 150 + 40);
  instructionsButton.hide();
  startButton.hide();

  startButtonInstructions.show();
  startButtonInstructions.position(1183/2.2, 585/1.75+30);
  startButtonInstructions.size(100, 50);
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

  if(!paused){
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
        blureff = true; // can be changed to false to bring blur effect after ghost mode (but causes lagging)
        snowflakes = [];
      }
      t = frameCount / 60; // update time
  
      if(blureff == false){
        showSnowEffect();
      }
  
  
      // dimensions of rect (which is our sprite for now)
      image(player, w, height-60, 30, 30);
      
  
      //This implementation could probably be better, it essentially uses random and the low probability of ran being above 40 to generate coins every so often
      //I did it this way so that for the most part they will not overlap
      if (random(0,41) > 40.5) {
        createCoins();
        lastRockTime = frameCount;
      } else if (frameCount - lastRockTime > 20){
        createRock();
        lastRockTime = frameCount;
      }
  
  
      console.log(height-60);
      
      for(let rock of rocks) {
  
        rock.move();
        rock.display();
  
        if(rock.y < height - 60 && rock.y > height - 60 - 24 && rock.x == positionsDict[w]){
          previousScores.push(score + "\n");
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
  
  
      for(let coin of coins) {
        coin.move();
        coin.display();
  
        console.log("coin?");
  
        if(coin.y < height - 60 && coin.y > height - 60 - 24 && coin.x == positionsDict[w]){
           var index = coins.indexOf(coin);
           if (index !== -1) {
             coins.splice(index, 1);
             changeScore(5);
           }
        }
        if(coin.y > 585) { // removing coins no longer on screen to free up memory
          var index = coins.indexOf(coin);
          if (index !== -1) {
            coins.splice(index, 1);
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
  
 
}

function showSnowEffect(){
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

function createCoins(){
  // fill the rocks list randomly
  if(random(1)<obstaclesRate) { 
    let newCoin = new Coin();
    if(blureff==true){
      newCoin.speed = 12;
    }else{
      newCoin.speed = 6;
    }
    coins.push(newCoin);
  }
}

function startGame() {
  startButtonInstructions.hide();
  instruction=1;
  text(score, 1183, 585);
  startButton.hide();
  instructionsButton.hide();
  setStartScore();

  if (!currentTrack.isPlaying()) {
    currentTrack.play()
  }
}

function loseScreen() { 

  background(50, 55, 100);
  noStroke();
  fill(255, 255, 255);
  

  scoreToShow = getHighestScore(previousScores)
  text("Game Over!", 440, 200);
  textSize(40);
  text("High Score: " + scoreToShow, 470, 250)
  
  textSize(60);
  drawingContext.filter = 'blur(0px)';
  if(!isRestart) {
    restartButton = createButton('Restart');
    isRestart = true;
  }
    
  restartButton.position(1183/2.2, 585/2);
  restartButton.size(100, 50);
  restartButton.mousePressed(restart);
  ghostTimer = 0;
  blurTimer = 0;

  currentTrack.stop();
  currentTrack = tracks[Math.floor(Math.random() * tracks.length)];
}

function ghostScreen(){
  drawingContext.filter = 'blur(0px)';
    background(50, 55, 100);
    noStroke();
    fill(255, 255, 255);
    textSize(30);
    text("Ghost mode on! Can you beat it?", 430, 260);
    image(ghost, 630, 360);
    ghost.resize(400, 0);

    if(ghostTimer>120){
      instruction=1;
    }

}

function getHighestScore(stringsArray) {
  let highestScore = -Infinity;
  for (let i = 0; i < stringsArray.length; i++) {
    let splitString = stringsArray[i].split(",");
    let score = parseInt(splitString[splitString.length - 1]);
    if (score > highestScore) {
      highestScore = score;
    }
  }
  return highestScore;
}

function keyPressed() {
  if(!paused){
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

  if(key == ' ' && instruction!=0){
    paused = !paused;
  }


}


