/*
const getInformationFromAPI = () => {
    var url = "https://serpapi.com/search.json";
    var data = {};
    data.engine = "google_maps";
    data.q = "monoprix";
    data.ll = "@48.863201488036395,% 202.346596306404138, 21z";
    data.type = search;

    $.ajax({
        async: true,
        contentType: "application/x-www-form-urlencoded",
        type: "GET",
        url: url,
        data: data,
        dataType: "json",
        success: function (retour) {
            let v = retour[0].latitude;
            let v2 = retour[0].longitude;
            monMarquer = L.marker(v, v2, mesOptions);
        },
        error: function () {
            alert("PB avec l'URL");
        }
    });
}
*/

const getDefaultSites = () =>{
    var url = "./PHP/getDefaultData.php";
    $.ajax({
        async: true,
        contentType: "application/x-www-form-urlencoded",
        type: "POST",
        url: url,
        dataType: "json",
        success: function (data) {
            startMap(data);
        },
        error: function () {
            alert("Porblem occured in ajax");
        }
    });    

};

const startMap = data => {
    mapProps = {
        center: [48.8418565, 2.2683737],
        zoom: 5
    };

    let map = L.map('map', mapProps);
    let base = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png').addTo(map);

    /**
     * les icons serons tous charger ici 
     */
    let myIcon = L.icon({
        iconUrl: 'icon.png',
        iconSize: [25, 25],
        rizeOnHover: true,
        zIndexOffset: 5
    });

    let myOptions = {
        icon: myIcon,
        rizeOnHover: true,
        title: "supermarches",
        alt: "sup"
    };

    Array.from(data).forEach(siteInfo => {
        L.marker([siteInfo['latitude'], siteInfo['lontitude']], {
            title: siteInfo['nomS'],
            icon: L.icon({
                iconUrl: siteInfo['icon'],
                iconSize: [48, 48],
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

const init = () => {
    getDefaultSites();

}

$(window).ready(init);