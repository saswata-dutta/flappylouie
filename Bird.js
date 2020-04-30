class Bird {
    constructor(img) {
        this.x = 200;
        this.y = height/2;
        this.gravity = 0.6;
        this.lift = -16;
        this.velocity = 0;
        this.radius = 15;
        this.topPos = 0;
        this.bottomPos = 0;
        this.birdDead = false;
        this.img = img; 
    }

    update() {
        this.velocity += this.gravity;
        this.velocity *= 0.95
        this.y += this.velocity;

        if(this.y > height) {
            this.dead();
        }

        this.topPos = this.y - this.radius;
        this.bottomPos = this.y + this.radius;
    }

    render() {
        fill(0)
        ellipseMode(RADIUS)
        ellipse(this.x, this.y, this.radius);
    }

    dead() {
        this.birdDead = true;
        this.velocity = 0;
        this.gravity = 10;
        this.lift = 0;
    }

    jump() {
        this.velocity += this.lift;
    }
}