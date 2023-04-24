let lanes = [100, 300, 500];
let rockImg;
let obsImg = []

function preload() {

    obsImg = [
        loadImage("./assets/rock.jpg"),
        loadImage("./assets/tree.jpg")
    ]
    // rockImg = loadImage("/assets/rock.jpg");
    // treeImg = loadImage("/assets/tree.jpg")

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
        this.choice = obsImg[Math.floor(Math.random() * obsImg.length)]
    }

    move() {
        this.y += 3;
    }

    display() {
        // let choice = obsImg[Math.floor(Math.random() * obsImg.length)]

        image(this.choice, this.x, this.y, this.b, this.b);
        //circle(this.x, this.y, this.b, this.b);
    }
}
