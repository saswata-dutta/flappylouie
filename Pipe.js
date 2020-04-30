class Pipe {
    constructor() {
        this.height = 130;
        this.top = random(this.height + 20, height - this.height - 20);
        this.bottom = this.top + this.height;
        this.x = width;
        this.w = 40;
        this.r = 255;
        this.g = 255;
        this.b = 255;
    }

    move() {
        this.x -= 3;
    }

    show() {
        fill(this.r, this.g, this.b);
        rect(this.x, 0, this.w, this.top)
        rect(this.x, this.bottom, this.w, height)
    }

    offScreen() {
        return this.x < -this.w;
    }

    collide(bird) {
        if(bird.topPos <= this.top || bird.bottomPos >= this.bottom) {
            if(bird.x + bird.radius > this.x && bird.x - bird.radius < this.x + this.w) {
                bird.dead();
            }
        }
    }
}