let closeBtn, logUpInputs, logInBtn;
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
    isNull;
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
            document.querySelector("#phpmsg").innerHTML = data;
            if(data == "existing acount"){
                userData["mail"].value = "";
                userData["confMail"].value = "";
                alert("le mail existe deja, veuillez en entrer un autre"); // --> fait un zoli css !
            }
            else{
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
    console.log(hasFieldNull(logUpInputs));
    if (!userData["mail"].checkValidity()) {
        alert("non");
        return;
    }
    if (!hasFieldNull(logUpInputs) && checkContentMail() && checkContentMdp()) {
        // alert("gg!");
        creatAcount();
    }
    else { // faire le visuel CSS sur le formulaire !!!
        if (!checkContentMail() && userData["mail"].value != "" && userData["confMail"].value != "") {
            alert("Les e-mails ne correspondenet pas !");
            return;
        }
        if (!checkContentMdp() && userData["mdp"].value != "" && userData["confMdp"].value != "") {
            alert("les mots de passes de correspondent pas !");
            return;
        }
        alert("Vous devez remplire tout les champs !");
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
            });
    });

    logInBtn.addEventListener("click", ()=>{
        document.querySelector("#connect").style.display = "block";
    });
}

const initInscription = () => {
    closeBtn = document.querySelectorAll(".closeBtn");
    logInBtn = document.querySelector(".animation button");
    logUpInputs = document.querySelectorAll("#inscrip input");

    userData["mail"] = document.querySelector("#inscrip input[name = mail]");
    userData["confMail"] = document.querySelector("#inscrip input[name = confMail]");
    userData["mdp"] = document.querySelector("#inscrip input[name = mdp]");
    userData["confMdp"] = document.querySelector("#inscrip input[name = confMdp]");

    addEvent();
}

window.addEventListener("DOMContentLoaded", initInscription);