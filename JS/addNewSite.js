const initAddNewSite = () => {
    $("#add-new-site button").on("click", () => {
        let url = "./PHP/addNewSite.php";
        let dataa = {
            mail: $("#userPersoDada p:eq(2) #text").val(),
            nomS: $("#nomAdd").val(),
            latitude: $("#latAdd").val(),
            lontitude: $("#lonAdd").val(),
            icon: $("#input-icon").val(),
            img: $("#input-img").val(),
            detail: $("#detailsAdd").val()
        };

        $.ajax({
            // faire le lien avec addNewSite.php
            // si l'icon, l'img ou le text area est vide => mettre valeur par défault
            async: true,
            contentType: "application/x-www-form-urlencoded",
            type: "POST",
            url: url,
            dataType: "text",
            data: dataa,
            success: data => {
                if (data == "les champs: nom, lat, lon sont obligatoires") {
                    alert("raté car les champs: nom, lat, lon sont obligatoires");
                }
                else {
                    alert("creation reussi");
                }
                    updateSite(dataa);
                // alert(data);
            },
            error: () => {
                alert("Problem occured in ajax of addNewSite.js");
            }
        });
    });
}

$(window).ready(initAddNewSite);