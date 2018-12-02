class Particle{
    constructor(type, x, y){
        this.width = 200;
        this.height = 100;
        this.sprite = new Sprite("textParticles", this.width, this.height, 1, 1);
        switch(type){
            case "hit":
                this.spriteH = 0;
                this.spriteV = 0;
                break;
            case "miss":
                this.spriteH = 1;
                this.spriteV = 0;
                break;
            case "stun":
                this.spriteH = 0;
                this.spriteV = 1;
                break;
            case "illusionEnded":
                this.spriteH = 1;
                this.spriteV = 1;
                break;
            case "smoke":
                this.spriteH = 0;
                this.spriteV = 0;
                this.width = 100;
                this.height = 100;
                this.sprite = new Sprite("smoke", 100, 100, 0, 0);
                break; 
            case "attack1":
                this.spriteH = 2;
                this.spriteV = (-game.enemy.facing+1)/2;
                this.width = 600;
                this.height = 400;
                this.sprite = new Sprite("invisibleEnemy", this.width, this.height, 6, 1);
                break;
            case "attack2":
                this.spriteH = 3;
                this.spriteV = (-game.enemy.facing+1)/2;
                this.width = 600;
                this.height = 400;
                this.sprite = new Sprite("invisibleEnemy", this.width, this.height, 6, 1);
                break;
        }
        this.x = x - this.width/2;
        this.y = y - this.height/2;
        this.alpha = 1;
        this.fadeTime = 0.5;
    }
    update(deltaTime){
        this.fadeTime -= deltaTime / 1000;
        this.alpha = this.fadeTime + 0.5;
        this.y -= 0.05*deltaTime;
        this.sprite.alpha = this.alpha;

    }
    draw() {
        this.sprite.actualFrameH = this.spriteH;      
        this.sprite.actualFrameV = this.spriteV;
        this.sprite.draw(this.x, this.y);
    }
}