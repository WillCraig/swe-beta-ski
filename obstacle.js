let lanes = [188, 575, 962];
let rockImg;
let obsImg = []

function preload() {

    obsImg = [
        loadImage("./assets/rock.jpg"),
        loadImage("./assets/tree.jpg"),
        //loadImage("./assests/coin.jpg")
    ]

}

//function setup(){
// img = random(rockImg , treeImg);
//}
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
        // let choice = obsImg[Math.floor(Math.random() * obsImg.length)]

        image(this.choice, this.x, this.y, this.b, this.b);
        //circle(this.x, this.y, this.b, this.b);
    }
}
