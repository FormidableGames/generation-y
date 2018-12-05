class Halo{
    constructor(pos){
        this.damage = 1;
        this.width = 384;
        this.height = 138;
        this.spriteV = 0;
        this.sprite = new Sprite("halo", this.width, this.height, 0, 1);
        if(pos == 0){
            this.x = game.player.positions["leftCombat"];
            this.side = -1;
        }else{
            this.x = game.player.positions["rightCombat"];
            this.side = 1;
        } 
        this.y = canvasHeight - this.height;
        this.hurt = false;
        this.changeTime = Math.random() * 0.3 + 0.7; //In seconds
        this.destroyTime = 0.5; //In seconds
    }
    update(deltaTime){
        if(this.hurt){
            this.destroyTime -= deltaTime/1000;
            if(this.destroyTime <= 0){
                game.enemy.toIdle();        
            }
            if(game.player.side == this.side && game.player.state == "idle") 
                game.player.toHurt(this.damage);
        }else{
            this.changeTime -= deltaTime/1000;
            if(this.changeTime <= 0) this.change();
        }
    }
    draw(){
        this.sprite.actualFrameV = this.spriteV;
        this.sprite.draw(this.x, this.y);
    }
    change(){
        this.hurt = !this.hurt;      
        this.spriteV = 1;
    }
}