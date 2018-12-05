class FireBall{
    constructor(pos, spd){
        this.spd = spd;
        this.damage = 0.5;
        this.width = 183;
        this.height = 210;
        this.sprite = new Sprite("fireball", this.width, this.height, 0, 0);
        this.offset = game.player.combatOffset;
        this.hit = false;
        if(pos == 0){
            this.x = canvasWidth / 2 - this.offset - this.width/2;
            this.side = -1;
        }else{         
            this.x = canvasWidth / 2 + this.offset - this.width/2;
            this.side = 1;
        } 
        this.y = -this.height;
    }
    update(deltaTime){
        this.y += this.spd*deltaTime;
        if(!this.hit
            && this.y + this.height >= game.player.y + this.height / 4 
            && this.y <= game.player.y + game.player.height - this.height / 4
            && this.side == game.player.side && game.player.state == "idle"){
                this.hit = true;
                game.player.toHurt(this.damage);
            }
    }
    draw(){
        this.sprite.draw(this.x, this.y);
    }
}