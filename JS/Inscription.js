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

const checkContent = (checker, toCheck) =>{
    return checker.value == toCheck.value && checker.value != "" && toCheck.value != "";
}

const checkContentMail = () =>{
    return checkContent(userData["mail"], userData["confMail"]);
}

const checkContentMdp = () =>{
    return checkContent(userData["mdp"], userData["confMdp"]);
}

const creatAcount = () =>{
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
        success: data =>{
            document.querySelector("#phpmsg").innerHTML = data;
        },
        error: () =>{
            alert("Problem occured in ajax of Insciption.js");
        }
    });
} 

const verifData = () => {
    const logUpInputs = document.querySelectorAll("#inscrip input");
    console.log(hasFieldNull(logUpInputs));
    if (!hasFieldNull(logUpInputs) && checkContentMail() && checkContentMdp()) {
        alert("gg!");
        //creatAcount();
    }
    else {
        alert("Vous devez remplire tout les champs !");
    }
}

const addEvent = () => {
    const handleForm = e =>{
        e.preventDefault();
    }
    
    document.querySelector("#inscrip form").addEventListener("submit", handleForm);
    document.querySelector("#connect form").addEventListener("submit", handleForm);

    userData["confMail"].addEventListener("change", checkContentMail);
    userData["mail"].addEventListener("change", checkContentMail);

    userData["mdp"].addEventListener("change", checkContentMdp);
    userData["confMdp"].addEventListener("change", checkContentMdp);

    document.querySelector("#inscrip input[type = submit]").addEventListener("click", verifData);
}

const initInscription = () => {
    userData["mail"] = document.querySelector("#inscrip input[name = mail]");
    userData["confMail"] = document.querySelector("#inscrip input[name = confMail]");
    userData["mdp"] = document.querySelector("#inscrip input[name = mdp]");
    userData["confMdp"] = document.querySelector("#inscrip input[name = confMdp]");

    addEvent();
}

window.addEventListener("DOMContentLoaded", initInscription);