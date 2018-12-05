class BasicEnemyIllusion extends BasicEnemy{
    constructor(){
        super();
        this.identifier = -1;
        this.health = 1;    
    }
    hurtBehaviour(deltaTime){
        this.hurtTime -= deltaTime / 1000;
        if (this.hurtTime <= 0){    
            game.removeEnemy();
            game.map.add('Q');
        }
    }
    damaged(){
        this.health--;
        this.chofSound.play();
        this.toHurt();
    }
}