const initAddNewSite = () =>{
    $("#add-new-site").on("click", ()=>{
        $.ajax({
            // faire le lien avec addNewSite.php
        });
    });
}

$(window).ready(initAddNewSite);