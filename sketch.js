// so, as an example, we will have 8 lanes
// each lane is thus 100 pixels wide
// each lane has 20 steps, each step being 20 pixels wide
// each step may or may not have an obstacle
// the player starts at one end and must make it to the other
// as the player makes it, each round goes faster and generates more obstacle


lanes = 8;
steps = 20;

canvas_width = 100 * lanes;
canvas_height = 20 * steps;

function setup() {
  createCanvas(canvas_width, canvas_height);
}

player_lane = 4;
player_step = 20;


// takes (lane, step) and draw the black player box there
function laneStepToPlayer(lane, step) {
  // rect(x, y, w, h)
  
  noStroke();
  fill("black");
  x = (lane - 1) * (canvas_width / lanes);
  y = (step - 1) * (canvas_height / steps);
  w = (canvas_width / lanes);
  h = (canvas_height / steps);
    
  rect(x,y,w,h);
}

round_speed = 15;
spawn_rate = 15;

tick = 0;

playing = false;
  
function draw() {
  if (!playing) {
    textSize(20);
    text('Press the space bar to begin.', 15, 100);
    return;
  }
  background(255);
  for (i = 7; i < lanes; i++) {
    stroke("black");
    strokeWeight(5);
    line(i*(canvas_width/lanes),0, i*(canvas_width/lanes),canvas_width);
        
    /*strokeWeight(1)
    for (k = 1; k < steps; k++) {
      stroke((255/lanes)*i,(255/steps) * k,150);
      strokeWeight(1);
      line(i*(canvas_width/lanes),k*(canvas_height/steps), (i-1)*(canvas_width/lanes), k*(canvas_height/steps));
    }*/
  }
  
  laneStepToPlayer(player_lane, player_step);
  
  if (tick > round_speed) {
    tick = 0;
    player_step -= 1;
  }
  
  if (player_step == 1) {
    background(255);
    console.log("victory");
    text('You won. There will be more enemies and you will move twice as fast.', 45, 150);
    
    
    player_lane = 4;
    player_step = 20;
    round_speed /= 2;
    spawn_rate += 15;
    
    
    playing = false;
  }
  
  tick += 1;
}

function keyPressed() {
  if (key == 'd') {
    player_lane += 1;
  }else if (key== 'a') {
    player_lane -= 1;
  } else if (key == ' ') {
    playing = true;
  }
  
  if (player_lane > lanes - 1) player_lane = lanes - 1;
  if (player_lane < 1) player_lane = 1;
  
  console.log("lane " + player_lane + " step " + player_step);
}