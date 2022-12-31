let modifPwdForm;

const closeModifPwd = () =>{
    $("#modif-pwd input").val("");
    modifPwdForm.hide();
}

const checkPwdValidity = () => {
    let oldPwd = $("#modif-pwd input[name = old-pwd]");
    let newPwd = $("#modif-pwd input[name = new-pwd]");
    
    if (oldPwd.val() == "" || newPwd.val() == ""){
        warwingPopup("Les 2 champs sont requis !");
        return;
    }

    let url = "./PHP/modifyPerData.php";
    let data = {
        oldPwd: oldPwd.val(),
        newPwd: newPwd.val(),
        change: "pwd"
    };

    $.ajax({
        async: true,
        contentType: "application/x-www-form-urlencoded",
        type: "POST",
        url: url,
        // dataType: "boolean",
        data: data,
        success: data => {
            if (data){
                acceptPopup("Modification réussi");
                closeModifPwd();
            }
            else{
                warwingPopup("Ancien mot de passe faux !");
            }
        },
        error: () => {
            alert("Problem occured in ajax of changePwd.js");
        }
    });
}

const hideModifForm = () => {
    $("#modif input").val("");
    $("#modif").hide();
}

const initChangePwd = () => {
    $("#changePwdBtn").on("click", () => {
        modifPwdForm = $("#modif-pwd");
        modifPwdForm.show();
        hideModifForm();
    });
    $("#valid-new-pwd").on("click", checkPwdValidity);
}

$(window).ready(initChangePwd);