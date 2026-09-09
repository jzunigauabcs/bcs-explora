const destinations = [
    {
        name: 'Surgidero',
        video: 'resources/videos/test2.mp4',
        link: 'surgidero.html'
    },
    {
        name: 'Balandra',
        video: 'resources/videos/test.mp4',
        link: 'balandra.html'
    },
    {
        name: 'Conchalito',
        video: 'resources/videos/test1.mp4',
        link: 'conchalito.html'
    }
];

let currentIndex = 0;

const backgroundVideo = document.getElementById('background-video');
const destinationButton = document.getElementById('destination-button');
const prevButton = document.getElementById('prev-button');
const nextButton = document.getElementById('next-button');
const dotsContainer = document.getElementById('dots-container');

// crear los puntos dinámicamente según cuántos destinos haya
function buildDots() {
    dotsContainer.innerHTML = '';
    destinations.forEach((dest, index) => {
        const dot = document.createElement('button');
        dot.classList.add('dot');
        dot.setAttribute('aria-label', `Ir a ${dest.name}`);
        dot.addEventListener('click', () => {
            currentIndex = index;
            updateDestination();
        });
        dotsContainer.appendChild(dot);
    });
}

function updateDots() {
    const dots = dotsContainer.querySelectorAll('.dot');
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentIndex);
    });
}

function updateDestination() {
    const destination = destinations[currentIndex];

    // cambiar nombre
    destinationButton.textContent = destination.name;

    // cambiar video
    backgroundVideo.src = destination.video;
    backgroundVideo.load();
    backgroundVideo.play().catch(error => {
        console.log('No se pudo reproducir el video:', error);
    });

    // actualizar puntos
    updateDots();
}

// recorrido anterior
prevButton.addEventListener('click', () => {
    currentIndex--;
    if (currentIndex < 0) {
        currentIndex = destinations.length - 1;
    }
    updateDestination();
});

// sig recorrido
nextButton.addEventListener('click', () => {
    currentIndex++;
    if (currentIndex >= destinations.length) {
        currentIndex = 0;
    }
    updateDestination();
});

// el botón de la palabra central ahora navega directo
destinationButton.addEventListener('click', () => {
    const destination = destinations[currentIndex];
    window.location.href = destination.link;
});

// iniciar
buildDots();
updateDestination();