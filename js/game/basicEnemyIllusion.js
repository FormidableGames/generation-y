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
            game.particleController.create("illusionEnded", game.particleController.getRandomRange(this.x+this.width/3, this.x+2*this.width/3), 
                                                    game.particleController.getRandomRange(this.y+this.height/3, this.y+2*this.height/3));   
            game.map.add('Q');
        }
    }
    damaged(){
        this.health--;
        this.chofSound.play();
        this.toHurt();
    }
}