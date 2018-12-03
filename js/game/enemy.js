class Enemy {
    constructor(health, damage) {        
        this.state = "walk";

        this.width = 520;
        this.height = 450;
        this.sprite = new Sprite(undefined, this.width, this.height, 3, 1);
        this.spriteH = 0;
        this.spriteV = 0;

        this.x = 3 * canvasWidth / 2 - this.width / 2;
        this.y = canvasHeight - this.height;

        this.attackable = false;
        this.facing = -1;
        this.spd = 5;
        this.health = health;
        this.damage = damage;

        this.depth = 4;

        this.chofSound = audioResources["hit"];

        this.setTimes();
    }
    setTimes(){
        this.initialAttackTime = 1; //In seconds
        this.attackTime = this.initialAttackTime;
        this.initialAnticipationTime = 1; //In seconds
        this.anticipationTime = this.initialAnticipationTime;
        this.initialRecoverTime = 1; //In seconds
        this.recoverTime = this.initialRecoverTime;
        this.initialProtectTime = 0.2; //In seconds
        this.protectTime = this.initialProtectTime;
        this.initialHurtTime = 0.1; //In seconds
        this.hurtTime = this.initialHurtTime;
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
        }
    }
    draw() {
        this.sprite.actualFrameH = this.spriteH;      
        this.sprite.actualFrameV = this.spriteV + (-0.5 * this.facing + 0.5);
        this.sprite.draw(this.x, this.y);
    }
    idleBehaviour(deltaTime){
        console.log("papu idle");
    }
    protectBehaviour(deltaTime){
        console.log("papu protect");
    }
    anticipateBehaviour(deltaTime){
        console.log("papu anticipate");
    }
    attackBehaviour(deltaTime){
        console.log("papu attack");
    }
    hurtBehaviour(deltaTime){
        console.log("papu hurt");
    }
    toIdle() {
        this.state = "idle";
        this.spriteV = 0;
        this.spriteH = 0;
        this.attackable = false;
        this.setTimes();
    }
    toProtect(){
        this.state = "protect";
        this.spriteV = 0;
        this.spriteH = 4;
        this.setTimes();
    }
    toAnticipate() {
        this.state = "anticipate";
        this.spriteV = 0;
        this.spriteH = 2;
        this.attackable = true;
        this.setTimes();
    }
    toAttack() {
        this.state = "attack";
        this.spriteV = 0;
        this.spriteH = 3;
        this.setTimes();
    }
    toHurt(){
        this.state = "hurt";
        this.attackable = false;
        this.spriteV = 0;
        this.spriteH = 1;
        game.particleController.create("hit", game.particleController.getRandomRange(this.x+this.width/3, this.x+2*this.width/3), 
                                                    game.particleController.getRandomRange(this.y+this.height/3, this.y+2*this.height/3));
        this.setTimes();
    }
    damaged(){
        console.log("papu damaged");
    }
}