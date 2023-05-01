let lanes = [188, 575, 962];
let coinImg;
let obsImg = [];

function preload() {

    coinImg = loadImage("./assets/coin.jpg");
    obsImg = [
        loadImage("./assets/rock.jpg"),
        loadImage("./assets/tree.jpg"),
    ]


}

let heights = [20, 60, 40];

class Obstacle {
    constructor() {
        this.b = 30; // size
        this.x = lanes[Math.floor(Math.random() * lanes.length)] // randonly choosing the lane
        this.y = heights[Math.floor(Math.random() * heights.length)]; // height
        this.speed = 6;
        this.choice = obsImg[Math.floor(Math.random() * obsImg.length)]
    }

    move() {
        this.y += this.speed;
    }

    display() {

        image(this.choice, this.x, this.y, this.b, this.b);
        //circle(this.x, this.y, this.b, this.b);
    }
}

class Coin{
    constructor() {
        this.b = 30; // size
        this.x = lanes[Math.floor(Math.random() * lanes.length)] // randonly choosing the lane
        this.y = heights[Math.floor(Math.random() * heights.length)]; // height
        this.speed = 6;
    }
  
    move() {
        this.y += this.speed;
    }
  
    display() {
      image(coinImg, this.x, this.y, this.b, this.b);
    }
  }