class Obstacle{
  constructor(){
    this.b = 50;
    this.x = 150;
    this.y = 50;
  }
  
  move(){
    
    this.y -= 3;
  }
  
  display(){
    circle(this.x, this.y, this.b, this.b);
  }
}