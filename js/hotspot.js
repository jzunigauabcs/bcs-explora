function init() {
    console.log("Init function running");
    const close = document.querySelector('.close');
    close.addEventListener('click', ()=> {
        console.log("click")
        history.back();
    });
    AFRAME.registerComponent('spot', {
        schema: {
            linkto: {type: 'string', default: ''},
            spotgroup: {type: 'string', default: ''}
        },
        init: function() {
            const el = this.el;
            const data = this.data;
            const imgSrc = el.classList.contains('atras') ? '#atras' : el.classList.contains('adelante') ? '#adelante' : null;

            el.setAttribute('src', imgSrc);
            el.setAttribute('look-at', '#cam');
            el.addEventListener('click', function(e) {
            const sky = document.querySelector('#sky');
            sky.setAttribute('src', data.linkto);

                
            cambiarTexto(data.linkto.replace('#', ''));
                /*sky.setAttribute('animation__fadeout', {
                    property: 'material.opacity',
                    to: 0,
                    dur: 500,
                    easing: 'easeInQuad',
                });*/
                const spotComp = document.querySelector('#spots');
                const currentSpot = this.parentElement.getAttribute('id');
                spotComp.emit('reloadspot', {newspot: data.spotgroup, currentSpot: currentSpot})
            })
        }
    });
    
    AFRAME.registerComponent('hotspots', {
        init: function() {
            const el = this.el;
            el.addEventListener('reloadspot', function(e) {
                const currentSpotGroup = document.querySelector(`#${e.detail.currentSpot}`);
                currentSpotGroup.setAttribute('scale', '0 0 0');
                const newspotgroup = document.querySelector(`#${e.detail.newspot}`);
                newspotgroup.setAttribute("scale", "1 1 1");
            });
        }
    });
}
AFRAME.registerComponent('visibilidad', {
    schema: {
        openImageId: {type: 'string', default: ''},
        imageId: {type: 'string', default: ''},
        closeId: {type: 'string', default: ''}
    },
    init: function () {
        const openImage = document.querySelector(`#${this.data.openImageId}`);
        const hspImage = document.querySelector(`#${this.data.imageId}`);
        const closeButton = hspImage.querySelector(`#${this.data.closeId}`);

        openImage.addEventListener('mouseenter', () => {
            openImage.setAttribute('visible', 'false');
            hspImage.setAttribute('visible', 'true');
        });

        closeButton.addEventListener('mouseenter', () => {
            openImage.setAttribute('visible', 'true');
            hspImage.setAttribute('visible', 'false');
        });
    }
});
    function autoPlayVideos(videoIds) {
    videoIds.forEach(id => {
        const videoElement = document.getElementById(id);
        if (videoElement) {
            videoElement.addEventListener('loadeddata', () => {
                videoElement.play();
            });
        } else {
            console.warn(`El elemento con ID "${id}" no se encontró.`);
        }
    });
    }
    autoPlayVideos(['video', 'atras', 'adelante']);
    
    AFRAME.registerComponent('carousel', {
        init: function () {
    
          this.slides = [
            {
              image: '#hsp2',
              title: 'El junco',
              description: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id laborum."'
            },
            {
              image: '#hsp3',
              title: 'El lorem',
              description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
            },
            {
              image: '#hsp4',
              title: 'El lurin',
              description: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.'
            }
          ];
      
          this.currentIndex = 0;
          this.updateSlide();
      
          const nextButton = this.el.querySelector('.carousel-next');
          const prevButton = this.el.querySelector('.carousel-prev');
      
          nextButton.addEventListener('mouseenter', () => this.nextSlide());
          prevButton.addEventListener('mouseenter', () => this.prevSlide());
        },
      
        updateSlide: function () {
          const currentSlide = this.slides[this.currentIndex];
          const imageEl = this.el.querySelector('#carousel-image');
          const titleEl = this.el.querySelector('#carousel-title');
          const descriptionEl = this.el.querySelector('#carousel-description');
    
          imageEl.setAttribute('src', currentSlide.image);
          titleEl.setAttribute('value', currentSlide.title);
          descriptionEl.setAttribute('value', currentSlide.description);
        },
        nextSlide: function () {
          this.currentIndex = (this.currentIndex + 1) % this.slides.length;
          this.updateSlide();
        },
        prevSlide: function () {
          this.currentIndex = (this.currentIndex - 1 + this.slides.length) % this.slides.length;
          this.updateSlide();
        }
      });
    
    function cambiarTexto(sceneId){
    const scenes = {
        'point1': 'Escenario 1',
        'point2': 'Escenario 2',
        'point3': 'Escenario 3',
        'point4': 'Escenario 4',
        'point5': 'Escenario 5'
    };

    const texto = document.querySelector('#scene-value');
    texto.setAttribute('value', scenes[sceneId]);

}
window.addEventListener('load', function() {
    init()
}); 