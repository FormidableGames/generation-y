class HeavenIllusionistEnemy extends Enemy{
    constructor(){
        super(2, 0.5);
        this.identifier = 8;
        this.width = 190;
        this.height = 227;
        this.x = canvasWidth / 2 - this.width / 2;
        this.y = canvasHeight/2 - this.height;
        this.sprite = new Sprite("illusionistEnemy", this.width, this.height, 6, 1);
        this.fireBalls = [];
        this.state = "throw";
        this.createSmoke();
        this.attackable = true;
        this.spriteH = 2;
        this.facing = game.player.side;
        this.fireBallCounter = Math.floor(Math.random()*4)+4;
        this.sameSideFireBalls = 0;
        this.previousSide = -1;
        this.dashCounter = 0;
        this.maxDashNumber = 5;
        this.spd = 2;
        this.showingSpd = 0.2;
        this.direction;
    }
    setTimes(){
        this.initialAttackTime = 0.5; //In seconds
        this.attackTime = this.initialAttackTime;
        this.initialThrowTime = 0.3; //In seconds
        this.throwTime = this.initialThrowTime;
        this.fireBallTime = 0.5;
        this.initialHurtTime = 0.2; //In seconds
        this.hurtTime = this.initialHurtTime;
    }
    update(deltaTime) {
        switch (this.state) {
            case "throw":
                this.throwBehaviour(deltaTime);
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
        }
        for(let i = 0; i < this.fireBalls.length; i++){
            this.fireBalls[i].update(deltaTime);
            if(this.fireBalls[i].y > canvasHeight){
                this.fireBalls.splice(i, 1);    
                if(this.fireBallCounter == 0 && this.fireBalls.length == 0) this.toAnticipate();
            }
        }
    }
    draw(){
        super.draw();
        for(let i = 0; i < this.fireBalls.length; i++){
            this.fireBalls[i].draw();
        }
    }
    throwBehaviour(deltaTime){
        this.throwTime -= deltaTime / 1000;

        this.fireBallTime -= deltaTime / 1000;
        if (this.fireBallTime <= 0 && this.fireBallCounter > 0){
            let side = Math.floor(Math.random()*2);
            if(side == this.previousSide){
                this.sameSideFireBalls++;
                if(this.sameSideFireBalls == 2){
                    side = 1 - side;
                }
            }else
                this.sameSideFireBalls = 0;
            this.previousSide = side;
            this.fireBalls.push(new FireBall(side));
            this.fireBallTime = Math.random()*1+0.6; 
            this.fireBallCounter--;       
        };

    }
    anticipateBehaviour(deltaTime){
        if(this.x > canvasWidth/2){
            if(this.x <= canvasWidth - this.width/2) this.direction = 1;
        }else{
            if(this.x+this.width/2 >= 0) this.direction = -1;
        }
        if(this.direction == 1) this.x += this.showingSpd * deltaTime;
        else this.x -= this.showingSpd * deltaTime;
        if(this.x < -this.width || this.x > canvasWidth) this.toAttack();
    }
    attackBehaviour(deltaTime){
        if(this.direction == 1) this.x += this.spd * deltaTime;
        else this.x -= this.spd * deltaTime;
        if((this.x < -this.width || this.x > canvasWidth) && this.dashCounter < this.maxDashNumber){
            this.toAnticipate();
        }else if(this.x < -this.width || this.x > canvasWidth){
            this.toThrow();
        }

        //Check collision
        let playerX = game.player.x;
        let playerW = game.player.width;
        let offset = 150;
        if((this.x < playerX && this.x + this.width > playerX + offset) ||
            (this.x < playerX + playerW - offset && this.x + this.width > playerX + playerW)){
                if(game.player.state == "idle"){
                    game.player.toHurt(this.damage);
                }else if(game.player.state == "attack"){
                    this.toHurt();
                }
        }
    }
    hurtBehaviour(deltaTime){
        this.hurtTime -= deltaTime / 1000;
        if (this.hurtTime <= 0){ 
            if(this.health <= 0){
                game.toWalkTransition(); 
            }else if(this.dashCounter == this.maxDashNumber){ 
                this.createSmoke();     
                this.toThrow();      
            }else{
                this.createSmoke();  
                this.toAnticipate();
            }
        }
    }
    toThrow(){     
        this.x = canvasWidth / 2 - this.width / 2;  
        this.y = canvasHeight/2 - this.height;
        this.state = "throw";
        this.spriteH = 2;
        this.dashCounter = 0;
        this.createSmoke();   
        this.setTimes();
    }
    toAnticipate(){
        let side = Math.floor(Math.random()*2);
        if(side == 1){
            this.direction = -1;
            this.x = canvasWidth;
        }else{
            this.direction = 1;
            this.x = -this.width;
        }
        this.facing = this.direction;
        this.y = canvasHeight - this.height;
        this.state = "anticipate";
        this.spriteH = 0;       
        this.fireBallCounter = Math.floor(Math.random()*3+4);
        this.setTimes();
    }
    toAttack(){
        this.state = "attack";
        this.direction *= -1;
        this.spriteH = 1;   
        this.dashCounter++;    
        this.createSmoke();   
        this.setTimes();
    }
    toHurt(){
        super.toHurt();  
        this.health--;
        this.attackable = true;
    }
    createSmoke(){
        game.particleController.create("smoke", this.x + this.width/2, this.y + this.height/2); 
    }
}