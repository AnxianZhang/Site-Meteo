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
    $(".nav_menu p").text("");
}

const initLogOut = () =>{
    $("#nav #log-out").on("click", () =>{
        sessionStorage.setItem('isConnected', "false");
        resetNewSiteForm();
        resetUserData();
        closeOpenMenu();
        triggerDisconnectPopup("Déconnexion réussie"); // fonction du fichier Popup.js
        mapVisibility(); // fonction du fichier MenuUI.js
        // add a reset map
    });
}

$(window).ready(initLogOut);