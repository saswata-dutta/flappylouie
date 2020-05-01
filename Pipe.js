class Pipe {
    constructor(tPipe, bPipe) {
        this.height = 130;
        this.x = width;
        this.w = 40;
        this.done = false;
        this.ground = 28;
        this.top = random(this.height + 20, height - this.height - 20 - this.ground);
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
            if(bird.x + bird.radius / 2 > this.x && bird.x - bird.radius /2 < this.x + this.w) {
                bird.dead();
            }
        }
    }
    
    crossed(bird) {
        if(bird.x - bird.radius / 2 > this.x + this.w) {
            return true;
        }
        return false;
    }
}