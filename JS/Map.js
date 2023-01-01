let mapProps;
let map;
let base;
let currentUserIcons = [];
let iconId = [];
let nbLieux = 0;

const searchCountry = () => {
    document.querySelector("#seach-city button").addEventListener("click", () => {
        let input = document.querySelector("#seach-city input");
        if (input.value != "") {
            let url = "http://api.openweathermap.org/geo/1.0/direct";
            let data ={
                q: input.value,
                appid: "279b4be6d54c8bf6ea9b12275a567156"
            };
            $.ajax({
                async: true,
                contentType: "application/x-www-form-urlencoded",
                type: "GET",
                url: url,
                dataType: "json",
                data: data,
                success: data => {
                    try{
                        map.flyTo([data[0].lat, data[0].lon], 12);
                    }
                    catch(err){
                        warwingPopup("Ce nom n'exsite pas !");
                    }
                },
                error: () => {
                    alert("Problem occured in ajax of Map.js");
                }
            });
        }
    });
}

window.deleteSitesUserSites = () => {
    currentUserIcons.forEach(marker => {
        map.removeLayer(marker);
    });
    currentUserIcons = [];
    iconId = [];
    nbLieux = 0;
    // sessionStorage.setItem("nbSites", 0);
}

window.getNbLieux = () => {
    return nbLieux;
}

const getDefaultSites = () => {
    let url = "./PHP/getDefaultMap.php";
    $.ajax({
        async: true,
        contentType: "application/x-www-form-urlencoded",
        type: "POST",
        url: url,
        dataType: "json",
        success: data => {
            startMap(data);
        },
        error: () => {
            alert("Problem occured in ajax of Map.js");
        }
    });
};

const showLocationName = (lat, lon) => {
    let url = "http://api.openweathermap.org/geo/1.0/reverse";
    let data = {
        appid: "279b4be6d54c8bf6ea9b12275a567156",
        lat: lat,
        lon: lon
    };
    $.ajax({
        async: true,
        contentType: "application/x-www-form-urlencoded",
        type: "GET",
        dataType: "json",
        url: url,
        data: data,
        error: () => {
            alert("problem occured in ajax in Map.js at showLocationName function");
        },
        success: data => {
            try{
                document.querySelector(".animation p").innerHTML = document.querySelector(".animation p").innerHTML + " à " + data[0].name;
            }
            catch(err){
                return;
            }
        }
    });
}

const addSearchMeteo = e => {
    map.addEventListener("click", function (e) {
        Array.from(document.querySelectorAll(".nav-bar > .open")).forEach(element => {
            element.classList.remove("open");
        });
        let lon = e.latlng.lng, lat = e.latlng.lat;
        document.querySelector("#add-new-site input[placeholder = lon]").value = lon;
        document.querySelector("#add-new-site input[placeholder = lat]").value = lat;

        let url = "https://api.openweathermap.org/data/2.5/weather";
        let data = {
            appid: "279b4be6d54c8bf6ea9b12275a567156",
            units: "metric",
            lat: lat,
            lon: lon
        };
        $.ajax({
            async: true,
            contentType: "application/x-www-form-urlencoded",
            type: "GET",
            dataType: "json",
            url: url,
            data: data,
            error: () => {
                alert("problem occured in ajax in Map.js at addSearchMeteo function");
            },
            success: data => {
                document.querySelector(".nav-bar .animation img").style.display = "block";
                document.querySelector(".animation img").src = "http://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png";
                let description = data.weather[0].description;
                let capitalize = description.charAt(0).toUpperCase() + description.slice(1);
                document.querySelector(".animation p").innerHTML = capitalize + "<br><br>" + data.main.temp + "°C";
                showLocationName(lat, lon);
            }
        });
    });
}

const deleteLieu = num => {
    let url = "./PHP/deleteIcon.php";
    let data = {
        num: num
    };
    $.ajax({
        async: true,
        contentType: "application/x-www-form-urlencoded",
        type: "POST",
        url: url,
        data: data,
        dataType: "text",
        success: data => {
            acceptPopup(data);
        },
        error: () => {
            alert("Problem occured in ajax of deleteIcon in map.js");
        }
    });

    // let nb = parseInt(sessionStorage.getItem("nbSites")) - 1;
    // sessionStorage.setItem("nbSites" , nb);
    nbLieux = nbLieux - 1;
    document.querySelector("#nb-lieux").innerHTML = "<p id ='nb-lieux'><b>Nombre de lieux : </b>" + nbLieux + "</p>";
}

function addEventToIcon(e) {
    // map.flyTo(e.latlng, 15);
    Array.from(document.querySelectorAll(".nav-bar > .open")).forEach(element => {
        element.classList.remove("open");
    });
    if (!document.querySelector("#interact").classList.contains("open")) {
        document.querySelector("#interact").classList.add("open");
    }

    let interactDiv = document.querySelector("#interact div");
    interactDiv.innerHTML = "<button id='delet-icon'>Supprimer</button>";
    interactDiv.innerHTML = interactDiv.innerHTML + "<button id='zoom-icon'>Zoomer dessus</button>";
    document.querySelector("#zoom-icon").addEventListener("click", () => {
        map.flyTo(e.latlng, 15);
    });

    document.querySelector("#delet-icon").addEventListener("click", () => {
        if (currentUserIcons.indexOf(this) == -1) {
            warwingPopup("Icon par défaut non supprimable!");
        }
        else {
            deleteLieu(iconId[currentUserIcons.indexOf(this)]);
            interactDiv.innerHTML = "Cliquez sur une nouvelle icon pour pourvoir interagir avec !"
            map.removeLayer(this);
        }
    });
}

const startMap = data => {
    mapProps = {
        center: [24.92629, 23.02734],
        zoom: 3,
        minZoom: 3
    };

    map = L.map('map', mapProps);
    base = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png').addTo(map);

    Array.from(data).forEach(siteInfo => {
        L.marker([siteInfo['latitude'], siteInfo['lontitude']], { // add this to an array
            title: siteInfo['nomS'],
            icon: L.icon({
                iconUrl: siteInfo['icon'],
                iconSize: [40, 40]
            })
        }).addTo(map)
            .bindPopup("<center>" +
                "<h2>" + siteInfo['nomS'] + "</h2>" +
                "</center>" +
                "<center>" +
                "<img width='100%' src='" + siteInfo['img'] + "' alt='img' />" +
                "</center>" +
                "<center>" +
                "<p>" + siteInfo['detail'] + "</p>" +
                "</center>")
            .on("click", addEventToIcon);
    });

    addSearchMeteo();
}

window.updateMapWithNewSite = data => {
    currentUserIcons.push(L.marker([data["latitude"], data["lontitude"]], { // add this to an array
        title: data["nomS"],
        icon: L.icon({
            iconUrl: data["icon"],
            iconSize: [40, 40]
        })
    }).addTo(map)
        .bindPopup("<center>" +
            "<h2>" + data["nomS"] + "</h2>" +
            "</center>" +
            "<center>" +
            "<img width='100%' src='" + data["img"] + "' alt='img' />" +
            "</center>" +
            "<center>" +
            "<p>" + data["detail"] + "</p>" +
            "</center>")
        .on("click", addEventToIcon));
    iconId.push(data["numS"]);
    // let nb = parseInt(sessionStorage.getItem("nbSites")) + 1;
    // sessionStorage.setItem("nbSites" , nb);
    nbLieux = nbLieux + 1;
    document.querySelector("#nb-lieux").innerHTML = "<p id ='nb-lieux'><b>Nombre de lieux : </b>" + nbLieux + "</p>";
}

window.mapVisibility = () => {
    const map = document.getElementById("map");
    let isConneted = sessionStorage.getItem("isConnected") == "false" ? false : true;

    map.style.filter = isConneted ? "none" : "blur(10px)";
    map.style.cursor = isConneted ? "pointer" : "not-allowed";
    map.style.zIndex = isConneted ? 2 : -10;

    document.querySelector(".animation").style.filter = isConneted ? "none" : "blur(10px)";
    document.querySelector("form#seach-city").style.zIndex = isConneted ? 3 : -10;
}

window.showCurrentUserSite = () => {
    const show = data => {
        // let count = 0;
        Array.from(data).forEach(siteInfo => {
            currentUserIcons.push(L.marker([siteInfo['latitude'], siteInfo['lontitude']], { // add this to an array
                title: siteInfo['nomS'],
                icon: L.icon({
                    iconUrl: siteInfo['icon'],
                    iconSize: [40, 40]
                })
            }).addTo(map)
                .bindPopup("<center>" +
                    "<h2>" + siteInfo['nomS'] + "</h2>" +
                    "</center>" +
                    "<center>" +
                    "<img width='100%' src='" + siteInfo['img'] + "' alt='img' />" +
                    "</center>" +
                    "<center>" +
                    "<p>" + siteInfo['detail'] + "</p>" +
                    "</center>")
                .on("click", addEventToIcon));
            iconId.push(siteInfo["numS"]);
            ++nbLieux;
        });
        // sessionStorage.setItem("nbSites", count);
        // alert(sessionStorage.getItem("nbSites")+ " map");
        // nbLieux = document.querySelector("#nb-lieux").innerHTML = "<p id ='nb-lieux'><b>Nombre de lieux : </b>" + nbLieux + "</p>";
    }

    let url = "./PHP/getUserSite.php";
    $.ajax({
        async: false,
        contentType: "application/x-www-form-urlencoded",
        type: "POST",
        url: url,
        dataType: "json",
        success: data => {
            show(data);
        },
        error: () => {
            alert("Problem occured in ajax of Map.js");
        }
    });
}

const initMap = () => {
    sessionStorage.setItem('isConnected', "false");
    getDefaultSites();
    mapVisibility();
    searchCountry();
}

window.addEventListener("DOMContentLoaded", initMap);