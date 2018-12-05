function followBtn() {
    var doYouFollowYen = localStorage.getItem("follow");
    if (doYouFollowYen == "false" || doYouFollowYen == null) localStorage.setItem("follow", "true");
    else localStorage.setItem("follow", "false");
    //console.log(localStorage.getItem("follow"));
    updateButton();
}

function updateButton() {
    var doYouFollowYen = localStorage.getItem("follow");
    if (doYouFollowYen == "false") $("#followBtn").html("Unfollow");
    else if (doYouFollowYen == "true") $("#followBtn").html("Follow");
}

$(document).ready(function () {
    updateButton();
});