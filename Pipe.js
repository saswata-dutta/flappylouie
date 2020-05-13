class Pipe {
    constructor(tPipe, bPipe) {
        this.height = 160;
        this.w = 40;
        this.x = width - this.w;
        this.done = false;
        this.ground = 20;
        this.top = random(50, height - this.height - 30 - this.ground);
        this.bottom = this.top + this.height;
        this.tPipe = tPipe;
        this.bPipe = bPipe;
    }

    move() {
        this.x -= 3;
    }

    show() { 
        // image(img, x, y, width, height) 
        image(this.tPipe, this.x, 0, this.w, this.top)
        image(this.bPipe, this.x, this.bottom, this.w, height - this.bottom - this.ground)
        // rect(this.x, this.bottom, this.w, height - this.bottom - this.ground )
    }

    offScreen() {
        return this.x < -this.w;
    }

    collide(bird) {
        if(bird.topPos <= this.top || bird.bottomPos >= this.bottom) {
            if(bird.x + bird.radius  > this.x && bird.x - bird.radius < this.x + this.w) {
                // bird.dead();
                return true;
            }
        }

        return false;
    }
}