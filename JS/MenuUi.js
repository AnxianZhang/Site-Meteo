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

const addClickMenu = () => {
    const menu = Array.from(document.querySelectorAll(".nav_menu"));
    menu.forEach(element => {
        let isConneted;

        element.addEventListener("mouseover", () => {
            isConneted = sessionStorage.getItem("isConnected") == "false" ? false : true;
            element.style.cursor = isConneted ? "pointer" : "not-allowed";
        });

        element.addEventListener("click", () => {
            if (isConneted) {
                //element.classList.add("open");
                menu.forEach(item => {
                    // if (item != element){
                    if (element.classList.contains("open")) {
                        element.classList.remove("open");
                    }
                    else {
                        element.classList.add("open");
                    }
                });
            }
        });
    });
}


const mapVisible = () => {
    const map = document.getElementById("map");
    const cacher = document.getElementById("cacher");
    const animation = document.getElementById("anim");
    let isConneted;
    map.addEventListener("mouseover", () => {
        isConneted = sessionStorage.getItem("isConnected") == "false" ? false : true;
        map.style.filter = isConneted ? "none" : "blur(10px)";
        map.style.cursor = isConneted ? "pointer" : "not-allowed";
        // map.style['pointer-events'] = isConneted ? "auto" : "none"; 
        //interdit use souri avec bug
        cacher.style.display = isConneted ? "none" : "block";
        anim.style.display = isConneted ? "block" : "none";
    });
}

const starMenuUi = () => {
    addAnimationToMenu();
    addClickMenu();
    mapVisible();
}

window.addEventListener("DOMContentLoaded", starMenuUi);
