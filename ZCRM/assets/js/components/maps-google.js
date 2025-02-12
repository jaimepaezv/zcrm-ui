(function ($) {
    "use strict";

    // Constructor de GoogleMap
    function GoogleMap() {}

    // Crea un mapa básico
    GoogleMap.prototype.createBasic = function (divId) {
      return new GMaps({
        div: divId,
        lat: -0.22985, // Quito Latitude
        lng: -78.52495 // Quito Longitude
      });
    };

    // Crea un mapa y añade marcadores
    GoogleMap.prototype.createMarkers = function (divId) {
      var map = new GMaps({
        div: divId,
        lat: -0.22985, // Quito Latitude
        lng: -78.52495 // Quito Longitude
      });

      // Marcador de Quito
      map.addMarker({
        lat: -0.22985,    // Quito Latitude
        lng: -78.52495,   // Quito Longitude
        title: "Quito", // Changed title to Quito
        details: {
          database_id: 42,
          author: "HPNeo"
        },
        click: function (e) {
          if (console && console.log) {
            console.log(e);
          }
          alert("You clicked in this marker");
        }
      });

      // Marcador con InfoWindow
      map.addMarker({
        lat: -0.228,     // Quito Latitude - slightly different for visual separation
        lng: -78.52495,   // Quito Longitude
        title: "Marker with InfoWindow",
        infoWindow: {
          content: "<p>HTML Content</p>"
        }
      });

      return map;
    };

    // Crea un mapa tipo Street View
    GoogleMap.prototype.createWithStreetview = function (el, lat, lng) {
      return GMaps.createPanorama({
        el: el,
        lat: lat,
        lng: lng
      });
    };

    // Crea un mapa con distintos tipos y añade tipos de mapas personalizados
    GoogleMap.prototype.createMapByType = function (divId, lat, lng) {
      var map = new GMaps({
        div: divId,
        lat: -0.22985, // Quito Latitude
        lng: -78.52495, // Quito Longitude
        mapTypeControlOptions: {
          mapTypeIds: ["hybrid", "roadmap", "satellite", "terrain", "osm", "cloudmade"]
        }
      });

      // Añade el tipo de mapa "osm" (OpenStreetMap)
      map.addMapType("osm", {
        getTileUrl: function (coord, zoom) {
          return "http://tile.openstreetmap.org/" + zoom + "/" + coord.x + "/" + coord.y + ".png";
        },
        tileSize: new google.maps.Size(256, 256),
        name: "OpenStreetMap",
        maxZoom: 18
      });

      // Añade el tipo de mapa "cloudmade"
      map.addMapType("cloudmade", {
        getTileUrl: function (coord, zoom) {
          return "http://b.tile.cloudmade.com/8ee2a50541944fb9bcedded5165f09d9/1/256/" + zoom + "/" + coord.x + "/" + coord.y + ".png";
        },
        tileSize: new google.maps.Size(256, 256),
        name: "CloudMade",
        maxZoom: 18
      });

      map.setMapTypeId("osm");
      return map;
    };

    // Crea un mapa con estilos personalizados
    GoogleMap.prototype.createWithStyle = function (divId, styles) {
      new GMaps({
        div: divId,
        lat: -0.22985, // Quito Latitude
        lng: -78.52495, // Quito Longitude
        styles: styles
      });
    };

    // Inicializa los mapas al cargar el documento
    GoogleMap.prototype.init = function () {
      var self = this;

      $(document).ready(function () {
        self.createBasic("#gmaps-basic");
        self.createMarkers("#gmaps-markers");
        self.createWithStreetview("#panorama", -0.22985, -78.52495); // Quito Coordinates for Streetview Example as well, for consistency
        self.createMapByType("#gmaps-types", -0.22985, -78.52495); // Quito Coordinates
        self.createWithStyle("#ultra-light", [
          {
            featureType: "water",
            elementType: "geometry",
            stylers: [{ color: "#e9e9e9" }, { lightness: 17 }]
          },
          {
            featureType: "landscape",
            elementType: "geometry",
            stylers: [{ color: "#f5f5f5" }, { lightness: 20 }]
          },
          {
            featureType: "road.highway",
            elementType: "geometry.fill",
            stylers: [{ color: "#ffffff" }, { lightness: 17 }]
          },
          {
            featureType: "road.highway",
            elementType: "geometry.stroke",
            stylers: [{ color: "#ffffff" }, { lightness: 29 }, { weight: 0.2 }]
          },
          {
            featureType: "road.arterial",
            elementType: "geometry",
            stylers: [{ color: "#ffffff" }, { lightness: 18 }]
          },
          {
            featureType: "road.local",
            elementType: "geometry",
            stylers: [{ color: "#ffffff" }, { lightness: 16 }]
          },
          {
            featureType: "poi",
            elementType: "geometry",
            stylers: [{ color: "#f5f5f5" }, { lightness: 21 }]
          },
          {
            featureType: "poi.park",
            elementType: "geometry",
            stylers: [{ color: "#dedede" }, { lightness: 21 }]
          },
          {
            elementType: "labels.text.stroke",
            stylers: [{ visibility: "on" }, { color: "#ffffff" }, { lightness: 16 }]
          },
          {
            elementType: "labels.text.fill",
            stylers: [{ saturation: 36 }, { color: "#333333" }, { lightness: 40 }]
          },
          {
            elementType: "labels.icon",
            stylers: [{ visibility: "off" }]
          },
          {
            featureType: "transit",
            elementType: "geometry",
            stylers: [{ color: "#f2f2f2" }, { lightness: 19 }]
          },
          {
            featureType: "administrative",
            elementType: "geometry.fill",
            stylers: [{ color: "#fefefe" }, { lightness: 20 }]
          },
          {
            featureType: "administrative",
            elementType: "geometry.stroke",
            stylers: [{ color: "#fefefe" }, { lightness: 17 }, { weight: 1.2 }]
          }
        ]);
      });

      // Estilos para el mapa "dark"
      this.createWithStyle("#dark", [
        {
          featureType: "all",
          elementType: "labels",
          stylers: [{ visibility: "on" }]
        },
        {
          featureType: "all",
          elementType: "labels.text.fill",
          stylers: [{ saturation: 36 }, { color: "#000000" }, { lightness: 40 }]
        },
        {
          featureType: "all",
          elementType: "labels.text.stroke",
          stylers: [{ visibility: "on" }, { color: "#000000" }, { lightness: 16 }]
        },
        {
          featureType: "all",
          elementType: "labels.icon",
          stylers: [{ visibility: "off" }]
        },
        {
          featureType: "administrative",
          elementType: "geometry.fill",
          stylers: [{ color: "#000000" }, { lightness: 20 }]
        },
        {
          featureType: "administrative",
          elementType: "geometry.stroke",
          stylers: [{ color: "#000000" }, { lightness: 17 }, { weight: 1.2 }]
        },
        {
          featureType: "administrative.country",
          elementType: "labels.text.fill",
          stylers: [{ color: "#e5c163" }]
        },
        {
          featureType: "administrative.locality",
          elementType: "labels.text.fill",
          stylers: [{ color: "#c4c4c4" }]
        },
        {
          featureType: "administrative.neighborhood",
          elementType: "labels.text.fill",
          stylers: [{ color: "#e5c163" }]
        },
        {
          featureType: "landscape",
          elementType: "geometry",
          stylers: [{ color: "#000000" }, { lightness: 20 }]
        },
        {
          featureType: "poi",
          elementType: "geometry",
          stylers: [{ color: "#000000" }, { lightness: 21 }, { visibility: "on" }]
        },
        {
          featureType: "poi.business",
          elementType: "geometry",
          stylers: [{ visibility: "on" }]
        },
        {
          featureType: "road.highway",
          elementType: "geometry.fill",
          stylers: [{ color: "#e5c163" }, { lightness: 0 }]
        },
        {
          featureType: "road.highway",
          elementType: "geometry.stroke",
          stylers: [{ visibility: "off" }]
        },
        {
          featureType: "road.highway",
          elementType: "labels.text.fill",
          stylers: [{ color: "#ffffff" }]
        },
        {
          featureType: "road.highway",
          elementType: "labels.text.stroke",
          stylers: [{ color: "#e5c163" }]
        },
        {
          featureType: "road.arterial",
          elementType: "geometry",
          stylers: [{ color: "#000000" }, { lightness: 18 }]
        },
        {
          featureType: "road.arterial",
          elementType: "geometry.fill",
          stylers: [{ color: "#575757" }]
        },
        {
          featureType: "road.arterial",
          elementType: "labels.text.fill",
          stylers: [{ color: "#ffffff" }]
        },
        {
          featureType: "road.arterial",
          elementType: "labels.text.stroke",
          stylers: [{ color: "#2c2c2c" }]
        },
        {
          featureType: "road.local",
          elementType: "geometry",
          stylers: [{ color: "#000000" }, { lightness: 16 }]
        },
        {
          featureType: "road.local",
          elementType: "labels.text.fill",
          stylers: [{ color: "#999999" }]
        },
        {
          featureType: "transit",
          elementType: "geometry",
          stylers: [{ color: "#000000" }, { lightness: 19 }]
        },
        {
          featureType: "water",
          elementType: "geometry",
          stylers: [{ color: "#000000" }, { lightness: 17 }]
        }
      ]);
    };

    // Se asigna la instancia de GoogleMap al objeto jQuery
    $.GoogleMap = new GoogleMap();
    $.GoogleMap.Constructor = GoogleMap;

  })(window.jQuery);

  // Inicializa el mapa cuando se carga la página
  (function () {
    "use strict";
    window.jQuery.GoogleMap.init();
  })();