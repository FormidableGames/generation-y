class InvisibleEnemy extends BasicEnemy{
    constructor(){
        super();
        this.identifier = 6;
        this.health = 1;
        this.damage = 0.5;
        this.width = 533;
        this.height = 554;
        this.y = canvasHeight-this.height;
        this.sprite = new Sprite("invisibleEnemy", this.width, this.height, 5, 1);
        this.sprite.alpha = 0;
        this.attackable = true;
        this.fury = false;
        this.final = false;
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
        this.initialHurtTime = 0.2; //In seconds
        this.hurtTime = this.initialHurtTime;
        this.initialQuietTime = 1.5; //In seconds
        this.quietTime = this.initialQuietTime;
    }
    update(deltaTime){
        super.update(deltaTime);
        if(this.state == "quiet"){
            this.quietBehaviour(deltaTime);
        }
    }
    attackBehaviour(deltaTime){  
        if(this.facing == game.player.side &&
            game.player.attackable){
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
                game.toWalkTransition();      
            else{
                //this.facing *= -1;
                this.fury = true;
                game.particleController.create("aura", this.x+this.width/2, this.y+this.height/2);
                this.toIdle();
            }
        }
    }
    quietBehaviour(deltaTime){ 
        if(this.fury) this.quietTime -= deltaTime / 1000;
        if (this.quietTime <= 0){
            this.playerAttacksCounter = 0;
            this.index++;
            game.particleController.create("aura", this.x+this.width/2, this.y+this.height/2);
            this.health = 4;
            this.toIdle();
        }
    }
    toIdle() {
        this.state = "idle";
        this.spriteH = 0;
        if(!this.final) this.sprite.alpha = 0;
        this.attackable = false;
        this.setTimes();
    }
    toProtect(){
        this.state = "protect";
        audioResources["swordCollision"].play();
        this.spriteH = 4;
        this.setTimes();
    }
    toAnticipate() {
        this.state = "anticipate";
        this.spriteH = 2;
        this.attackable = true;
        game.particleController.create("alert", game.player.x + game.player.width/2, 
                                                game.player.y);
        this.setTimes();
    }
    toAttack() {
        this.consecutiveAttacks++;
        this.state = "attack";       
        audioResources["swordSwing"].play();
        if(this.consecutiveAttacks == 1){
            this.spriteH = 3;
            if(this.facing == -1) game.particleController.create("attack1", this.x, this.y + this.height/2);
            else game.particleController.create("attack1", this.x + this.width, this.y + this.height/2);
        }else{
            this.consecutiveAttacks = 0;
            this.spriteH = 5;
            if(this.facing == -1) game.particleController.create("attack2", this.x, this.y + this.height/2);
            else game.particleController.create("attack2", this.x + this.width, this.y + this.height/2);
            this.index++;
            if(this.index >= this.serie.length) this.index = 1;
        }
        if(!this.fury) this.consecutiveAttacks = 0;
        this.setTimes();
    }
    toHurt(){
        this.state = "hurt";
        this.health--;
        this.spriteH = 1;
        game.particleController.create("hit", game.particleController.getRandomRange(this.x+this.width/3, this.x+2*this.width/3), 
                                                    game.particleController.getRandomRange(this.y+this.height/3, this.y+2*this.height/3));
        this.setTimes();
    }
    toQuiet(){
        this.state = "quiet";
        audioResources["appear"].play();
        if(!this.final) this.sprite.alpha = (this.playerAttacksCounter + 1) / 4;
        this.attackable = true;
        this.spriteH = 0;     
        this.consecutiveAttacks = 0;
        game.particleController.create("aura", this.x+this.width/2, this.y+this.height/2);
        this.setTimes();
    }
    damaged(){
        if(!this.fury) this.playerAttacksCounter++;
        if(this.state == "quiet" && !this.fury){
            this.facing *= -1;
            this.fury = true;
            this.playerAttacksCounter = 0;
            this.health = 5;
            this.toHurt();
        }else if(this.state == "quiet"){
            this.playerAttacksCounter++;
            this.index++;
            this.facing *= -1;    
            game.particleController.create("aura", this.x+this.width/2, this.y+this.height/2);
            if(this.playerAttacksCounter == 3){
                this.sprite.alpha = 1;
                this.final = true; 
            }
            this.toHurt();
        }else if(this.playerAttacksCounter == 3){
            this.facing *= -1;
            if(!this.fury) this.toQuiet();
            else{
                this.toHurt();
            }
        }
    }
}