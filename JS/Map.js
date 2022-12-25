let mapProps;
let map;
let base;

window.deleteSitesUserSites = () =>{
    // delete all sites

    alert("ola");
    //getDefaultSites();
}

const getDefaultSites = () =>{
    let url = "./PHP/getDefaultData.php";
    $.ajax({
        async: true,
        contentType: "application/x-www-form-urlencoded",
        type: "POST",
        url: url,
        dataType: "json",
        success: data =>{
            startMap(data);
        },
        error: () =>{
            alert("Problem occured in ajax of Map.js");
        }
    });
};

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
                       "</center>"+
                       "<center>"+
                            "<img width='100%' src='" + siteInfo['img'] + "' alt='img' />"+
                       "</center>" + 
                       "<center>" +
                            "<p>" + siteInfo['detail'] + "</p>" +
                       "</center>")
            .on("click", e => {
                map.flyTo(e.latlng, 15);
            });
    });
}

const initMap = () => {
    getDefaultSites();
}

$(window).ready(initMap);