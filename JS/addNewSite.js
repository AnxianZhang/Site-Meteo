const initAddNewSite = () => {
    $("#add-new-site button").on("click", () => {
        let url = "./PHP/addNewSite.php";
        let dataa = {
            nomS: $("#nomAdd").val(),
            latitude: $("#latAdd").val(),
            lontitude: $("#lonAdd").val(),
            icon: $("#input-icon").val(),
            img: $("#input-img").val(),
            detail: $("#detailsAdd").val()
        };

        if(dataa["icon"] == ""){
            dataa["icon"]="https://www.freeiconspng.com/thumbs/address-icon/addressing-information--mecca-911-3.png";
        }
        if(dataa["img"] == ""){
            dataa["img"]="https://img.freepik.com/vecteurs-libre/paysage-montagne-design-plat-dessine-main_23-2149158786.jpg";
        }
        if(dataa["detail"] == ""){
            dataa["detail"]="votre adresse personalisé";
        }

        $.ajax({
            // faire le lien avec addNewSite.php
            // si l'icon, l'img ou le text area est vide => mettre valeur par défault
            async: true,
            contentType: "application/x-www-form-urlencoded",
            type: "POST",
            url: url,
            // dataType: "bool",
            data: dataa,
            success: data => {
                if (!data) {
                    warwingPopup("Les 3 premiers champs requis !");
                    $("#add-new-site input").val("");
                }
                else {
                    acceptPopup("Creation reussi");
                    updateMapWithNewSite(dataa);
                }
                // alert(data);
            },
            error: () => {
                alert("Problem occured in ajax of addNewSite.js");
            }
        });
    });
}

$(window).ready(initAddNewSite);