let lanes = [100, 300, 500];
let rockImg;

 function preload(){
	rockImg = loadImage("rock.jpg");
    treeImg = loadImage("tree.jpg")
}
//function setup(){
 // img = random(rockImg , treeImg);
//}

class Obstacle{
  constructor(){
    this.b = 30; // size
    this.x = lanes[Math.floor(Math.random()*lanes.length)] // randonly choosing the lane
    this.y = 20; // height
  }
  
  move(){
    this.y += 3;
  }

  display(){
    image(rockImg, this.x, this.y, this.b , this.b);
    //circle(this.x, this.y, this.b, this.b);
  }
}
