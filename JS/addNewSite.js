const initAddNewSite = () =>{
    $("#add-new-site button").on("click", ()=>{
        $.ajax({
            // faire le lien avec addNewSite.php
        });
    });
}

$(window).ready(initAddNewSite);