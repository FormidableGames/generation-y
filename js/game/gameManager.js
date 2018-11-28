//#region Variables declaration

//Canvas
var canvas,
    context,
    canvasWidth, 
    canvasHeight, 
    aspectRatio;
//Resources
var imageResources,
    audioResources;

//Gameloop
var maxFps,
    timestep,
    delta,
    lastFrameTimeMs,
    currentFps,
    framesThisSecond,
    lastFpsUpdate,
    fpsDisplay;

//Inputs
var inputDisponibility,
    pressedKeys,
    keyMap;

//#endregion Variable declaration

function keydown(event) {
    let key;
    if(event.keyCode === undefined) key = 32;
    else key = event.keyCode;
    pressedKeys[keyMap[key]] = true;
}
function keyup(event) {
    let key;
    if(event.keyCode === undefined) key = 32;
    else key = event.keyCode;
    pressedKeys[keyMap[key]] = false;
    inputDisponibility = true;
}

//Game
var game;

//Level
var level;

//Onload
window.addEventListener("load", function () {
    level = 0;
    //Create the canvas and get the context
    canvas = document.getElementById("canvas");
    context = canvas.getContext("2d");
    canvasWidth = canvas.width, 
    canvasHeight = canvas.height;  
    aspectRatio = canvas.width / canvas.height;

    window.addEventListener("resize", resize, false);
    window.addEventListener("orientationchange", resize, false);
    resize();
    //Start loading resources
    imageResources = {};
    audioResources = {};

    //Load hell resources
    if(level == 0){
        //Load resources
        resourcesLoader(
            //Image list
            [{name: "player", path: "placeholderPlayer.png"}, {name: "enemy", path: "placeholderEnemy.png"},
                {name: "background", path: "background.jpg"}, {name: "columns", path: "columns.png"}, 
                {name: "floor", path: "floor.png"}, {name: "dodgeEnemy", path: "placeHolderDodgeEnemy.png"}],
            //Audio list
            [{name: "background", path: "MusicaPurgatorio_v2.ogg", loop: true}, {name: "dash", path: "dash.mp3", loop: false},
                {name: "hit", path: "hit.mp3", loop: false}]
        );
    }
});

function initialize(){
    window.removeEventListener("keydown", initialize);
    window.removeEventListener("click", initialize);
    window.removeEventListener("touchstart", initialize);

    //Remove the loading screen
    document.getElementById("loading").remove();

    //Initialize all the variables and listeners
    //Input
    inputDisponibility = true;
    pressedKeys = {
        attack: false,
        pause: false
    }
    keyMap = {
        32: 'attack',
        80: 'pause'
    }

    window.addEventListener("keydown", keydown, false);
    window.addEventListener("keyup", keyup, false);
    canvas.addEventListener("mousedown", keydown, false);
    canvas.addEventListener("mouseup", keyup, false);
    canvas.addEventListener("touchstart", keydown, false);
    canvas.addEventListener("touchend", keyup, false);

    //Gameloop
    maxFps = 60,
    timestep = 1000 / maxFps,
    delta = 0,
    lastFrameTimeMs = 0;
    currentFps = 60;
    framesThisSecond = 0,
    lastFpsUpdate = 0,
    fpsDisplay = document.getElementById('fpsDisplay');
   
    //Game controller
    game = new Game();
    
    //Start game loop
    requestAnimationFrame(gameLoop);
}

function gameLoop(timestamp) {
    if (timestamp < lastFrameTimeMs + (1000 / maxFps)) {
        requestAnimationFrame(gameLoop);
        return;
    }
    delta += timestamp - lastFrameTimeMs;
    lastFrameTimeMs = timestamp;

    while (delta >= timestep) {
        //Call gameupdate passing the timestep (deltaTime) in ms
        game.update(timestep);
        delta -= timestep;
    }
    //Clear the screen
    context.clearRect(0, 0, canvasWidth, canvasHeight);
    //Draw everything
    game.draw();

    //Fps count
    if (timestamp > lastFpsUpdate + 1000) { // update every second
        currentFps = 0.25 * framesThisSecond + (1 - 0.25) * currentFps; // compute the new FPS
 
        lastFpsUpdate = timestamp;
        framesThisSecond = 0;
    }
    framesThisSecond++;
    fpsDisplay.textContent = Math.round(currentFps) + ' FPS';

    //Loop
    window.requestAnimationFrame(gameLoop);
}

function resourcesLoader(images, audios){
    //Load images and then load audio
    loadImages(images, function() {
        loadSounds(audios, initialize);
    });
}
function loadImages(images, callback) {
    //When all the images are loaded -> callback()
    let name,
        count  = images.length,
        onload = function() { if (--count == 0) callback();}   

    for(let i = 0 ; i < images.length ; i++) {
        //Assing name and path
        name = images[i].name;
        imageResources[name] = document.createElement('img');
        imageResources[name].addEventListener('load', onload);
        imageResources[name].src = "assets/sprites/" + images[i].path;
    }
  
}
function loadSounds(audios, callback) {
    //When all the audio is loaded -> callback()
    let name,
        count  = audios.length,
        canplay = function() { if (--count == 0) {
                load = document.getElementById("loading");
                load.textContent = "Loaded";
                load.style.color = "#ffffff";
                load.style.backgroundColor = "#ff00bf";
                load.style.animation = "none";
                window.addEventListener("keydown", callback, false);
                window.addEventListener("click", callback, false);
                window.addEventListener("touchstart", callback, false);
            }
        };
  
    for(let i = 0 ; i < audios.length ; i++) {
        //Assing name, path and loop
        name = audios[i].name;
        audioResources[name] = document.createElement('audio');
        audioResources[name].addEventListener('canplay', canplay, false);    
        if(audios[i].loop) audioResources[name].loop = true;
        audioResources[name].src = "assets/audio/" + audios[i].path;
        audioResources[name].stop = function(){ this.pause(); this.currentTime = 0; }
    }
  
}
//Resize the screen to fit the new resolution
function resize() {
    let height, width;
    let container = document.getElementById('columnDiv');
    maxHeight = container.clientHeight;
    if(checkMobile) maxHeight -= 100;
    width = container.clientWidth;
    height = Math.min(width/aspectRatio, maxHeight, 640);
    canvas.style.width = height * aspectRatio + 'px';
    canvas.style.height = height + 'px';
    
}
function checkMobile(){
    let check = false;
    (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
    return check;
}