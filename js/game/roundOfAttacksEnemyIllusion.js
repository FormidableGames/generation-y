class RoundOfAttacksEnemyIllusion extends RoundOfAttacksEnemy{
    constructor(){
        super();
        this.identifier = -1;
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
            game.map.add('W');
        }
    }
}