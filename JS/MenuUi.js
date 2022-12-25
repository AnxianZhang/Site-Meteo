const addAnimationToMenu = () => {
    const hamburger = document.querySelector(".hamburger");
    const navLinks = document.querySelector(".nav-bar");
    const links = document.querySelectorAll(".nav-bar li");

    hamburger.addEventListener('click', () => {
        //Animate Links
        navLinks.classList.toggle("open");
        links.forEach(link => {
            link.classList.toggle("fade");
        });

        //Hamburger Animation
        hamburger.classList.toggle("toggle");
    });
}

const addClickMenu = () =>{
    const menu = Array.from(document.querySelectorAll(".nav_menu"));
    menu.forEach(element =>{
        let isConneted;

        element.addEventListener("mouseover", () =>{
            isConneted = sessionStorage.getItem("isConnected") == "false" ? false : true;
            element.style.cursor = isConneted ? "pointer" : "not-allowed";
        });

        element.addEventListener("click", () =>{
            if (isConneted){
                element.classList.add("open");
                menu.forEach(item =>{
                    if (item != element){
                        item.classList.remove("open");
                    }
                });
            }
        });
    });
}

const starMenuUi = () =>{
    addAnimationToMenu();
    addClickMenu();
}

window.addEventListener("DOMContentLoaded", starMenuUi);