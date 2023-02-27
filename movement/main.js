var sphereX = 0;

function setup() {
  createCanvas(500, 500, WEBGL);
  
  line(-160, 520, -160, -520);
  line(160, 520, 160, -520);
}

function draw() {
  background(220);
  
  
  translate(sphereX, 0, 0);
  push();
  
  line(-60, 520, -60, -520);
  line(60, 520, 60, -520);
  stroke(126);
  
      // sphere will constantly rotate forward like it's rolling downhill
  rotateX(frameCount * 0.03);
  
  // dimensions of sphere
  sphere(50, 24, 24);
  
  pop();
}

function keyPressed(){
  
  // player can move sphere left and right w/ arrow keys
  
  if (keyCode === RIGHT_ARROW) {
    // rotateX(frameCount * 0.02);
    // rotateZ(frameCount * -0.01);
    
    if(sphereX==150){
      sphereX += 0;
    }else if(sphereX==0){
      sphereX = 150;
    }else if(sphereX==-150){
      sphereX = 0;
    }
  }
  
  if (keyCode === LEFT_ARROW) {
    // rotateX(frameCount * 1.02);
    // rotateZ(frameCount * -0.01);
    console.log(sphereX);
    if(sphereX==-150){
      sphereX = -150;
      keyCode = -1;
    }else if(sphereX==150){
      sphereX = 0;
      keyCode = -1;
    }
    else if(sphereX==0){
       sphereX = -150;
      keyCode = -1;
    }
  }
}
