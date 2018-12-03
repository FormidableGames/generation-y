class RoundOfAttacksEnemyIllusion extends RoundOfAttacksEnemy{
    constructor(){
        super();
        this.health = 1;
    }
    attackBehaviour(deltaTime){
        if(this.facing == game.player.side &&
            game.player.attackable) game.player.toHurt(this.damage);

        this.recoverTime -= deltaTime / 1000;
        if (this.recoverTime <= 0){
                this.toIdle();
        }
    }
    hurtBehaviour(deltaTime){
        this.hurtTime -= deltaTime / 1000;
        if (this.hurtTime <= 0){    
            game.removeEnemy();
            game.particleController.create("illusionEnded", game.particleController.getRandomRange(this.x+this.width/3, this.x+2*this.width/3), 
                                                              game.particleController.getRandomRange(this.y+this.height/3, this.y+2*this.height/3));   
            game.map.add('W');
        }
    }
}