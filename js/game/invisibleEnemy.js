class InvisibleEnemy extends BasicEnemy{
    constructor(){
        super();
        this.health = 2;
        this.damage = 0.5;
        this.width = 600;
        this.height = 400;
        this.sprite = new Sprite("invisibleEnemy", this.width, this.height, 6, 1);
        this.sprite.alpha = 0;
        this.attackable = true;
        this.fury = false;
        this.playerAttacksCounter = 0;     
        this.consecutiveAttacks = 0;   
        this.serie = "AAQAAQAQAQ";
        this.index = 0;
    }
    setTimes(){
        this.initialAttackTime = Math.random() * 0.5 + 2; //In seconds
        this.attackTime = this.initialAttackTime;
        this.initialAnticipationTime = 0.7; //In seconds
        this.anticipationTime = this.initialAnticipationTime;
        this.initialRecoverTime = 0.5; //In seconds
        this.recoverTime = this.initialRecoverTime;
        this.initialProtectTime = 0.3; //In seconds
        this.protectTime = this.initialProtectTime;
        this.initialHurtTime = 0.1; //In seconds
        this.hurtTime = this.initialHurtTime;
        this.initialQuietTime = 1.5; //In seconds
        this.quietTime = this.initialQuietTime;
    }
    update(deltaTime){
        if(this.fury) this.sprite.alpha = this.playerAttacksCounter / 3;
        super.update(deltaTime);
        if(this.state == "quiet"){
            this.quietBehaviour(deltaTime);
        }
    }
    attackBehaviour(deltaTime){  
        if(this.facing == game.player.side &&
            game.player.attackable){
                this.playerAttacksCounter = 0;
                game.player.toHurt(this.damage);
            }

        this.recoverTime -= deltaTime / 1000;
        if (this.recoverTime <= 0){
            if(!this.fury){
                this.facing = game.player.side;
                this.toIdle();
            }else if(this.fury && this.consecutiveAttacks == 1) this.toAttack();
            else{
                this.consecutiveAttacks = 0;
                this.facing = game.player.side;
                if(this.serie.charAt(this.index) == 'A'){
                    this.toIdle();
                }else if(this.serie.charAt(this.index) == 'Q'){
                    this.toQuiet();
                }
            }         
        }
    }
    hurtBehaviour(deltaTime){
        this.hurtTime -= deltaTime / 1000;
        if (this.hurtTime <= 0){   
            if(this.health <= 0)
                game.toWalk();      
            else{
                this.facing *= -1;
                this.fury = true;
                this.toIdle();
            }
        }
    }
    quietBehaviour(deltaTime){  
        this.sprite.alpha = 1;
        if(this.fury) this.quietTime -= deltaTime / 1000;
        if (this.quietTime <= 0){
            this.toIdle();
        }
    }
    toIdle() {
        this.state = "idle";
        this.spriteH = 0;
        if(!this.fury) this.sprite.alpha = 0;
        this.attackable = false;
        this.setTimes();
    }
    toProtect(){
        this.state = "protect";
        this.spriteH = 4;
        game.particleController.create("stun", game.particleController.getRandomRange(this.x+this.width/3, this.x+2*this.width/3), 
                                                    game.particleController.getRandomRange(this.y+this.height/3, this.y+2*this.height/3));
        this.playerAttacksCounter = 0;
        this.setTimes();
    }
    toAnticipate() {
        this.state = "anticipate";
        this.spriteH = 4;
        this.attackable = true;
        game.particleController.create("stun", game.player.x + game.player.width/2, 
                                                game.player.y);
        this.setTimes();
    }
    toAttack() {
        this.consecutiveAttacks++;
        this.state = "attack";
        if(this.consecutiveAttacks == 1){
            this.spriteH = 5;
            game.particleController.create("attack1", this.x+this.width/2, this.y + this.height/2);
        }else{
            this.consecutiveAttacks = 0;
            this.spriteH = 6;
            game.particleController.create("attack2", this.x+this.width/2, this.y + this.height/2);
            this.index++;
            if(this.index >= this.serie.length) this.index = 0;
        }
        if(!this.fury) this.consecutiveAttacks = 0;
        this.setTimes();
    }
    toHurt(){
        this.state = "hurt";
        this.health--;
        this.spriteH = 1;
        this.fury = true;
        game.particleController.create("hit", game.particleController.getRandomRange(this.x+this.width/3, this.x+2*this.width/3), 
                                                    game.particleController.getRandomRange(this.y+this.height/3, this.y+2*this.height/3));
        this.setTimes();
    }
    toQuiet(){
        this.state = "quiet";
        this.attackable = true;
        this.spriteH = 0;     
        this.consecutiveAttacks = 0;
        this.setTimes();
    }
    damaged(){
        if(!this.fury) this.playerAttacksCounter++;
        if(this.state == "quiet" && !this.fury){
            this.playerAttacksCounter = 0;
            this.toHurt();
        }else if(this.state == "quiet"){
            this.facing *= -1;
            this.playerAttacksCounter++;
            this.toIdle();
        }else if(this.playerAttacksCounter == 3){
            this.facing *= -1;
            if(!this.fury) this.toQuiet();
            else{
                this.toHurt();
            }
        }
    }
}