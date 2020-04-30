let bird;
let pipes = [];
let louie;
let score = 0;
let bgImage;

function preload() {
    bgImage = loadImage('assets/background.png');
}

function setup() {
    createCanvas(600, 700);

    
    bird = new Bird('louie');
    pipes.push(new Pipe());
}

function draw() {
    background(bgImage);
    textSize(10)
    instructions = text('Instructions:', 10, 50);
    space = text('Press Space to Jump', 10, 80);
    enter = text('Press Enter to Restart', 10, 110);
    if(!bird.birdDead) {
        bird.update();
        bird.render();
            
        if(frameCount % 75 == 0) {
            pipes.push(new Pipe())
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

    } else {
        bird.update();
        bird.render();
    
        for(let i = pipes.length - 1; i >= 0; i--) {
            pipes[i].show();
        }
    }  
    
    textSize(20)
    fill(0)
    text(score, width/2, 40)
}

function keyPressed() {
    if (keyCode === 32) {
        bird.jump();
    } else if (keyCode === ENTER) {
        bird = new Bird();
        pipes = [];
        score = 0;
    } 
}