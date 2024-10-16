function init() {
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
