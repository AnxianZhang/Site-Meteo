let userData = {
    mail: "",
    confMail: "",
    mdp: "",
    confMdp: ""
};

const hasFieldNull = inputs => {
    for (const input of inputs)
        if (input.value == "")
            return true;
    return false;
}

const verifData = () => {
    const logUpInputs = document.querySelectorAll("#inscrip input");
    console.log(hasFieldNull(logUpInputs));
    if (!hasFieldNull(logUpInputs)) {

    }
    else {
        alert("Vous devez remplire tout les champs !");
    }
}

const checkContent = (checker, toCheck) =>{
    if(checker.value == toCheck.value && checker.value != "" && toCheck.value != ""){
        console.log("same");
    }
    else{
        console.log("nop"); // ajouter les css
    }
}

const checkContentMail = () =>{
    return checkContent(userData["mail"], userData["confMail"]);
}

const checkContentMdp = () =>{
    return checkContent(userData["mdp"], userData["confMdp"]);
}

const addEvent = () => {
    userData["confMail"].addEventListener("change", checkContentMail);
    userData["mail"].addEventListener("change", checkContentMail);

    userData["mdp"].addEventListener("change", checkContentMdp);
    userData["confMdp"].addEventListener("change", checkContentMdp);

    document.querySelector("#inscrip #sign-up").addEventListener("click", verifData);
}

const initInscription = () => {
    userData["mail"] = document.querySelector("#inscrip input[name = mail]");
    userData["confMail"] = document.querySelector("#inscrip input[name = confMail]");
    userData["mdp"] = document.querySelector("#inscrip input[name = mdp]");
    userData["confMdp"] = document.querySelector("#inscrip input[name = confMdp]");

    addEvent();
}

window.addEventListener("DOMContentLoaded", initInscription);