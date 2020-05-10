class Bird {
    constructor(img) {
        this.x = 200;
        this.y = height/2;
        this.gravity = 0;
        this.lift = -0;
        this.velocity = 0;
        this.radius = 35 ;
        this.topPos = 0;
        this.bottomPos = 0;
        this.birdDead = false;
        this.img = img; 
        this.brain = new NeuralNetwork(4,4,1);
    }

    think(pipes) {
        let closest = null
        let closeD = Infinity;
        for(let pipe of pipes) {
            let diff = pipe.x - this.x;
            if(!pipe.done && diff < closeD) {
                closeD = diff;
                closest = pipe;
            }
        }
        let inputs = [0,0,0,0];
        inputs[0] = this.y / height;
        inputs[1] = closest.top / height;
        inputs[2] = closest.bottom / height;
        inputs[3] = closest.x / width;

        let output = this.brain.predict(inputs);
        if(output[0] > 0.5) {
            this.jump();
        }
    }

    update() {
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