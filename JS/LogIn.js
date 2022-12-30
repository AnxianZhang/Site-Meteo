$(document).ready(() => {
    sessionStorage.setItem('isConnected', "false");
    $.fn.isValid = function () {
        return this[0].checkValidity()
    }
    const updateUserData = (nom, prenom) => {
        alert(nom + " : " + prenom);
        if (nom == "") {
            $("#userPersoDada p#pLName").replaceWith("<p id='pLName'><b>Prenom: </b> " + prenom + "</p>");
        }
        else if (prenom == "") {
            $("#userPersoDada p#pFName").replaceWith("<p id='pFName'><b>Nom: </b> " + nom + "</p>");
        }
        else {
            $("#userPersoDada p#pFName").replaceWith("<p id='pFName'><b>Nom: </b> " + nom + "</p>");
            $("#userPersoDada p#pLName").replaceWith("<p id='pLName'><b>Prenom: </b> " + prenom  + "</p>");
        }
    }

    const addClickToModifidyButton = () => {
        $("#validModif").on("click", () => {
            let nvNom = $("#modif input[name = nv-nom]");
            let nvPrenom = $("#modif input[name = nv-prenom]");

            if (nvNom.val() == "" && nvPrenom.val() == "") {
                warwingPopup("Un des champs doit être remplis"); // dans popup.js
                return;
            }
            else if ((nvNom.val() != "" && nvPrenom.val() != "" && (!nvNom.isValid() || !nvPrenom.isValid())) ||
                        (nvNom.val() != "" && !nvNom.isValid()) ||(nvPrenom.val() != "" && !nvPrenom.isValid())) {
                warwingPopup("Veuillez respecter le format"); // dans popup.js    
                return;
            }
            let url = "./PHP/modifyPerData.php";
            let data = {
                newFname: nvNom.val(),
                newLname: nvPrenom.val(),
                change: "name"
            };

            $.ajax({
                async: true,
                contentType: "application/x-www-form-urlencoded",
                type: "POST",
                url: url,
                dataType: "text",
                data: data,
                success: data => {
                    // alert(data);
                    acceptPopup(data);
                    updateUserData(nvNom.val(), nvPrenom.val());
                    $("#modif input").val("");
                    $("#modif .closeBtn").click();
                },
                error: () => {
                    alert("Problem occured in ajax of ModifData.js");
                }
            });

        });
    }

    $("#nav #log-in").on("click", () => {
        $("#connect").show();
        tipsPopup(); // fonction declare dans Popop.js
    });

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
                if (data == "Connexion reussi") {
                    sessionStorage.setItem('isConnected', "true");
                    $("#connect").css("display", "none");
                    $("#nav #log-out").attr("disabled", false).css("cursor", "pointer");
                    $("#nav #log-in").attr("disabled", true).css("cursor", "not-allowed");
                    $("#connect input").val("");
                    acceptPopup(data); // fonction du fichier Popup.js
                    mapVisibility(); // fonction du fichier Map.js

                    $.ajax({
                        async: true,
                        contentType: "application/x-www-form-urlencoded",
                        type: "POST",
                        url: "./PHP/getUserData.php",
                        dataType: "json",
                        success: data => {
                            // document.querySelector("#phpmsg").innerHTML = data["nomU"];
                            let userData = $("#user-data > #userPersoDada");
                            userData.html(userData.html() + "<p id='pFName'><b>Nom: </b> " + data["nomU"] + "</p>");
                            userData.html(userData.html() + "<p id='pLName'><b>Prenom: </b>" + data["prenomU"] + "</p>");
                            userData.html(userData.html() + "<p><b>Email: </b>" + data["mail"] + "</p>");
                            userData.html(userData.html() + "<p><b>Nombre de lieux : </b>" + "RIEN" + "</p>");
                            userData.html(userData.html() + "<button id='modify'>Modifier</button>");
                            addClickToModifidyButton(); // dans le fichier ModifData

                            $("#modify").on("click", () => {
                                $("#modif").css("display", "block");
                            });
                        },
                        error: () => {
                            alert("Problem occured in ajax of LogIn.js (2ed ajax)");
                        }
                    });
                }
                else {
                    warwingPopup(data); // fonction du fichier Popup.js
                }
            }
        });
    });
});