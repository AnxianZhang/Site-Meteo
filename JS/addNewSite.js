const initAddNewSite = () =>{
    $("#add-new-site button").on("click", ()=>{
        $.ajax({
            // faire le lien avec addNewSite.php
            // si l'icon, l'img ou le text area est vide => mettre valeur par défault
        });
    });
}

$(window).ready(initAddNewSite);