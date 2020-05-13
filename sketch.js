let bird;
let pipes = [];
let louie;
let score = 0;
let bgImage;
let tPipe;
let bPipe;
let updated = false;
let gameStart = false;
let counter = 1;

function preload() {
    bgImage = loadImage('assets/background.png');
    tPipe = loadImage('assets/top.png');
    bPipe = loadImage('assets/bottom.png');
    louie = loadImage('assets/louie2.png');
}

function setup() {
    let canv = createCanvas(500, 550);
    canv.parent('sketch_holder')
    setUpGame();
}

function draw() {
    runGame()   
}
