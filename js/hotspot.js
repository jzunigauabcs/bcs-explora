function init() {
    const close = document.querySelector('.close');
    close.addEventListener('click', ()=> {
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

            el.setAttribute('src', '#hotspot');
            el.setAttribute('look-at', '#cam');
            el.addEventListener('click', function(e) {
                const sky = document.querySelector('#sky');
                sky.setAttribute('src', data.linkto);
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

document.addEventListener('DOMContentLoaded', function() {
    init()
}); 

AFRAME.registerComponent('visibilidad', {
    init: function () {
        const openImage = document.querySelector('#open');
        const hsp1Image = document.querySelector('#hsp1-image');
        const closeButton = hsp1Image.querySelector('#close');

        openImage.addEventListener('mouseenter', () => {
            openImage.setAttribute('visible', 'false');
            hsp1Image.setAttribute('visible', 'true');
        });

        closeButton.addEventListener('mouseenter', () => {
            openImage.setAttribute('visible', 'true');
            hsp1Image.setAttribute('visible', 'false');
        });
    }
});
AFRAME.registerComponent('visibilidad2', {
    init: function () {
        const openImage = document.querySelector('#open2');
        const hsp1Image = document.querySelector('#hsp1-image2');
        const closeButton = hsp1Image.querySelector('#close2');

        openImage.addEventListener('mouseenter', () => {
            openImage.setAttribute('visible', 'false');
            hsp1Image.setAttribute('visible', 'true');
        });

        closeButton.addEventListener('mouseenter', () => {
            openImage.setAttribute('visible', 'true');
            hsp1Image.setAttribute('visible', 'false');
        });
    }
});

