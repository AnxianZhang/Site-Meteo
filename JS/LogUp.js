let closeBtn, logUpInputs, logInBtn, logUpBtn;
let userData = {
    mail: "",
    confMail: "",
    mdp: "",
    confMdp: ""
};

const hasFieldNull = inputs => {
    let isNull = false;
    for (const input of inputs)
        if (input.value == "") {
            input.classList.add("not-complet");
            isNull = true;
        }
    return isNull;
}

const checkContent = (checker, toCheck) => {
    return checker.value == toCheck.value && checker.value != "" && toCheck.value != "";
}

const checkContentMail = () => {
    return checkContent(userData["mail"], userData["confMail"]);
}

const checkContentMdp = () => {
    return checkContent(userData["mdp"], userData["confMdp"]);
}

const askToConnect = () =>{
    Array.from(closeBtn).forEach(btn =>{
        btn.click();
    });
    logInBtn.click();
}

const clearInputs = inputs =>{
    Array.from(inputs).forEach(input =>{
        input.value = "";
    });
}

const creatAcount = () => {
    let url = "./PHP/creationCompte.php";
    let data = {
        fname: document.querySelector("#inscrip input[name = nom]").value,
        lname: document.querySelector("#inscrip input[name = prenom]").value,
        mail: userData['mail'].value,
        mdp: userData['mdp'].value
    };

    $.ajax({
        async: true,
        contentType: "application/x-www-form-urlencoded",
        type: "POST",
        url: url,
        dataType: "text",
        data: data,
        success: data => {
            if(data == "existing acount"){
                userData["mail"].value = "";
                userData["confMail"].value = "";
                warwingPopup("Ce mail est déjà utilié"); // fonction du fichier Popup.js
            }
            else{
                acceptPopup("Inscription réussie"); // fonction du fichier Popup.js
                clearInputs(logUpInputs);
                askToConnect();
            }
        },
        error: () => {
            alert("Problem occured in ajax of LogUp.js");
        }
    });
}

const verifData = () => {
    let mail = userData["mail"].value;
    // console.log(typeof(mail));
    if (!hasFieldNull(logUpInputs)) {
        // console.log(mail.match(new RegExp("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$", "g")) ? "oui" : "non");
        if (!mail.match(new RegExp("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$", "g"))) {
            warwingPopup("Format incorrecte du mail"); // fonction du fichier Popup.js
            return;
        }
        else{
            if(checkContentMail() && checkContentMdp()){    
                creatAcount();
            }
            else if(!checkContentMail()){
                warwingPopup("Mails non identiques"); // fonction du fichier Popup.js
            }
            else{
                warwingPopup("Mdps non identiques"); // fonction du fichier Popup.js
            }
        }
    }
    else {
        warwingPopup("Tout les champs sont obligatoires"); // fonction du fichier Popup.js
    }
}

const addEvent = () => {
    const handleForm = e => {
        e.preventDefault();
    }

    document.querySelector("#inscrip form").addEventListener("submit", handleForm);
    document.querySelector("#connect form").addEventListener("submit", handleForm);

    document.querySelector("#inscrip button[type = submit]").addEventListener("click", verifData);
    
    Array.from(closeBtn).forEach(button => {
        button.addEventListener("click", () => {
            Array.from(document.querySelectorAll(".fenet")).forEach(elem => {
                elem.style.display = 'none';
            });
            tipsPopup(); // fonction declare dans Popop.js
        });
    });

    logUpBtn.addEventListener("click", () =>{
        document.getElementById('inscrip').style.display='block';
        document.getElementById('connect').style.display='none';
    });
}

const initInscription = () => {
    closeBtn = document.querySelectorAll(".closeBtn");
    logInBtn = document.querySelector("#nav #log-in");
    logUpBtn = document.querySelector("#connect #log-up");
    logUpInputs = document.querySelectorAll("#inscrip input");

    userData["mail"] = document.querySelector("#inscrip input[name = mail]");
    userData["confMail"] = document.querySelector("#inscrip input[name = confMail]");
    userData["mdp"] = document.querySelector("#inscrip input[name = mdp]");
    userData["confMdp"] = document.querySelector("#inscrip input[name = confMdp]");

    addEvent();
}

window.addEventListener("DOMContentLoaded", initInscription);