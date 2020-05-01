class Bird {
    constructor(img) {
        this.x = 200;
        this.y = height/2;
        this.gravity = 0;
        this.lift = -0;
        this.velocity = 0;
        this.radius = 40;
        this.topPos = 0;
        this.bottomPos = 0;
        this.birdDead = false;
        this.img = img; 
    }

    update() {
        this.velocity += this.gravity;
        this.velocity *= 0.95
        this.y += this.velocity;

        if(this.y + this.radius / 2 >= height - 28) {
            
            this.dead();
        }

        this.y = constrain(this.y, 0 - this.radius / 2 * 3, height - 28 - this.radius / 2)
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
        // ellipseMode(RADIUS)
        // ellipse(this.x, this.y, this.radius);
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