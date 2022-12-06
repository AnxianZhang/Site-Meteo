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
     * qlq exemples (tout les données seront stocker dans une bd !)
     */
    L.marker([48.85853948884913, 2.2945134841395256], {
        title: "Tour Eiffel",
        icon: L.icon({
            iconUrl: 'https://www.gigamic.com/files/catalog/products/images/gigamic_pwei_tour-eiffel_model_bd.png',
            iconSize: [48, 48],
        })
    }).addTo(map)
        .bindPopup("<h2>IUT de paris</h2><center><img width='50px' height= '50px' src='../icon.png' alt='iut img' />Bonjour</center>")
        .on("click", e => {
            map.flyTo(e.latlng, 15);
        });

    L.marker([43.72315357305774, 10.396682828121708], {
        title: "Tour de Pise",
        icon: L.icon({
            iconUrl: 'https://assets.stickpng.com/images/580b585b2edbce24c47b2d66.png',
            iconSize: [48, 48],
        })
    }).addTo(map);
    L.marker([27.175412029508465, 78.04226021413929], {
        title: "Taj Mahal",
        icon: L.icon({
            iconUrl: 'https://freepngimg.com/download/taj_mahal/33092-9-taj-mahal-photos.png',
            iconSize: [48, 48],
        })
    }).addTo(map);
    L.marker([40.18965860495749, 116.38931617630404], {
        title: "Cité interdite",
        icon: L.icon({
            iconUrl: 'https://png.pngtree.com/png-clipart/20220125/original/pngtree-the-imperial-palace-png-image_7213186.png',
            iconSize: [48, 48],
        })
    }).addTo(map);
    L.marker([35.36132465268525, 138.72740627109457], {
        title: "Mont Fuji",
        icon: L.icon({
            iconUrl: 'https://cdn-icons-png.flaticon.com/512/5896/5896886.png',
            iconSize: [48, 48],
        })
    }).addTo(map);
    L.marker([29.97935529588269, 31.13420189701451], {
        title: "Pyramide de Khéops",
        icon: L.icon({
            iconUrl: 'https://cdn-icons-png.flaticon.com/512/218/218764.png',
            iconSize: [48, 48],
        })
    }).addTo(map);

    /**
     * les popup des icons:
     */
    /*
        let HTMLPopUp = "<h2>IUT de paris</h2><center><img width='50px' height= '50px' src='../icon.png' alt='iut img' />Bonjour</center>";
        let popup = L.popup({
            keepInView: true,
            closeButton: true
        });
        popup.setContent(HTMLPopUp);
    
        let myMarker = L.marker([48.8418565, 2.2683737], myOptions);
        myMarker.addTo(map).bindPopup(popup);*/

    // ajout des évenements sur les icons

    //myIcon.on("click", myIcon.openPopup(popup));
    //map.on('click', onMapClick);
}

const init = () => {
    startMap();
}

$(window).ready(init);