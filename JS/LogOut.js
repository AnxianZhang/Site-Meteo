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

const initLogOut = () =>{
    $(".nav-bar .animation button#log-out").on("click", () =>{
        alert("bonjour");
        sessionStorage.setItem('isConnected', "false");
        resetNewSiteForm();
        removeUserSites();
        closeOpenMenu();
    });
}

$(window).ready(initLogOut);