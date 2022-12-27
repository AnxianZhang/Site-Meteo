$(document).ready(() => {
    sessionStorage.setItem('isConnected', "false");

    $("#logInn").on("click", () => {
        let url = "./PHP/connexionCompte.php";
        let data = {
            userName: $("#userNamee").val(),
            password: $("#passwordd").val()
        };

        $.ajax({
            async: true,
            contentType: "application/x-www-form-urlencoded",
            type: "POST",
            url: url,
            dataType: "text",
            data: data,
            error: () => {
                alert("Problem occured in ajax of LogIn.js (1rt ajax)");
            },
            success: data => {
                if (data == "Connexion reussi"){
                    sessionStorage.setItem('isConnected', "true");
                    $("#connect").css("display", "none");
                    triggerAcceptPopup(data); // fonction du fichier Popup.js
                    mapVisibility(); // fonction du fichier Map.js

                    $.ajax({
                        async: true,
                        contentType: "application/x-www-form-urlencoded",
                        type: "POST",
                        url: "./PHP/getUserData.php",
                        dataType: "json",
                        success: data =>{
                            // document.querySelector("#phpmsg").innerHTML = data["nomU"];
                            let userData = $("#user-data > div");
                            userData.html(userData.html() + "<p><b>Nom: </b> " + data["nomU"] + "</p>");
                            userData.html(userData.html() + "<p><b>Prenom: </b>" + data["prenomU"] + "</p>");
                            userData.html(userData.html() + "<p><b>Email: </b>" + data["mail"] + "</p>");
                            userData.html(userData.html() + "<p><b>Nombre de lieux : </b>" + "RIEN" + "</p>");
                            userData.html(userData.html() + "<button id='modify'>Modifier</button>");
                        },
                        error: () =>{
                            alert("Problem occured in ajax of LogIn.js (2ed ajax)");
                        }
                    });
                }
                else{
                    triggerWarwingPopup(data); // fonction du fichier Popup.js
                }
            }
        });
    })
});