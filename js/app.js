

const init = function() {
    let zoomLevel = 1;
    mapboxgl.accessToken = 'pk.eyJ1Ijoianp1bmlnYXVhYmNzIiwiYSI6ImNtMXBqOXYyOTA1bHoya29kb25nenc4bW8ifQ.zWcn0JIIEkDDfJA6aWJFcQ';
    const lat = 24.14437; 
    const lng = -110.3005;
    const props = {
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v9',
        projection: 'globe',
        zoom: zoomLevel,
        center: [lng, lat]
    };
    const places = [
        {
            lat: 24.3206,
            lng: -110.3192,
            name: 'Manglar Balandra'
        },
        {
            lat: 24.1383,
            lng: -110.3475,
            name: 'Manglar el Conchalito'
        },
        {
            lat: 23.6200,
            lng: -109.6100,
            name: 'El Surgidero'
        }
    ];

    const map = new mapboxgl.Map(props);

    map.addControl(new mapboxgl.NavigationControl());

    map.on('style.load', () => {
        map.setFog({});
    });

    places.forEach(p => {
        new mapboxgl.Marker()
            .setLngLat([p.lng, p.lat])
            .addTo(map);
    });

     let zoomInterval = setInterval(() => {
        if(zoomLevel >= 7) {
            clearInterval(zoomInterval);
        } else {
            zoomLevel += 0.05;
            map.setZoom(zoomLevel);
        }
    }, 100);
};


window.addEventListener('load', init);
