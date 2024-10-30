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
            name: 'Manglar Balandra',
            link: '#',
        },
        {
            lat: 24.1383,
            lng: -110.3475,
            name: 'Manglar el Conchalito',
            link: '#',
        },
        {
            lat: 23.6200,
            lng: -109.6100,
            name: 'El Surgidero',
            bg: 'surgidero-cover.jpg',
            link: 'surgidero.html',
        }
    ];

    const map = new mapboxgl.Map(props);

    map.addControl(new mapboxgl.NavigationControl());

    map.on('style.load', () => {
        map.setFog({});

        map.flyTo({
            zoom: 7,
            speed: 0.5,
            curve: 1,
            easing: (t) => t
        });
    });

    places.forEach(p => {

        const el = document.createElement('div');
        el.classList.add('marker');

        const bg = p.bg ? p.bg : 'maps-icon.svg';

        el.style.backgroundImage = `url('images/${bg}')`;
        el.addEventListener('click', ()=> {
            location.href = p.link;
        })

        const popup = new mapboxgl.Popup({
            closeButton: false,
            closeOnClick: false
        }).setText(p.name);


        const marker = new mapboxgl.Marker(el)
        .setLngLat([p.lng, p.lat])
        .setPopup(popup)
        .addTo(map);

        el.addEventListener('mouseenter', () => { popup.addTo(map); });
        el.addEventListener('mouseleave', () => { popup.remove(); });

    });
    
};


window.addEventListener('load', init);
