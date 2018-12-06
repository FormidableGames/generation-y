class BasicEnemy extends Enemy{
    constructor(){
        super(3, 0.5);
        this.identifier = 1;
        this.sprite = new Sprite("basicEnemy", this.width, this.height, 3, 1);
    }
    setTimes(){
        this.initialAttackTime = Math.random() * 1 + 0.5; //In seconds
        this.attackTime = this.initialAttackTime;
        this.initialAnticipationTime = 0.7; //In seconds
        this.anticipationTime = this.initialAnticipationTime;
        this.initialRecoverTime = 0.5; //In seconds
        this.recoverTime = this.initialRecoverTime;
        this.initialProtectTime = 0.3; //In seconds
        this.protectTime = this.initialProtectTime;
        this.initialHurtTime = 0.4; //In seconds
        this.hurtTime = this.initialHurtTime;
    }
    idleBehaviour(deltaTime){
        this.attackTime -= deltaTime / 1000;
        if (this.attackTime <= 0) this.toAnticipate();
    }
    protectBehaviour(deltaTime){
        this.protectTime -= deltaTime / 1000;
        if (this.protectTime <= 0) this.toIdle();
    }
    anticipateBehaviour(deltaTime){
        this.anticipationTime -= deltaTime / 1000;
        if (this.anticipationTime <= 0) this.toAttack();
    }
    attackBehaviour(deltaTime){
        if(this.facing == game.player.side &&
            game.player.attackable) game.player.toHurt(this.damage);

        this.recoverTime -= deltaTime / 1000;
        if (this.recoverTime <= 0) this.toIdle();
    }
    hurtBehaviour(deltaTime){
        this.hurtTime -= deltaTime / 1000;
        if (this.hurtTime <= 0){   
            if(this.health <= 0)
                game.toWalkTransition();      
            else{
                this.facing *= -1;
                this.toIdle();
            }
        }
    }
    damaged(){
        this.health--;
        this.chofSound.play();
        this.toHurt();
    }
}