/*jslint browser: true*/
/*global Tangram, gui */

map = (function () {
    'use strict';

    var map_start_location = [0,0,2];

    /*** URL parsing ***/

    // leaflet-style URL hash pattern:
    // #[zoom],[lat],[lng]
    var url_hash = window.location.hash.slice(1, window.location.hash.length).split('/');

    if (url_hash.length == 3) {
        map_start_location = [url_hash[1],url_hash[2], url_hash[0]];
        // convert from strings
        map_start_location = map_start_location.map(Number);
    }

    /*** Map ***/

    var map = L.map('map',
        {"keyboardZoomOffset" : .05}
    );

    var style_file = 'globe.yaml';
    var url_search = window.location.search.slice(1);
    if (url_search.length > 0) {
        var ext = url_search.lastIndexOf('yaml');
        if (ext > -1) {
            style_file = url_search.substr(0, ext + 4);
        }
        if (url_search.lastIndexOf('noscroll') > -1) {
            map.scrollWheelZoom.disable();
            map.touchZoom.disable();
        }
    }

    var layer = Tangram.leafletLayer({
        scene: style_file,
        attribution: '<a href="https://mapzen.com/tangram" target="_blank">Tangram</a> | &copy; OSM contributors | <a href="https://mapzen.com/" target="_blank">Mapzen</a>'
    });

    window.layer = layer;
    var scene = layer.scene;
    window.scene = scene;

    // setView expects format ([lat, long], zoom)
    map.setView(map_start_location.slice(0, 3), map_start_location[2]);

    var hash = new L.Hash(map);

    /***** Render loop *****/

    window.addEventListener('load', function () {
        // Scene initialized
        layer.on('init', function() {
        });
        layer.addTo(map);
    });

    return map;

}());
