class DodgeEnemy extends Enemy{
    constructor(){
        super(2, 1);
        this.sprite = new Sprite("dodgeEnemy", this.width, this.height, 6, 1);
        this.dodge = 0;
    }
    update(deltaTime) {
        switch (this.state) {
            case "walk":
                if(this.x < canvasWidth / 2 - this.width / 2) this.x = canvasWidth / 2 - this.width / 2;
                break;
            case "idle":
                this.idleBehaviour(deltaTime);
                break;
            case "protect":
                this.protectBehaviour(deltaTime);
                break;
            case "anticipate":
                this.anticipateBehaviour(deltaTime);
                break;
            case "attack":
                this.attackBehaviour(deltaTime);
                break;
            case "hurt":
                this.hurtBehaviour(deltaTime);
                break;
            case "celebrate":
                this.celebrateBehaviour(deltaTime);
                break;
            case "sick":
                this.sickBehaviour(deltaTime);
                break;
        }
    }
    setTimes(){
        this.initialAttackTime = Math.random() * 1 + 1; //In seconds
        this.attackTime = this.initialAttackTime;
        this.initialAnticipationTime = Math.random() * 0.1 + 0.5; //In seconds
        this.anticipationTime = this.initialAnticipationTime;
        this.initialRecoverTime = 0.5; //In seconds
        this.recoverTime = this.initialRecoverTime;
        this.initialProtectTime = 0.3; //In seconds
        this.protectTime = this.initialProtectTime;
        this.initialHurtTime = 0.1; //In seconds
        this.hurtTime = this.initialHurtTime;
        this.initialCelebrateTime = 0.5; // In seconds
        this.celebrateTime = this.initialCelebrateTime;
        this.initialSickTime = Math.random() * 0.5 + 1; // In seconds
        this.sickTime = this.initialSickTime;
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
        if (this.recoverTime <= 0) this.toCelebrate();
    }
    hurtBehaviour(deltaTime){
        this.hurtTime -= deltaTime / 1000;
        if (this.hurtTime <= 0) this.toIdle();
    }
    celebrateBehaviour(deltaTime){
        this.celebrateTime -= deltaTime / 1000;
        if (this.celebrateTime <= 0) this.toIdle();
    }
    sickBehaviour(deltaTime){
        this.sickTime -= deltaTime / 1000;
        if (this.sickTime <= 0) this.toIdle();
    }
    toCelebrate(){
        this.state = "celebrate";
        this.attackable = true;
        this.dodge = 0;
        this.spriteH = 5;
        this.setTimes();
    }
    toSick(){
        this.state = "sick";
        this.attackable = true;
        this.dodge = 0;
        this.spriteH = 6;
        this.setTimes();
    }
    damaged(){
        let damaged = false;
        if(this.state == "celebrate" || this.state == "idle"){
            this.health -= 0.5;
            this.dodge = 0;
            damaged = true;
        }else if(this.state == "sick"){
            this.health -= 1;
            damaged = true;
        }else if(this.dodge == 2){
            this.toSick();       
            this.facing *= -1;
        }else{
            this.dodge++;
            this.facing *= -1;
            this.toIdle();
        }
        if(damaged){
            if(this.health > 0){
                this.facing *= -1;
                this.chofSound.play();
                this.toHurt();
            }else{
                game.toWalk();
            }
        }       
    }
}