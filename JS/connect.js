$(document).ready(() => {
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
            success: data => {
                document.querySelector("#phpmsg").innerHTML = data; // add css
            },
            error: () => {
                alert("Problem occured in ajax of connect.js"); // add css
            }
        });
    })
});