class HellIllusionistEnemy extends Enemy{
    constructor(){
        super(2, 0.5);
        this.identifier = 3;
        this.width = 190;
        this.height = 227;
        this.x = canvasWidth / 2 - this.width / 2;
        this.y = canvasHeight/2 - this.height;
        this.sprite = new Sprite("illusionistEnemy", this.width, this.height, 6, 1);
        this.fireBalls = [];
        this.halo;
        this.state = "throw";
        this.createSmoke();
        this.attackable = true;
        this.spriteH = 2;
        this.facing = game.player.side;
        this.fireBallCounter = Math.floor(Math.random()*3)+3;
        this.sameSideFireBalls = 0;
        this.previousSide = -1;
        this.haloCounter = 5;
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
            case "idle":
                this.idleBehaviour(deltaTime);
                break;
            case "throw":
                this.throwBehaviour(deltaTime);
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
                if(this.fireBallCounter == 0 && this.fireBalls.length == 0) this.toAttack();
            }
        }
        if(this.halo) this.halo.update(deltaTime);
    }
    draw(){
        super.draw();
        for(let i = 0; i < this.fireBalls.length; i++){
            this.fireBalls[i].draw();
        }
        if(this.halo) this.halo.draw();
    }
    idleBehaviour(deltaTime){
        this.attackTime -= deltaTime / 1000;
        if (this.attackTime <= 0){
            if(this.haloCounter == 0)
                this.toThrow();
            else this.toAttack();
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
            this.fireBalls.push(new FireBall(side, 0.5));
            audioResources["fire"].play();
            this.fireBallTime = Math.random()*1+0.6; 
            this.fireBallCounter--;       
        };

    }
    attackBehaviour(deltaTime){
        
    }
    hurtBehaviour(deltaTime){
        this.hurtTime -= deltaTime / 1000;
        if (this.hurtTime <= 0){   
            if(this.health <= 0){
                game.toWalkTransition();
                this.createSmoke();   
            }else if(this.haloCounter == 0){    
                this.toThrow();      
            }else this.toAttack();
        }
    }
    toIdle(){
        super.toIdle();
        this.attackable = true;
        this.facing = game.player.side;
        this.halo = undefined;
        this.createSmoke();   
    }
    toThrow(){    
        this.attackable = true;   
        this.y = canvasHeight/2 - this.height;
        this.state = "throw";
        this.spriteH = 2;
        this.haloCounter = 5;
        this.createSmoke();   
        this.setTimes();
    }
    toAttack(){
        this.attackable = true;
        this.y = canvasHeight - this.height;
        this.state = "attack";
        this.spriteH = 3;       
        this.fireBallCounter = Math.floor(Math.random()*3+3);
        this.halo = new Halo(Math.floor(Math.random()*2));     
        audioResources["fire"].play();
        this.haloCounter--;
        this.createSmoke();   
        this.setTimes();
    }
    damaged(){
        if(this.state == "idle"){
            this.health--;
            this.chofSound.play();
            this.toHurt();
        }
    }
    createSmoke(){
        game.particleController.create("smoke", this.x + this.width/2, this.y + this.height/2); 
    }
}