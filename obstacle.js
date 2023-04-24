let lanes = [100, 300, 500];
let rockImg;

 function preload(){
	rockImg = loadImage("rock.jpg");
    treeImg = loadImage("tree.jpg")
}
//function setup(){
 // img = random(rockImg , treeImg);
//}
let heights = [20,60,40];

class Obstacle{
  constructor(){
    this.b = 30; // size
    this.x = lanes[Math.floor(Math.random()*lanes.length)] // randonly choosing the lane
    this.y = heights[Math.floor(Math.random()*heights.length)]; // height
  }
  
  move(){
    this.y += 3;
  }

  display(){
    image(rockImg, this.x, this.y, this.b , this.b);
    //circle(this.x, this.y, this.b, this.b);
  }
}
