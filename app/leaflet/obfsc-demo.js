//MAP
//const center = dptos.getBounds().getCenter()
var map = L.map("map", {
  center: [-37.0562, -59.502],
  zoom: 9,
  maxZoom: 17,
  minZoom: 8,
  zoomControl: false,
  rotate: true,
  touchRotate: false,
  rotateControl: {
    closeOnZeroBearing: false,
    position: "topleft",
  },
  bearing: 0,
});

//ZOOM CONTROL
var zoomControl = L.control.zoom({ position: "topleft" }).addTo(map);

//BASE MAP
var osm = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
}).addTo(map);
var Esri_WorldImagery = L.tileLayer(
  "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
  {}
);

//ESCALA
L.control.scale({ position: "bottomleft" }).addTo(map);

//MINIMAPA
var osm2 = new L.TileLayer(
  "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
  { minZoom: 0, maxZoom: 13 }
);
var miniMap = new L.Control.MiniMap(osm2, { position: "bottomleft" }).addTo(
  map
);

/**************************************CAPAS******************************************/
var dptos = L.geoJSON(dpto_tandil, {
  style: dptoStyle,
  onEachFeature: popup,
}).addTo(map);

map.fitBounds(dptos.getBounds()); //CENTRAR EN LA CAPA DPTOS

var girasol = L.geoJSON(cultivosGruesa, {
  style: cultivosStyle,
  filter: (feature) => {
    if (
      feature.properties.Cultivo === "Girasol" &&
      feature.properties.Dpto === "Tandil"
    ) {
      return true;
    } else {
      return false;
    }
  },
  onEachFeature: popup,
});
var maiz = L.geoJSON(cultivosGruesa, {
  style: cultivosStyle,
  filter: (feature) => {
    if (
      feature.properties.Cultivo === "Maíz" &&
      feature.properties.Dpto === "Tandil"
    ) {
      return true;
    } else {
      return false;
    }
  },
  onEachFeature: popup,
});
var soja1ra = L.geoJSON(cultivosGruesa, {
  style: cultivosStyle,
  filter: (feature) => {
    if (
      feature.properties.Cultivo === "Soja 1ra." &&
      feature.properties.Dpto === "Tandil"
    ) {
      return true;
    } else {
      return false;
    }
  },
  onEachFeature: popup,
});
var soja2da = L.geoJSON(cultivosGruesa, {
  style: cultivosStyle,
  filter: (feature) => {
    if (
      feature.properties.Cultivo === "Soja 2da." &&
      feature.properties.Dpto === "Tandil"
    ) {
      return true;
    } else {
      return false;
    }
  },
  onEachFeature: popup,
});

//var objName=cebada; //variable checkbox

/***************************************STYLE****************************************/
function dptoStyle() {
  return {
    fillColor: "#3388ff",
    fillOpacity: 0.05,
    color: "black",
    weight: 2,
    opacity: 1,
    dashArray: "8",
  };
}
function cultivosStyle(feature, latlng) {
  if (feature.properties.Cultivo == "Girasol") {
    return {
      fillColor: "rgba(46, 247, 33)",
      fillOpacity: 0.5,
      color: "black",
      weight: 1.2,
      opacity: 1,
    };
  } else if (feature.properties.Cultivo == "Maíz") {
    return {
      fillColor: "rgba(243, 16, 16)",
      fillOpacity: 0.5,
      color: "black",
      weight: 1.2,
      opacity: 1,
    };
  } else if (feature.properties.Cultivo == "Soja 1ra.") {
    return {
      fillColor: "rgba(248, 88, 226)",
      fillOpacity: 0.5,
      color: "black",
      weight: 1.2,
      opacity: 1,
    };
  } else if (feature.properties.Cultivo == "Soja 2da.") {
    return {
      fillColor: "rgba(33, 49, 247)",
      fillOpacity: 0.5,
      color: "black",
      weight: 1.2,
      opacity: 1,
    };
  }
}

/***************************************POPUP--MOUSEOVER****************************************/
function popup(feature, layer) {
  {
    //POPUP
    layer.bindPopup(
      "<hr>" +
        "<pre>" +
        JSON.stringify(feature.properties, null, " ").replace(/[\{\}"]/g, "") +
        "</pre>" +
        "<hr>",
      { className: "" }
    );
  }
}

/***************************************LAYER CONTROL****************************************/
var baseLayers = {
  OpenStreetMap: osm,
  "Imágen Satelital": Esri_WorldImagery,
};

var layersControl = L.control.layers(
  null,
  {
    '<svg style="width:20px; height:10px;vertical-align: inherit; margin-right: 4px;"><rect width="20" height="10" style="fill:rgba(46, 247, 33);stroke-width:2.5;stroke:black"/></svg><span>Girasol</span>':
      girasol,
    '<svg style="width:20px; height:10px;vertical-align: inherit; margin-right: 4px;"><rect width="20" height="10" style="fill:rgba(243, 16, 16);stroke-width:2.5;stroke:black"/></svg><span>Maíz</span>':
      maiz,
    '<svg style="width:20px; height:10px;vertical-align: inherit; margin-right: 4px;"><rect width="20" height="10" style="fill:rgba(248, 88, 226);stroke-width:2.5;stroke:black"/></svg><span>Soja 1ra</span>':
      soja1ra,
    '<svg style="width:20px; height:10px;vertical-align: inherit; margin-right: 4px;"><rect width="20" height="10" style="fill:rgba(33, 49, 247);stroke-width:2.5;stroke:black"/></svg><span>Soja 2da</span>':
      soja2da,
    /*'<svg style="width:20px; height:10px;vertical-align: inherit; margin-right: 4px;"><rect width="20" height="10" style="fill:#3388ff;stroke-width:2.5;stroke:black"/></svg><span>Tandil</span>':
      dptos,*/
  },
  { collapsed: false, position: "topright" }
);
layersControl.addTo(map);
var layersControlBase = L.control.layers(baseLayers, null, {
  collapsed: true,
  position: "topleft",
});
layersControlBase.addTo(map);

/******************************************MARCA DE AGUA***********************************/
var img = L.DomUtil.create("img");
L.Control.Watermark = L.Control.extend({
  onAdd: function (map) {
    img.src = "./img/logo.jpeg";
    img.style.width = "150px";
    img.style.opacity = "70%";

    return img;
  },

  onRemove: function (map) {
    // Nothing to do here
  },
});

L.control.watermark = function (opts) {
  return new L.Control.Watermark(opts);
};

L.control
  .attribution({
    prefix:
      '<span style="font-size: smaller;">Credits: </span><a href="https://mapgeogis.com/" rel="author" target="_blank" style="font-size: smaller;">© MapGeoGIS</a>',
    position: "bottomright",
  })
  .addTo(map);
L.control.watermark({ position: "bottomright" }).addTo(map);

/******************************************CONTROL BAR***********************************/
//BARRA LAYERS
var controlBarLayers = L.control.bar("layers", {
  position: "bottom",
  visible: true,
});
map.addControl(controlBarLayers);
//controlBarLayers.hide();
controlBarLayers.setContent(
  '<button class="btn btn-secondary btn-sm" id="girasol" role="button" aria-pressed="true">Girasol</button><button class="btn btn-secondary btn-sm" id="maiz" role="button" aria-pressed="true">Maiz</button><button class="btn btn-secondary btn-sm" id="soja1ra" role="button" aria-pressed="true">Soja 1ra</button><button class="btn btn-secondary btn-sm" id="soja2da" role="button" aria-pressed="true">Soja 2da</button><span id="results" style="margin-left:1em;float:right;font-family:monospace;font-size: larger"><div class="spinner-border" style="margin-right:1em" role="status"><span class="visually-hidden">Loading...</span></div></span>'
);

//CAMPAÑA GRUESA 2022/23
var controlBarGraph = L.control.bar("barGraph", {
  position: "left",
  visible: true,
});
map.addControl(controlBarGraph);
controlBarGraph.setContent(
  '<div class=""><canvas id="grafico-cgTandil"></canvas><hr><canvas id="grafico-cgTandilFilter"></canvas></div>'
);

/******************************************CHART***********************************/
const footer1 = (tooltipItems) => {
  let has = "";

  tooltipItems.forEach(function (tooltipItem) {
    if (tooltipItem.parsed === 23) {
      has = "64.044";
    } else if (tooltipItem.parsed === 21) {
      has = "57.109";
    } else if (tooltipItem.parsed === 26) {
      has = "72.794";
    } else if (tooltipItem.parsed === 30) {
      has = "83.224";
    }
  });
  return has + " Hectáreas";
};

let canvaCGTandil = document
  .getElementById("grafico-cgTandil")
  .getContext("2d");
chartCGTandil = new Chart(canvaCGTandil, {
  type: "pie",
  data: {
    labels: ["Girasol", "Maíz", "Soja 1ra", "Soja 2da"],
    datasets: [
      {
        data: [23, 21, 26, 30],
        backgroundColor: [
          "rgba(46, 247, 33, 0.7)",
          "rgba(243, 16, 16, 0.7)",
          "rgba(248, 88, 226, 0.7)",
          "rgba(33, 49, 247 , 0.7)",
        ],
        hoverOffset: 12,
      },
    ],
  },
  options: {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Cultivos Gruesa",
      },
      tooltip: {
        enabled: true,
        callbacks: {
          footer: footer1,
        },
      },
      datalabels: {
        color: "black",
        font: {
          size: 14,
        },
        formatter: (value) => {
          return `${value}%`;
        },
      },
    },
  },
  plugins: [ChartDataLabels],
});
