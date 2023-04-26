let coinImg;

function preload() {
    coinImg = loadImage("./assets/coin.png");
}

//function setup(){
// img = random(rockImg , treeImg);
//}
//let heights = [20, 60, 40];

class Coin {
    constructor() {
        this.b = 30; // size
        this.x = lanes[Math.floor(Math.random() * lanes.length)] // randonly choosing the lane
        this.y = heights[Math.floor(Math.random() * heights.length)]; // height
    }

    move() {
        this.y += 3;
    }

    display() {
        // let choice = obsImg[Math.floor(Math.random() * obsImg.length)]
image
        image(coinImg, this.x, this.y, this.b, this.b);
        //circle(this.x, this.y, this.b, this.b);
    }
}