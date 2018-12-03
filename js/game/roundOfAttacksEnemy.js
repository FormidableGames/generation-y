class RoundOfAttacksEnemy extends Enemy{
    constructor(){
        super(5, 1);
        this.consecutiveAttacks = 0;
        this.maxConsecutiveAttacks = this.generateAttacks();
        this.width = 600;
        this.height = 400;
        this.sprite = new Sprite("weakSpotEnemy", this.width, this.height, 4, 1);
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
                game.toWalk();      
            else{
                this.toAnticipate();    
                this.facing = game.player.side;
            }
        }
    }
    toAttack(){
        super.toAttack();
        if(this.consecutiveAttacks % 2 == 0) this.spriteH = 3;
        else this.spriteH = 4;
        this.consecutiveAttacks++;
    }
    toAnticipate(){
        super.toAnticipate();      
        this.maxConsecutiveAttacks = this.generateAttacks();
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
    generateAttacks(){
        let prob = Math.random()*100;
        if(prob < 50) return 1;
        else if(prob < 90) return 2;
        else return 3;
    }
}