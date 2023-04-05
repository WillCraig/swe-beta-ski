var sphereX = 0;
let obstacle;

function setup() {
  createCanvas(600, 500);
  obstacle = new Obstacle();
}

function draw() {
  background(220);
  
  line(200, 0, 200, height);
  line(400, 0, 400, height);
  
  translate(sphereX, 0, 0);
  push();
  
  stroke(126);
  
  
  // dimensions of rect
  rect(290, height-60, 24, 24);
  
  pop();
}

function keyPressed(){
  
  // player can move sphere left and right w/ arrow keys
  
  if (keyCode === RIGHT_ARROW) {
    
    if(sphereX==200){
      sphereX += 0;
    }else if(sphereX==0){
      sphereX = 200;
    }else if(sphereX==-200){
      sphereX = 0;
    }
  }
  
  if (keyCode === LEFT_ARROW) {
    console.log(sphereX);
    if(sphereX==-200){
      sphereX = -200;
      keyCode = -1;
    }else if(sphereX==200){
      sphereX = 0;
      keyCode = -1;
    }
    else if(sphereX==0){
       sphereX = -200;
      keyCode = -1;
    }
  }
}