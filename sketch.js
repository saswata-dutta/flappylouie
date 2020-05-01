let bird;
let pipes = [];
let louie;
let score = 0;
let bgImage;
let tPipe;
let bPipe;
let gameStart = false;

function preload() {
    bgImage = loadImage('assets/background.png');
    tPipe = loadImage('assets/top.png');
    bPipe = loadImage('assets/bottom.png');
}

function setup() {
    createCanvas(600, 700);
    bird = new Bird('louie');
}

function draw() {
    background(bgImage);
    textSize(10)
    instructions = text('Instructions:', 10, 50);
    space = text('Press Space to Jump/Start', 10, 80);
    enter = text('Press Enter to Restart', 10, 110);

    if(gameStart && !bird.birdDead) {
        if(frameCount % 75 == 0) {
            pipes.push(new Pipe(tPipe, bPipe))
        }
        for(let i = pipes.length - 1; i >= 0; i--) {
            pipes[i].show();
            pipes[i].move();
            if(pipes[i].crossed(bird) && !pipes[i].done) {
                pipes[i].done = true;
                score++;
            }
            if(pipes[i].offScreen()) {
                pipes.splice(i, 1);
            }
            pipes[i].collide(bird);
        }
        bird.update();
        bird.render();
    } else {
        for(let i = pipes.length - 1; i >= 0; i--) {
            pipes[i].show();
        }
        bird.update();
        bird.render();

        if(bird.birdDead) {
            textAlign(CENTER, CENTER);
            textSize(40);
            text('YOU DEAD', width/2, height/2 - 10);
            textSize(30);
            text(`Score: ${score}`, width/2, height/2 + 30);
        }
    }  
    textAlign(LEFT)
    textSize(20)
    fill(0)
    text(score, width/2, 40)
}

function keyPressed() {
    if (keyCode === 32) {
        if(!gameStart) {
            gameStart = true;
            bird.start();
        }
        bird.jump();
    } else if (keyCode === ENTER) {
        bird = new Bird();
        pipes = [];
        score = 0;
        gameStart = false;
    } 
}