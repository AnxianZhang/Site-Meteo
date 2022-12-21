const verifData = () =>{

}

const addButtonEvent = () =>{
    $('.form_login > input[type = button]').on("click", () =>{
        $(".form_login").each(input =>{
            alert(input.attr("name"));
        });
    }); // ici c'est verifData qui va être appelé pour moment c'est des test
}

const initInscription = () =>{
    addButtonEvent();
    alert("oui");
}

$(window).ready(initInscription);