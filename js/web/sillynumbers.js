$(document).ready(function(){
    var numberelements = $(".feedback-num");

    //console.log(numberelements);

    for (var i = 0; i < numberelements.length; i++) {
        numberelements[i].innerHTML = Math.floor(Math.random() * (500 - 20) + 20);
    }

    var numberfollowers = $(".followers-num");

    for (var i = 0; i < numberfollowers.length; i++) {
        numberfollowers[i].innerHTML = Math.floor(Math.random() * (100 - 50) + 50);
    }
})