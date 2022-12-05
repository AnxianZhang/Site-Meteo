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

const startMap = () => {
    mapProps = {
        center: [48.8418565, 2.2683737],
        zoom: 14
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

    /**
     * les popup des icons:
     */

    let HTMLPopUp = "<h2>IUT de paris</h2><center><img width='50px' height= '50px' src='../icon.png' alt='iut img' />Bonjour</center>";
    let popup = L.popup({
        keepInView: true,
        closeButton: true
    });
    popup.setContent(HTMLPopUp);

    let myMarker = L.marker([48.8418565, 2.2683737], myOptions);
    myMarker.addTo(map).bindPopup(popup);


    // ajout des évenements sur les icons

    //myIcon.on("click", myIcon.openPopup(popup));
    //map.on('click', onMapClick);
}

const init = () => {
    startMap();
}

$(window).ready(init);