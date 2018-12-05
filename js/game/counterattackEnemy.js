class CounterattackEnemy extends BasicEnemy{
    constructor(){
        super();
        this.identifier = 5;
        this.health = 3;
        this.damage = 0.5;
        this.width = 420;
        this.height = 420;
        this.sprite = new Sprite("counterattackEnemy", this.width, this.height, 4, 1);
    }
    setTimes(){
        this.initialAttackTime = Math.random() * 3 + 2; //In seconds
        this.attackTime = this.initialAttackTime;
        this.initialAnticipationTime = 0.35; //In seconds
        this.anticipationTime = this.initialAnticipationTime;
        this.initialRecoverTime = 0.3; //In seconds
        this.recoverTime = this.initialRecoverTime;
        this.initialProtectTime = 0.3; //In seconds
        this.protectTime = this.initialProtectTime;
        this.initialHurtTime = 0.2; //In seconds
        this.hurtTime = this.initialHurtTime;
    }
    //In this enemy protect is the equivalent of counterattack
    toProtect(){
        this.state = "protect";
        this.spriteH = 3;
        game.player.toHurt(this.damage*2);
        this.setTimes();
    }
}