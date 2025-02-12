class VectorMap {
    initWorldMapMarker() {
      new jsVectorMap({
        map: "world",
        selector: "#world-map-markers",
        zoomOnScroll: false,
        zoomButtons: true,
        markersSelectable: true,
        markers: [
          { name: "India", coords: [20.5937, 78.9629] },
          { name: "China", coords: [35.8617, 104.1954] },
          { name: "United States", coords: [37.0902, -95.7129] },
          { name: "Indonesia", coords: [-0.7893, 113.9213] },
          { name: "Pakistan", coords: [30.3753, 69.3451] },
          { name: "Nigeria", coords: [9.0820, 8.6753] },
          { name: "Brazil", coords: [-14.235, -51.9253] },
          { name: "Bangladesh", coords: [23.6850, 90.3563] },
          { name: "Russia", coords: [61, 105] },
          { name: "Mexico", coords: [23.6345, -102.5528] },
        ],
        markerStyle: {
          initial: { fill: "#3e60d5" },
          selected: { fill: "#3e60d56e" }
        },
        regionStyle: {
          initial: { fill: "#9ca3af69", fillOpacity: 1 }
        },
        labels: {
          markers: {
            render: marker => marker.name
          }
        }
      });
    }

    initWorldMarkerLine() {
      new jsVectorMap({
        map: "world_merc",
        selector: "#world-map-markers-line",
        zoomOnScroll: false,
        zoomButtons: false,
        markers: [
          { name: "India", coords: [20.5937, 78.9629] },
          { name: "China", coords: [35.8617, 104.1954] },
          { name: "United States", coords: [37.0902, -95.7129] },
          { name: "Indonesia", coords: [-0.7893, 113.9213] },
          { name: "Pakistan", coords: [30.3753, 69.3451] },
          { name: "Nigeria", coords: [9.0820, 8.6753] },
          { name: "Brazil", coords: [-14.235, -51.9253] },
          { name: "Bangladesh", coords: [23.6850, 90.3563] },
          { name: "Russia", coords: [61, 105] },
          { name: "Mexico", coords: [23.6345, -102.5528] },
        ],
        lines: [
          { from: "India", to: "Nigeria" },
          { from: "China", to: "Nigeria" },
          { from: "United States", to: "Nigeria" },
          { from: "Indonesia", to: "Nigeria" },
          { from: "Pakistan", to: "Nigeria" },
          { from: "Brazil", to: "Nigeria" },
          { from: "Bangladesh", to: "Nigeria" },
          { from: "Russia", to: "Nigeria" },
          { from: "Mexico", to: "Nigeria" }
        ],
        regionStyle: {
          initial: {
            stroke: "#9ca3af",
            strokeWidth: 0.25,
            fill: "#9ca3af69",
            fillOpacity: 1
          }
        },
        markerStyle: {
          initial: { fill: "#9ca3af" },
          selected: { fill: "#9ca3af" }
        },
        lineStyle: {
          animation: true,
          strokeDasharray: "6 3 6"
        }
      });
    }

    initIndiaVectorMap() {
      new jsVectorMap({
        map: "in_mill",
        backgroundColor: "transparent",
        selector: "#india-vector-map",
        regionStyle: {
          initial: { fill: "#16a7e9" }
        }
      });
    }

    initCanadaVectorMap() {
      new jsVectorMap({
        map: "canada",
        selector: "#canada-vector-map",
        zoomOnScroll: false,
        regionStyle: {
          initial: { fill: "#3e60d5" }
        }
      });
    }

    initRussiaVectorMap() {
      new jsVectorMap({
        map: "russia",
        selector: "#russia-vector-map",
        zoomOnScroll: false,
        regionStyle: {
          initial: { fill: "#5d7186" }
        }
      });
    }

    initUsVectorMap() {
      new jsVectorMap({
        map: "us_aea_en",
        selector: "#usa-vector-map",
        regionStyle: {
          initial: { fill: "#3e60d5" }
        }
      });
    }

    initIraqVectorMap() {
      new jsVectorMap({
        map: "iraq",
        selector: "#iraq-vector-map",
        zoomOnScroll: false,
        regionStyle: {
          initial: { fill: "#3e60d5" }
        }
      });
    }

    initSpainVectorMap() {
      new jsVectorMap({
        map: "spain",
        selector: "#spain-vector-map",
        zoomOnScroll: false,
        regionStyle: {
          initial: { fill: "#ffc35a" }
        }
      });
    }

    init() {
      this.initWorldMapMarker();
      this.initWorldMarkerLine();
      this.initIndiaVectorMap();
      this.initCanadaVectorMap();
      this.initRussiaVectorMap();
      this.initUsVectorMap();
      this.initIraqVectorMap();
      this.initSpainVectorMap();
    }
  }

  document.addEventListener("DOMContentLoaded", function() {
    new VectorMap().init();
  });