const removeUserSites = () =>{
    deleteSitesUserSites(); // fonction declarer dans Map.js
}

const closeOpenMenu = () =>{
    $(".nav_menu.open").removeClass("open");
}

const resetNewSiteForm = () =>{
    $("#add-new-site *").each(function (){
        $(this).val("");
    });
}

const resetUserData = () =>{
    removeUserSites();
    $("#userPersoDada").empty();
    $("#validModif").off("click");
    $("#modif input").val("");
}

const resetMeteo = () =>{
    $("#meteo p").text("Cliquez à un endroit sur la map pour obtenir la méteo");
    $("#meteo img").attr("src", "");
    document.querySelector(".nav-bar .animation img").style.display = "none";
}

const initLogOut = () =>{
    $("#nav #log-out").on("click", function (){
        $(this).attr("disabled", true).css("cursor", "not-allowed");
        $("#log #log-in").attr("disabled", false).css("cursor", "pointer");
        sessionStorage.setItem('isConnected', "false");
        resetNewSiteForm();
        resetUserData();
        closeOpenMenu();
        disconnectPopup("Déconnexion réussie"); // fonction du fichier Popup.js
        mapVisibility(); // fonction du fichier MenuUI.js
        resetMeteo();
    });
}

$(window).ready(initLogOut);