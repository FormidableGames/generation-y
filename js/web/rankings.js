$(document).ready(function() {

    /* PARA TESTEO
    var chirp = {
        "level":"hell",
        "score":3212,
        "killedEnemies":40,
        "chirp_info":"blablabla",
        "chirp_txt":"que guay",
        "date":new Date(),
        "enemyList":[1, 2, 1, 3, 2, 2]
    }
    var chirp2 = {
        "level":"paradise",
        "score":74747,
        "killedEnemies":24,
        "chirp_info":"ssssssssss  sssssaa aaaaaaaa",
        "chirp_txt":"que guay",
        "date":new Date(),
        "enemyList":[1, 2, 5, 3, 3, 2]
    }
    var testchirps = [];
    testchirps.push(chirp);
    testchirps.push(chirp2);
    console.log(testchirps);
    localStorage.removeItem('chirps');
    localStorage.setItem('chirps', JSON.stringify(testchirps));*/

    var chirps_string = JSON.parse(localStorage.getItem('chirps')); // Cogemos los chirps del localstorage
    var rankingDiv = $("#rankings");                        // y el div donde vamos a colocarlos
    var chirps = [];

    for (i = 0; i < chirps_string.length; i++) {
        chirps.push(JSON.parse(chirps_string[i]));
    }

    chirps.sort(function(a, b) {
        return b.score - a.score;                           // Ordenamos la lista
    });

    // Por cada elemento añadimos un div "twit"
    for (i = 0; i < chirps.length; i++) {
        var veryLongString = '<div class="content-block tweet"> <div class="tweet-author"><img src="img/web/avatar.png"><span>@yenyen</span><span class="points-num">#'+ (i+1) + ' - ' +chirps[i].score+'pts</span></div><div class="tweet-content">'+chirps[i].chirp_info+"<br/>"+chirps[i].chirp_txt+'</div><div class="tweet-feedback"><span class="glyphicon glyphicon-retweet rts"></span><span class="feedback-num rts">69</span> people have rechirped this<br><span class="glyphicon glyphicon-fire likes"></span><span class="feedback-num likes">420</span> people have found this<i>lit af</i></div></div>';
        rankingDiv.append(veryLongString);
    }

    /*
    <!-- TWEET 
                <div class="content-block tweet">
                    <div class="tweet-author">
                        <img src="img/web/avatar.png">
                        <span>@protagonistaEdgy</span>
                        <span class="points-num">902834 pts</span>
                    </div>
                    <div class="tweet-content">
                        aqui va el supercontenido
                    </div>
                    <div class="tweet-feedback">
                        <span class="glyphicon glyphicon-retweet rts"></span>
                        <span class="feedback-num rts">69</span> people have rechirped this
                        <br>
                        <span class="glyphicon glyphicon-fire likes"></span>
                        <span class="feedback-num likes">420</span> people have found this
                        <i>lit af</i>
                    </div>
                </div>-->
    */
});