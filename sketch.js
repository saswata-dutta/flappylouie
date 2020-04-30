let bird;
let pipes = [];
let louie;

function setup() {
    createCanvas(700, 700);
    bird = new Bird('louie');
    pipes.push(new Pipe());
}

function draw() {
    background(112,197, 206);
    if(!bird.birdDead) {
        bird.update();
        bird.render();
            
        if(frameCount % 75 == 0) {
            pipes.push(new Pipe())
        }
        
        for(let i = pipes.length - 1; i >= 0; i--) {
            pipes[i].show();
            pipes[i].move();
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
            // pipes[i].move();
            // if(pipes[i].offScreen()) {
            //     pipes.splice(i, 1);
            // }
            // pipes[i].collide(bird);
        }
    }   
}

function keyPressed() {
    if (keyCode === 32) {
        bird.jump();
    } else if (keyCode === ENTER) {
        bird = new Bird();
        pipes = [];
    } 
}