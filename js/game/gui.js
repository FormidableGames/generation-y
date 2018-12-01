class GUI{
    constructor(){
        /*
        Barras de salud
        Texto combate
        */

        this.state = "empty";
        this.text = "";
        this.initialStartFightTime = 0.5;
        this.startFightTime = this.initialStartFightTime;
    }
    update(deltaTime){
        switch(this.state){
            case "empty":

                break;
            case "fightTransition":
                this.startFightTime -= deltaTime / 1000;
                if(this.startFightTime <= 0){
                    
                    game.toFight();
                    this.toEmpty();
                }
                break;
        }
    }
    draw(){       
        context.font="30px Arial";
        context.fillText("Player: " + game.player.health, canvasWidth/4, 50);
        if(game.map.enemy) context.fillText("Enemy: " + game.map.enemy.health, 3*canvasWidth/4, 50);
               
        context.font="50vh Arial";
        context.fillText(this.text, canvasWidth / 2, canvasHeight / 2);
    }
    toEmpty(){
        this.state = "empty";
        this.text = "";     
    }
    toFightTransition(){
        this.state = "fightTransition";
        this.text = "GO"; 
        this.startFightTime = this.initialStartFightTime;
    }
}