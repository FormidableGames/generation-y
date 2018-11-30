class FireBall{
    constructor(pos){
        this.vel = 0.5;
        this.damage = 0.5;
        this.width = 50;
        this.height = 50;
        this.sprite = new Sprite("fireball", this.width, this.height, 0, 0);
        this.offset = game.player.combatOffset;
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
        this.y += this.vel*deltaTime;
        if(this.y + this.height >= game.player.y + 25 && this.y <= game.player.y + game.player.height - 25
            && this.side == game.player.side && game.player.state == "idle")
            game.player.toHurt(this.damage);
    }
    draw(){
        this.sprite.draw(this.x, this.y);
    }
}