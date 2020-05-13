
function resetGame() {
    bird = new Bird(louie);
    pipes = [];
    score = 0;
    gameStart = false;
    updated = false; 
    pipes.push(new Pipe(tPipe, bPipe));
    counter = 1;
}

function setUpGame() {
    bird = new Bird(louie);
    pipes.push(new Pipe(tPipe, bPipe))
}

async function runGame() {
    background(bgImage);
    textSize(10)
    instructions = text('Instructions:', 10, 50);
    space = text('Press Space to Jump/Start', 10, 80);
    enter = text('Press Enter to Restart', 10, 110);

    if(gameStart && !bird.birdDead) {
        if(counter % 85 == 0) {
            pipes.push(new Pipe(tPipe, bPipe))
        }
        counter++;
        for(let i = pipes.length - 1; i >= 0; i--) {
            pipes[i].show();
            pipes[i].move();
            if(bird.crossed(pipes[i]) && !pipes[i].done) {
                pipes[i].done = true;
                score++;
            }
            if(pipes[i].offScreen()) {
                pipes.splice(i, 1);
            }
            if(pipes[i].collide(bird)) {
                bird.dead();
            }
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
            if(!updated && sessionStorage.getItem('logged') !== null) {
                let u = sessionStorage.getItem('name')
                const response = await fetch(`https://www.flappybirdbackendapi.ml/update_score?username=${u}&score=${score}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    } 
                });
                const myJson = await response.json();
                let max_score = score > myJson['output'] ? score : myJson['output']
                updated = true;
                sessionStorage.setItem('score', max_score);
                switchl();
                populate();
            }
            textAlign(CENTER, CENTER);
            textSize(40);
            text('LOUIE FAINTED', width/2, height/2 - 10);
            textSize(30);
            text(`Treats: ${score}`, width/2, height/2 + 30);
            textSize(10);
            text(`Press Enter to Restart`, width/2, height/2 + 60);
        } else if(!gameStart) {
            textAlign(CENTER, CENTER);
            textSize(30);
            text("Welcome to FlappyLouie", width/2, height/2 - 150);
            textSize(20);
            text(`Help Louie get his Chicken Treats!`, width/2, height/2 - 110);
            textSize(10);
            text(`Press Space to Start`, width/2, height/2 - 80);
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
        resetGame();
    } 
}