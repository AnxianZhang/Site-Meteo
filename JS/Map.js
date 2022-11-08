const lesCentres = [ // in order
    [48.863375896070295, 2.3361572005665012],
    [48.86886239211341, 2.3430180682787083],
    [48.86331664341219, 2.3607139147670617],
    [48.85501703126173, 2.3579802573781885],
    [48.84490629727054, 2.350728590055977],
    [48.85050520773673, 2.333989205095406],
    [48.856353173406255, 2.312621149708161],
    [48.873309248371974, 2.3122331727270713],
    [48.87780047280575, 2.3384485463100275],
    [48.87702010936517, 2.3609094022830326],
    [48.85747839833945, 2.379765137220683],
    [48.83686727528985, 2.41614682874437],
    [48.82938688720201, 2.363206557150762],
    [48.83169592045265, 2.3276497843958124],
    [48.8408681862523, 2.2923728253480444],
    [48.86033989255914, 2.2550441671290984],
    [48.888160939619176, 2.3084997469975317],
    [48.89342613034521, 2.349256323305188],
    [48.88785350693627, 2.386651248151317],
    [48.86309270659322, 2.402023206892703]
];

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
        error: function() {
            alert("PB avec l'URL");
        }
    });   
}

const startMap = () => {
    mapProps = {
        center: [48.8418565, 2.2683737],
        zoom: 14
    };
    let map = L.map('map', mapProps);
    let base = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png').addTo(map);

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

    let myMarker = L.marker([48.8418565, 2.2683737], myOptions);
    myMarker.addTo(map).bindPopup("Ici c'est l'iut de Paris :))");

    function onMapClick(e) {
        popup
            .setLatLng(e.latlng)
            .setContent("Hello click détecté sur la carte !<br/> " + e.latlng.toString())
            .openOn(map);
    }

    map.on('click', onMapClick);
}

const init = () => {
    startMap();
}

$(window).ready(init);