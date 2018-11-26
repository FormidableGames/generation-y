class RoundOfAttacksEnemy extends Enemy{
    setTimes(){
        this.initialAttackTime = 0.5; //In seconds
        this.attackTime = this.initialAttackTime;
        this.initialAnticipationTime = 0.3; //In seconds
        this.anticipationTime = this.initialAnticipationTime;
        this.initialRecoverTime = 0.5; //In seconds
        this.recoverTime = this.initialRecoverTime;
        this.initialProtectTime = 0.2; //In seconds
        this.protectTime = this.initialProtectTime;
    }
    idleBehaviour(deltaTime){
        this.attackTime -= deltaTime / 1000;
        if (this.attackTime <= 0) this.toAnticipate();
    }
    protectBehaviour(deltaTime){
        this.protectTime -= deltaTime / 1000;
        if (this.protectTime <= 0) this.toAnticipate();
    }
    anticipateBehaviour(deltaTime){
        this.anticipationTime -= deltaTime / 1000;
        if (this.anticipationTime <= 0) this.toAttack();
    }
    attackBehaviour(deltaTime){
        if(this.facing == game.player.side &&
            game.player.attackable) game.player.toHurt();

        this.recoverTime -= deltaTime / 1000;
        if (this.recoverTime <= 0) this.toIdle();
    }
    damaged(){
        this.health--;
        if(this.health > 0){
            this.facing *= -1;
            this.chofSound.play();
            this.toAnticipate();
        }else{
            game.toWalk();
        }
    }
}