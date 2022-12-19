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

window.addEventListener("DOMContentLoaded", addAnimationToMenu);