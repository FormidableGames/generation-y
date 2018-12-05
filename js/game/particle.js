class Particle{
    constructor(type, x, y){
        this.fadeTime = 0.5;
        switch(type){
            case "hit":
                this.spriteH = 0;
                this.spriteV = 0;
                this.width = 183;
                this.height = 119;
                this.sprite = new Sprite("hit", this.width, this.height, 0, 0);
                break;
            case "dodge":
                this.spriteH = 0;
                this.spriteV = 0;
                this.width = 238;
                this.height = 91;
                this.sprite = new Sprite("dodge", this.width, this.height, 0, 0);
                break;
            case "question":
                this.spriteH = 0;
                this.spriteV = 0;
                this.width = 39;
                this.height = 62;
                this.sprite = new Sprite("question", this.width, this.height, 0, 0);
                break;
            case "alert":
                this.spriteH = 0;
                this.spriteV = 0;
                this.width = 31;
                this.height = 64;
                this.sprite = new Sprite("alert", this.width, this.height, 0, 0);
                break;
            case "smoke":
                this.spriteH = 0;
                this.spriteV = 0;
                this.width = 333;
                this.height = 302;
                this.fadeTime = 0.2;
                this.sprite = new Sprite("smoke", 333, 302, 0, 0);
                break; 
            case "aura":
                this.spriteH = 0;
                this.spriteV = (-game.enemy.facing+1)/2;
                this.width = 300;
                this.height = 300;
                this.sprite = new Sprite("aura", this.width, this.height, 0, 0);
                break;
            case "attack1":
                this.spriteH = 0;
                this.spriteV = (-game.enemy.facing+1)/2;
                if(level == "purgatory"){
                    this.width = 276;
                    this.height = 346;
                    this.sprite = new Sprite("attack", this.width, this.height, 1, 1);
                }else{           
                    this.width = 490;
                    this.height = 400;
                    this.sprite = new Sprite("attack", this.width, this.height, 1, 1);
                }
                break;
            case "attack2":
                this.spriteH = 1;
                this.spriteV = (-game.enemy.facing+1)/2;
                if(level == "purgatory"){
                    this.width = 276;
                    this.height = 346;
                    this.sprite = new Sprite("attack", this.width, this.height, 1, 1);
                }else{             
                    this.width = 490;
                    this.height = 400;
                    this.sprite = new Sprite("attack", this.width, this.height, 1, 1);
                }
                break;
            case "1":
                this.spriteH = 0;
                this.spriteV = 0;
                this.width = 175;
                this.height = 234;
                this.sprite = new Sprite("1", this.width, this.height, 1, 1);
                break;
            case "2":
                this.spriteH = 0;
                this.spriteV = 0;
                this.width = 175;
                this.height = 234;
                this.sprite = new Sprite("2", this.width, this.height, 1, 1);
                break;
            case "3":
                this.spriteH = 0;
                this.spriteV = 0;
                this.width = 175;
                this.height = 234;
                this.sprite = new Sprite("3", this.width, this.height, 1, 1);
                break;
            case "fight":
                this.spriteH = 0;
                this.spriteV = 0;
                this.width = 508;
                this.height = 187;
                this.sprite = new Sprite("fight", this.width, this.height, 1, 1);
                break;
        }
        this.x = x - this.width/2;
        this.y = y - this.height/2;
        this.alpha = 1;
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