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

const addOnClickToMap = e =>{
    map.addEventListener("click", function(e){
        // alert(e.latlng.lat + " " + e.latlng.lng);
        document.querySelector("#add-new-site input[placeholder = lon]").value = e.latlng.lng;
        document.querySelector("#add-new-site input[placeholder = lat]").value = e.latlng.lat;
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

    addOnClickToMap();
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
    getDefaultSites();
    mapVisibility();
}

$(window).ready(initMap);