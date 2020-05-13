class Bird {
    constructor(img, brain, type='normal') {
        this.x = 200;
        this.y = height/2;
        this.gravity = 0.6;
        this.lift = -16;
        this.velocity = 0;
        this.radius = 35 ;
        this.topPos = 0;
        this.bottomPos = 0;
        this.birdDead = false;
        this.img = img; 
        
        this.score = 0;
        this.fitness = 0;
        this.numberCrossed = 0;

        if(type === 'normal') {
            this.gravity = 0;
            this.lift = 0;
            this.velocity = 0;
        }

        if(brain) {
            this.brain = brain.copy();
        } else {
            this.brain = new NeuralNetwork(6,6,2);
        }
    }

    hitGround() {
        return this.y + this.radius >= height - 20;
    }

    crossed(pipe) {
        if(this.x - this.radius > pipe.x + pipe.w) {
            return true;
        }
        return false;
    }

    think(pipes) {
        let closest = null
        let closeD = Infinity;
        for(let pipe of pipes) {
            let diff = (pipe.x + pipe.w) - (this.x - this.radius);
            if(diff > 0  && diff < closeD) {
                closeD = diff;
                closest = pipe;
            }
        }
        let inputs = [];
        inputs.push((closest.x - this.x + this.radius) / width);
        inputs.push((closest.top + (closest.w / 2)) / width);
        inputs.push((closest.top) / height);
        inputs.push((closest.bottom) / height);
        inputs.push(this.velocity / 10);
        inputs.push(this.y / height);

        let output = this.brain.predict(inputs);
        if(output[0] > output[1]) {
            this.jump();
        }
    }

    mutate(v) {
        this.brain.mutate(v);
    }

    update() {
        this.score++;
        this.velocity += this.gravity;
        this.velocity *= 0.95
        this.y += this.velocity;

        if(this.y + this.radius / 2 >= height - 20) {
            
            this.dead();
        }

        this.y = constrain(this.y, 0, height - 20 - this.radius / 2)
        this.topPos = this.y - this.radius / 1.8;
        this.bottomPos = this.y + this.radius / 1.8;
    }

    start() {
        this.velocity = 0;
        this.gravity = 0.6;
        this.lift = -16;
    }

    render() {
        push();
        imageMode(CENTER)
        image(this.img, this.x, this.y, this.radius * 2, this.radius )
        pop();
    }

    dead() {
        this.birdDead = true;
        this.velocity = 0;
        this.gravity = 1.5;
        this.lift = 0;
    }

    jump() {
        this.velocity += this.lift;
    }
}