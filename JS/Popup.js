let popup;

const triggerPopup = msg =>{
    $("#popup h2").text(msg);
    popup.addClass("trigger");
    setTimeout(() =>{
        popup.removeClass("trigger");
    }, 3000);
}

window.triggerAcceptPopup = msg =>{
    $("#popup img").attr("src", "./img/accept.png");
    triggerPopup(msg);
}

window.triggerWarwingPopup = msg =>{
    $("#popup img").attr("src", "./img/warning.png");
    triggerPopup(msg);
}

window.triggerDisconnectPopup = msg =>{
    $("#popup img").attr("src", "./img/power-off.png");
    triggerPopup(msg);
}

const initPopup = () =>{
    popup = $("#popup");
}

$(document).ready(initPopup);