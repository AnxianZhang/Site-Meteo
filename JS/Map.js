let mapProps;
let map;
let base;

window.deleteSitesUserSites = () => {
    // delete all sites
    // alert("ola");
    //getDefaultSites();
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
        error: () =>{
            alert("problem occured in ajax in Map.js at showLocationName function");
        },
        success: data =>{
            document.querySelector(".animation p").innerHTML = document.querySelector(".animation p").innerHTML+ " à " + data[0].name;
        }
    });
}

const addSearchMeteo = e =>{
    map.addEventListener("click", function(e){
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
            error: () =>{
                alert("problem occured in ajax in Map.js at addSearchMeteo function");
            },
            success: data =>{
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
            .on("click", e => {
                map.flyTo(e.latlng, 15);
            });
    });

    addSearchMeteo();
}

window.mapVisibility = () => {
    const map = document.getElementById("map");
    let isConneted = sessionStorage.getItem("isConnected") == "false" ? false : true;

    map.style.filter = isConneted ? "none" : "blur(10px)";
    map.style.cursor = isConneted ? "pointer" : "not-allowed";
    map.style.zIndex = isConneted ? 2 : -10;

    document.querySelector(".animation").style.filter = isConneted ? "none" : "blur(10px)";
}

const initMap = () => {
    sessionStorage.setItem('isConnected', "false");
    getDefaultSites();
    mapVisibility();
}

window.addEventListener("DOMContentLoaded", initMap);