class WeakSpotEnemy extends Enemy{
    constructor(){
        super(2, 1);
        this.width = 600;
        this.height = 400;
        this.sprite = new Sprite("weakSpotEnemy", this.width, this.height, 4, 1);
    }
    setTimes(){
        this.initialAttackTime = Math.random() * 2 + 2; //In seconds
        this.attackTime = this.initialAttackTime;
        this.initialAnticipationTime = 0.4; //In seconds
        this.anticipationTime = this.initialAnticipationTime;
        this.initialRecoverTime = 0.5; //In seconds
        this.recoverTime = this.initialRecoverTime;
        this.initialProtectTime = 0.2; //In seconds
        this.protectTime = this.initialProtectTime;
        this.initialHurtTime = 0.2; //In seconds
        this.hurtTime = this.initialHurtTime;
        this.initialWeakTime = 0.3; //In seconds
        this.weakTime = this.initialWeakTime;
    }
    update(deltaTime){
        super.update(deltaTime);
        if(this.state == "weak"){
            this.weakBehaviour(deltaTime);
        }
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
                game.toWalk();      
            else{
                this.toIdle();    
                this.facing = game.player.side;
            }
        }
    }
    weakBehaviour(deltaTime){
        this.weakTime -= deltaTime / 1000;
        if (this.weakTime <= 0){
            this.toIdle();
            this.facing *= -1;
        }
    }
    toWeak(){
        this.state = "weak";
        this.spriteH = 4;
        this.setTimes();
    }
    damaged(){
        if(this.state == "weak" || this.state == "idle"){
            this.health--;
            this.chofSound.play();
            this.toHurt();
        }else{
            this.toWeak();
        }
    }

}