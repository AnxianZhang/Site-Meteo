$(document).ready(function () {
    // $(body).off('click').on('click', '#logIn', function () {
    $("#logInn").on("click", function () {
        //alert("ooooooo")
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
            success: data => {
                document.querySelector("#phpmsg").innerHTML = data;
            },
            error: () => {
                alert("Problem occured in ajax of connect.js");
            }
        });

        // $.post("./PHP/connexionCompte.php",
        // {
        //         "userName": $("#userNamee").val(),
        //         "password": hex_sha1($("#passwordd").val())
        //     },
        //     function (data) {
        //         if (data == "OK") {
        //             $(location).attr('href', 'www.google.com');
        //         } else {
        //             alert("Problem occured in ajax of connexion");
        //         }
        //     }
        // )
    })
});