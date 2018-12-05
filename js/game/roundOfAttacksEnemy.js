class RoundOfAttacksEnemy extends Enemy{
    constructor(){
        super(5, 1);
        this.identifier = 7;
        this.consecutiveAttacks = 0;
        this.maxConsecutiveAttacks = this.generateAttacks();
        this.width = 503;
        this.height = 440;
        this.sprite = new Sprite("roundOfAttacksEnemy", this.width, this.height, 4, 1);
    }
    setTimes(){
        this.initialAttackTime = Math.random()*0.5+1; //In seconds
        this.attackTime = this.initialAttackTime;
        this.initialAnticipationTime = 0.3; //In seconds
        this.anticipationTime = this.initialAnticipationTime;
        this.initialRecoverTime = 0.3; //In seconds
        this.recoverTime = this.initialRecoverTime;
        this.initialProtectTime = 0.2; //In seconds
        this.protectTime = this.initialProtectTime;
        this.initialHurtTime = 0.2; //In seconds
        this.hurtTime = this.initialHurtTime;
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
            game.player.attackable) game.player.toHurt(this.damage);

        this.recoverTime -= deltaTime / 1000;
        if (this.recoverTime <= 0){
            if(this.consecutiveAttacks < this.maxConsecutiveAttacks)
                this.toAttack();
            else{
                this.consecutiveAttacks = 0;
                this.toIdle();
            }
        }
    }
    hurtBehaviour(deltaTime){
        this.hurtTime -= deltaTime / 1000;
        if (this.hurtTime <= 0){   
            if(this.health <= 0)
                game.toWalkTransition();      
            else{
                this.toAnticipate();    
                this.facing = game.player.side;
            }
        }
    }
    toAttack(){
        super.toAttack();
        this.spriteH = 3;
        if(this.consecutiveAttacks % 2 == 0){
            if(this.facing == -1) game.particleController.create("attack1", this.x, this.y + this.height/2);
            else game.particleController.create("attack1", this.x + this.width, this.y + this.height/2);
        }else{
            if(this.facing == -1) game.particleController.create("attack2", this.x, this.y + this.height/2);
            else game.particleController.create("attack2", this.x + this.width, this.y + this.height/2);
        }
        this.consecutiveAttacks++;
    }
    toAnticipate(){
        super.toAnticipate();      
        this.maxConsecutiveAttacks = this.generateAttacks();
    }
    damaged(){
        this.health--;
        this.chofSound.play();
        this.toHurt();

    }
    generateAttacks(){
        let prob = Math.random()*100;
        if(prob < 50) return 1;
        else if(prob < 90) return 2;
        else return 3;
    }
}