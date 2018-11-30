class ParticleController{
    constructor(){
        this.particles = [];
    }
    update(deltaTime){
        for(let i = 0; i < this.particles.length; i++){
            this.particles[i].update(deltaTime);
            if(this.particles[i].alpha <= 0) this.particles.splice(i, 1);
        }
    }
    draw(){
        for(let i = 0; i < this.particles.length; i++){
            this.particles[i].draw();
        }
    }
    create(type, x, y){
        this.particles.push(new Particle(type, x, y));
    }
    getRandomRange(min, max) {
        return Math.random() * (max - min) + min;
    }
}