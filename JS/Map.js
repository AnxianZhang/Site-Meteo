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
            alert("Problem occured in ajax");
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

    Array.from(data).forEach(siteInfo => {
        L.marker([siteInfo['latitude'], siteInfo['lontitude']], {
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