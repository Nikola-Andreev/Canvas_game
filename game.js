<!DOCTYPE html>
<html>
<head>
<title>Space Shooter</title>

<style>
canvas {
    background-image: url(images/space2.png);
    border: 2px solid black;
    background-size: cover;
}

#rocket {
    background-color: yellow;
    width: 3px;
    height: 10px;
    position: absolute;
    margin-left: 23px;
}

#hero {
    background-image: url('images/player.png');
    width: 59px;
    height: 58px;
    position: absolute;
}

#refresh{
    color: red;
    font-size: 20px;
    position: absolute;
    left: 240px;
    top: 300px;
    display:none;
    z-index:2;
    margin-left: 40px;
}

.enemy {
    background-image: url('images/Planet 01.png');
    width: 40px;
    height: 40px;
    position: absolute;
    margin-left: 12px;
}
.enemy2 {
    background-image: url('images/Planet 02.png');
    width: 40px;
    height: 40px;
    position: absolute;
    margin-left: 12px;
}
.enemy3 {
    background-image: url('images/Planet 03.png');
    width: 40px;
    height: 40px;
    position: absolute;
    margin-left: 12px;
}

#score {
    color: blue;
    font-size: 18pt;
    position: absolute;
    left: 20px;
    top: 20px;
    z-index:2;
}

#gameover {
    color: red;
    font-size: 45px;
    position: absolute;
    left: 205px;
    top: 240px;
    visibility: hidden;
    z-index:2;
}
#health{
    color: green;
}
</style>
</head>
<body onload="init()">
    <!-- The canvas for the panning background -->
<canvas id="background" width="640" height="610"></canvas>

    <div id="hero"></div>
    <div id="rocket"></div>
    <div id="score"></div>
    <div id="gameover">GAME OVER</div>
<div id="health"></div>
    <button id="refresh" onclick="playAgain()">Play Again</button>

<script>

let game = new Game()
let gameIsOver = false
function init() {
    if(game.init())
        game.start()
}

let imageRepository = new function() {
    // Define images
    this.empty = null
    this.background = new Image()

    // Set images src
    this.background.src = "space2.png"
}
function Drawable() {
    this.init = function(x, y) {
        // Defualt variables
        this.x = x
        this.y = y
    }

    this.speed = 0
    this.canvasWidth = 0
    this.canvasHeight = 0

    // Define abstract function to be implemented in child objects
    this.draw = function() {
    }
}

function Background() {
    this.speed = 1 // Redefine speed of the background for panning

    // Implement abstract function
    this.draw = function() {
        // Pan background
        this.y += this.speed
        this.context.drawImage(imageRepository.background, this.x +140, this.y)
        // Draw another image at the top edge of the first image
        this.context.drawImage(imageRepository.background, this.x, this.y - this.canvasHeight -60)
        // If the image scrolled off the screen, reset
        if (this.y >= this.canvasHeight)
            this.y = 0
    };
}
// Set Background to inherit properties from Drawable
Background.prototype = new Drawable()

function Game() {
    this.init = function() {
        // Get the canvas element
        this.bgCanvas = document.getElementById('background');
        // Test to see if canvas is supported
        if (this.bgCanvas.getContext) {
            this.bgContext = this.bgCanvas.getContext('2d')
            // Initialize objects to contain their context and canvas
            Background.prototype.context = this.bgContext;
            Background.prototype.canvasWidth = this.bgCanvas.width;
            Background.prototype.canvasHeight = this.bgCanvas.height;
            // Initialize the background object
            this.background = new Background()
            this.background.init(0,0) // Set draw point to 0,0
            return true;
        } else {
            return false;
        }
    }
    // Start the animation loop
    this.start = function() {
        animate();
    }
}
