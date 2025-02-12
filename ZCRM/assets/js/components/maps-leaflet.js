"use strict";

(function() {
  // Mapa básico
  const basicMapElement = document.getElementById("basicMap");
  if (basicMapElement) {
    const basicMap = L.map("basicMap").setView([48.8566, 2.3522], 10); // París, Francia
    L.tileLayer("https://{s}.tile.osm.org/{z}/{x}/{y}.png", {
      attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a>',
      maxZoom: 18
    }).addTo(basicMap);
  }

  // Mapa con formas (shapeMap)
  const shapeMapElement = document.getElementById("shapeMap");
  if (shapeMapElement) {
    const shapeMap = L.map("shapeMap").setView([41.9028, 12.4964], 12); // Roma, Italia

    // Añadir marcador
    L.marker([41.9028, 12.4964]).addTo(shapeMap).bindPopup("¡Roma!"); // Marcador en Roma

    // Añadir círculo - Coliseo aproximado
    L.circle([41.8902, 12.4923], {
      color: "blue", // Cambiado color para diferenciación
      fillColor: "#87CEFA", // Azul claro
      fillOpacity: 0.5,
      radius: 500
    }).addTo(shapeMap).bindPopup("Coliseo (aproximado)"); // Círculo cerca del Coliseo

    // Añadir polígono - Plaza Navona aproximada
    L.polygon([
      [41.9009, 12.4727],
      [41.9013, 12.4743],
      [41.9003, 12.4752],
      [41.8999, 12.4736]
    ]).addTo(shapeMap).bindPopup("Plaza Navona (aproximada)"); // Polígono en Plaza Navona

    // Capa de teselas (tiles)
    L.tileLayer("https://{s}.tile.osm.org/{z}/{x}/{y}.png", {
      attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a>',
      maxZoom: 18
    }).addTo(shapeMap);
  }

  // Mapa con marcador arrastrable (dragMap)
  const dragMapElement = document.getElementById("dragMap");
  if (dragMapElement) {
    const dragMap = L.map("dragMap").setView([52.5200, 13.4050], 12); // Berlin, Alemania
    const draggableMarker = L.marker([52.5200, 13.4050], { draggable: true }).addTo(dragMap); // Marcador en Berlín
    draggableMarker.bindPopup("<b>¡Estás aquí en Berlín!</b>").openPopup(); // Popup actualizado

    L.tileLayer("https://{s}.tile.osm.org/{z}/{x}/{y}.png", {
      attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a>',
      maxZoom: 18
    }).addTo(dragMap);
  }

  // Mapa que localiza al usuario (userLocation)
  const userLocationElement = document.getElementById("userLocation");
  if (userLocationElement) {
    const userMap = L.map("userLocation").setView([40.4168, -3.7038], 10); // Madrid, España
    userMap.locate({ setView: true, maxZoom: 16 });

    userMap.on("locationfound", function(e) {
      const accuracy = e.accuracy;
      L.marker(e.latlng)
        .addTo(userMap)
        .bindPopup("Estás a unos " + accuracy + " metros de este punto en Madrid") // Contexto en Madrid
        .openPopup();
      L.circle(e.latlng, accuracy).addTo(userMap);
    });

    L.tileLayer("https://{s}.tile.osm.org/{z}/{x}/{y}.png", {
      attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a>',
      maxZoom: 18
    }).addTo(userMap);
  }

  // Mapa con íconos personalizados (customIcons)
  const customIconsElement = document.getElementById("customIcons");
  if (customIconsElement) {
    const iconsMap = L.map("customIcons").setView([52.3676, 4.9041], 10); // Amsterdam, Países Bajos

    // Definición de íconos personalizados - Rutas a assets/images/png deben ser correctas en tu proyecto
    const greenIcon = L.icon({
      iconUrl: "assets/images/png/leaf-green.png",
      shadowUrl: "assets/images/png/leaf-shadow.png",
      iconSize: [38, 95],
      shadowSize: [50, 64],
      iconAnchor: [22, 94],
      shadowAnchor: [4, 62],
      popupAnchor: [-3, -76]
    });

    const redIcon = L.icon({
      iconUrl: "assets/images/png/leaf-red.png",
      shadowUrl: "assets/images/png/leaf-shadow.png",
      iconSize: [38, 95],
      shadowSize: [50, 64],
      iconAnchor: [22, 94],
      shadowAnchor: [4, 62],
      popupAnchor: [-3, -76]
    });

    const orangeIcon = L.icon({
      iconUrl: "assets/images/png/leaf-orange.png",
      shadowUrl: "assets/images/png/leaf-shadow.png",
      iconSize: [38, 95],
      shadowSize: [50, 64],
      iconAnchor: [22, 94],
      shadowAnchor: [4, 62],
      popupAnchor: [-3, -76]
    });

    // Añadir marcadores con íconos personalizados en Amsterdam - Ajustado para estar dentro de Amsterdam
    L.marker([52.3641, 4.8903], { icon: redIcon }).addTo(iconsMap).bindPopup("Icono Rojo en Amsterdam"); // Rijksmuseum area
    L.marker([52.3791, 4.9002], { icon: greenIcon }).addTo(iconsMap).bindPopup("Icono Verde en Amsterdam"); // Centraal Station area
    L.marker([52.3551, 4.9157], { icon: orangeIcon }).addTo(iconsMap).bindPopup("Icono Naranja en Amsterdam"); // Vondelpark area

    L.tileLayer("https://{s}.tile.osm.org/{z}/{x}/{y}.png", {
      attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a>',
      maxZoom: 18
    }).addTo(iconsMap);
  }

  // Mapa con control de capas (layerControl)
  const layerControlElement = document.getElementById("layerControl");
  if (layerControlElement) {
    // Marcadores para ciudades europeas
    const viennaMarker = L.marker([48.2084, 16.3731]).bindPopup("Esta es Viena, Austria."); // Viena
    const salzburgMarker = L.marker([47.8095, 13.0550]).bindPopup("Esta es Salzburgo, Austria."); // Salzburgo
    const grazMarker = L.marker([47.0707, 15.4395]).bindPopup("Esta es Graz, Austria."); // Graz
    const linzMarker = L.marker([48.3062, 14.2863]).bindPopup("Esta es Linz, Austria."); // Linz

    // Grupo de capas de ciudades austriacas
    const austrianCitiesLayer = L.layerGroup([
      viennaMarker,
      salzburgMarker,
      grazMarker,
      linzMarker
    ]);

    // Capas base
    const streetLayer = L.tileLayer("https://{s}.tile.osm.org/{z}/{x}/{y}.png", {
      attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a>',
      maxZoom: 18
    });
    const watercolorLayer = L.tileLayer("http://tile.stamen.com/watercolor/{z}/{x}/{y}.jpg", {
      attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a>',
      maxZoom: 18
    });

    // Inicializar el mapa con las capas predeterminadas - Centrado en Viena
    const layerControlMap = L.map("layerControl", {
      center: [48.2084, 16.3731],
      zoom: 8, // Ajustado zoom para ver mejor Austria
      layers: [streetLayer, austrianCitiesLayer]
    });

    // Agregar control de capas - Contexto austriaco
    L.control.layers(
      { Street: streetLayer, Watercolor: watercolorLayer },
      { "Ciudades Austriacas": austrianCitiesLayer } // Nombre de la capa actualizado
    ).addTo(layerControlMap);

    // Capa adicional
    L.tileLayer("https://c.tile.osm.org/{z}/{x}/{y}.png", {
      attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a>',
      maxZoom: 18
    }).addTo(layerControlMap);
  }

  // Mapa con GeoJSON (geoJson)
  const geoJsonElement = document.getElementById("geoJson");
  if (geoJsonElement) {
    const geoJsonMap = L.map("geoJson").setView([44.2669, -72.576], 3); // Centered on US for US States Data

    // Agregar datos GeoJSON sin estilos
    L.geoJson(statesData).addTo(geoJsonMap);

    // Agregar datos GeoJSON con estilos basados en la densidad
    L.geoJson(statesData, {
      style: function(feature) {
        const density = feature.properties.density;
        let fillColor = "#FFEDA0"; // Valor por defecto

        if (density > 1000) {
          fillColor = "#800026";
        } else if (density > 500) {
          fillColor = "#BD0026";
        } else if (density > 200) {
          fillColor = "#E31A1C";
        } else if (density > 100) {
          fillColor = "#FC4E2A";
        } else if (density > 50) {
          fillColor = "#FD8D3C";
        } else if (density > 20) {
          fillColor = "#FEB24C";
        } else if (density > 10) {
          fillColor = "#FED976";
        }

        return {
          fillColor: fillColor,
          weight: 2,
          opacity: 1,
          color: "white",
          dashArray: "3",
          fillOpacity: 0.7
        };
      }
    }).addTo(geoJsonMap);

    L.tileLayer("https://{s}.tile.osm.org/{z}/{x}/{y}.png", {
      attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a>',
      maxZoom: 18
    }).addTo(geoJsonMap);
  }
})();