class GUI{
    constructor(){
        /*
        Barras de salud
        Texto combate
        */

        this.state = "empty";
        this.text = "";
        this.initialStartFightTime = 3.9;
        this.startFightTime = this.initialStartFightTime;
        this.depth = 6;
        
        this.fullHearth = new Sprite("fullHearth", 46, 41, 0, 0);
        this.halfHearth = new Sprite("halfHearth", 46, 41, 0, 0);
        this.emptyHearth = new Sprite("emptyHearth", 46, 41, 0, 0);
        this.healthContainer = new Sprite("healthContainer", 277, 165, 0, 0);
    }
    update(deltaTime){
        switch(this.state){
            case "empty":

                break;
            case "fightTransition":
                this.startFightTime -= 2*deltaTime / 1000; 
                if(this.startFightTime > 1){     
                    this.text = Math.floor(this.startFightTime);
                }else if(this.startFightTime > 0){ 
                    this.text = "FIGHT!";
                }else{ 
                    game.toFight();
                    this.toEmpty();
                }
                break;
        }
    }
    draw(){       
        context.font="30px Arial";
        
        let pos = 0;
        this.healthContainer.draw(pos, pos);
        pos += 50;
        for(let i = 0; i < game.player.maxHealth; i++){
            if(i <= game.player.health - 1) 
                this.fullHearth.draw(pos + i*(this.healthContainer.width-100)/game.player.maxHealth, pos);
            else if(i == Math.round(game.player.health) - 1)
                this.halfHearth.draw(pos + i*(this.healthContainer.width-100)/game.player.maxHealth, pos);
            else 
                this.emptyHearth.draw(pos + i*(this.healthContainer.width-100)/game.player.maxHealth, pos);
        }
        if(game.enemy) context.fillText("Enemy: " + game.enemy.health, 3*canvasWidth/4, 50);
               
        context.font="50vh Arial";
        context.fillText(this.text, canvasWidth / 2, canvasHeight / 2);
    }
    toEmpty(){
        this.state = "empty";
        this.text = "";     
    }
    toFightTransition(){
        this.state = "fightTransition";
        this.startFightTime = this.initialStartFightTime;
    }
}