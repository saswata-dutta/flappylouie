const population = 350;
let generationCount = 1;
let gen;
let rem;
let best;
let birds = [];
let saved = [];
let networkSketch;
let bestCurrBird;
let bestCurrScore;
let slider = 1;
let trainingStart = false;

function nextGeneration() {
    calculateFitnessSoftmax();
    for(let i = 0; i < population; i++) {
        birds[i] = pickOne();
    }
    saved = [];
}

function pickOne() {
    let index = 0;
    let r = random(1);

    while(r > 0) {
        r = r - saved[index].fitness;
        index++;
    }

    index--;
    let bird = saved[index]
    let child = new Bird(louie, bird.brain, 'nn');
    child.mutate(0.1);
    return child;
}

function calculateFitnessSoftmax() {
    let sum = 0;

    // Make score exponentially better?
    for (let i = 0; i < birds.length; i++) {
        birds[i].score = pow(birds[i].score, 10);
    }

    for(let bird of saved) {
        sum += Math.exp(bird.score);
    }

    for(let bird of saved) {
        bird.fitness = Math.exp(bird.score) / sum;
    }
}


function runGame() {
    geneticDisplay(); 
    if(trainingStart) {
        for(let s = 0; s < slider; s++) {
            rem.textContent = birds.length;
            geneticLogic();
        }
    } else {
        textAlign(CENTER, CENTER);
        textSize(30);
        text("Press ENTER to start training", width/2, height/2 - 150);
        networkSketch.showWeights(1);
    }
}

function setUpGame() {
    gen = document.querySelector('.gen');
    rem = document.querySelector('.rem');
    best = document.querySelector('.best')
    networkSketch = new p5(network, 'network_holder');
    for(let i = 0; i < population; i++) {
        birds.push(new Bird(louie, false, 'nn'));
    }
    bestCurrScore = 0;
    counter = 0;
}


function geneticLogic() {
    if(counter % 85 == 0) {
        pipes.push(new Pipe(tPipe, bPipe))
    }
    counter++;
    for(let i = pipes.length - 1; i >= 0; i--) {
        pipes[i].move();

        for(let j = birds.length - 1; j >= 0; j--) {
            if(j >= 0 && pipes[i].collide(birds[j])) {
                saved.push(birds.splice(j, 1)[0]);
            }
        }
        if(pipes[i].offScreen()) {
            pipes.splice(i, 1);
        }
    }
    for(let j = birds.length - 1; j >= 0; j--) {
        if(birds[j].hitGround()) {
            saved.push(birds.splice(j, 1)[0]);
        } else {
            birds[j].update();    
            birds[j].think(pipes);
            if(birds[j].score > bestCurrScore) {
                bestCurrBird = birds[j];
                bestCurrScore = birds[j].score;
                networkSketch.showWeights(bestCurrBird);
            }
        }
    }

    if(birds.length == 0) {
        gen.textContent = generationCount;
        nextGeneration();
        best.textContent = bestCurrBird.score;
        generationCount++;
        pipes = [];
        counter = 1;
        bestCurrBird = null;
        bestCurrScore = 0;
        pipes.push(new Pipe(tPipe, bPipe))
    }
}

function geneticDisplay() {
    background(bgImage);
    for(let bird of birds) {
        bird.render();
    }
    for(let pipe of pipes) {
        pipe.show();
    }
}


function updateSlider(val) {
    slider = val;
}

function keyPressed() {
    if (keyCode === ENTER) {
        if(!trainingStart) {
            trainingStart = true;
        }
    }
}