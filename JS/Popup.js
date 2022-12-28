let popup;

const triggerPopup = msg =>{
    $("#popup h2").text(msg);
    popup.addClass("trigger");
    setTimeout(() =>{
        popup.removeClass("trigger");
    }, 2000);
}

window.acceptPopup = msg =>{
    $("#popup img").attr("src", "./img/accept.png");
    triggerPopup(msg);
}

window.warwingPopup = msg =>{
    $("#popup img").attr("src", "./img/warning.png");
    triggerPopup(msg);
}

window.disconnectPopup = msg =>{
    $("#popup img").attr("src", "./img/power-off.png");
    triggerPopup(msg);
    setTimeout(()=>{
        tipsPopup();
    }, 2200)
}

window.tipsPopup = () =>{
    let isConnected = sessionStorage.getItem("isConnected") == "false" ? false : true;

    if ($("#connect").css("display") == 'block' || $("#inscrip").css("display") == 'block' || isConnected){
        popup.removeClass("trigger");
    }
    else{
        $("#popup img").attr("src", "./img/idea.png");
        $("#popup h2").text("Connectez vous");
        popup.addClass("trigger");
    }
}

const initPopup = () =>{
    popup = $("#popup");

    tipsPopup();
}

$(document).ready(initPopup);