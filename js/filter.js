let data = [
  {
    features: girasol.toGeoJSON().features,
    intersectionFeatures: [],
    intersectionArea: 0,
  },
  {
    features: maiz.toGeoJSON().features,
    intersectionFeatures: [],
    intersectionArea: 0,
  },
  {
    features: soja1ra.toGeoJSON().features,
    intersectionFeatures: [],
    intersectionArea: 0,
  },
  {
    features: soja2da.toGeoJSON().features,
    intersectionFeatures: [],
    intersectionArea: 0,
  },
];

/*****************************DRAW TOOL*****************************/
var drawnItems = L.featureGroup().addTo(map);

var drawControl = new L.Control.Draw({
  edit: {
    featureGroup: drawnItems,
    remove: true,
  },
  draw: {
    polygon: {
      allowIntersection: false,
      showArea: true,
    },
    marker: false,
    polyline: false,
    rectangle: false,
    circle: false,
    circlemarker: false,
  },
  position: "topright",
}).addTo(map);

let estiloFiltro = function () {
  return {
    fillColor: "grey",
    fillOpacity: 0.1,
    color: "yellow",
    weight: 3,
    opacity: 1,
  };
};

map.on(L.Draw.Event.CREATED, function (event) {
  drawnItems.clearLayers();
  var layer = event.layer;
  if (drawnItems.getLayers().length === 0) {
    drawnItems.addLayer(layer);
    layersControl.removeLayer(intersectionLayer);
    getDataLayers(data);
    getDataGraph();
    chartCGTandilFilter.data.datasets[0].data = dataGraph;
    chartCGTandilFilter.update();
    intersectionLayer.clearLayers();
    btn.forEach((e) => {
      e.style.backgroundColor = "#6c757d";
      e.style.color = "white";
    });
  } else {
    map;
  }
});

/***************************FUNCION DE INTERSECCION*****************/
var area;
let intersectionLayer = L.geoJSON();
const filterLayers = (features) => {
  let intersectFeatures = [];
  if (intersectionLayer.getLayers().length !== 0) {
    intersectionLayer.clearLayers();
  }

  var drawPolygonGeoJSON = drawnItems.toGeoJSON().features[0];
  //Chequeo que feature intersecta con el dibujo
  features.forEach((feature) => {
    if (turf.intersect(feature, drawPolygonGeoJSON)) {
      intersectFeatures.push(feature);
    }
  });

  if (intersectFeatures.length === 0) {
    alert("NO Hay Intesecciones");
  } else {
    intersectionLayer.addData(intersectFeatures);
    area = 0;
    intersectionLayer.toGeoJSON().features.forEach((feature) => {
      area += feature.properties.Sup_Ha;
    });
  }
  let results = [intersectFeatures, Number(area.toFixed(2))];
  return results;
};

let getDataLayers = (data) =>
  data.map((e) => {
    e.intersectionFeatures = filterLayers(e.features)[0];
    e.intersectionArea = filterLayers(e.features)[1];
  });

/*********************DIBUJAR EL INTERSECTION LAYER **********/
const drawFilter = (name, data, area) => {
  if (intersectionLayer.getLayers().length !== 0) {
    intersectionLayer.clearLayers();
    layersControl.removeLayer(intersectionLayer);
  }
  intersectionLayer.addData(data);
  intersectionLayer.addTo(map);
  layersControl.addOverlay(
    intersectionLayer,
    `<svg style="width:20px; height:10px;vertical-align: inherit; margin-right: 4px;"><rect width="20" height="10" style="fill:white;stroke-width:3;stroke:yellow"/></svg><span>Filtro ${name}</span>`
  );
  intersectionLayer.setStyle(estiloFiltro);
  map.fitBounds(drawnItems.getBounds());
  document.getElementById("results").innerHTML =
    "Superficie seleccionada: " +
    (
      L.GeometryUtil.geodesicArea(drawnItems.getLayers()[0].getLatLngs()[0]) /
      10000
    ).toFixed(2) +
    " has.<hr/>" +
    name +
    ": " +
    area +
    " has.";
};

/**************************BOTONES *********************/
var btn = document.querySelectorAll(".btn.btn-secondary.btn-sm");

var btnGirasol = document.getElementById("girasol");
btnGirasol.addEventListener("click", () => {
  if (drawnItems.getLayers().length !== 0) {
    {
      btn.forEach((e) => {
        e.style.backgroundColor = "#6c757d";
        e.style.color = "white";
      });
      btnGirasol.style.backgroundColor = "yellow";
      btnGirasol.style.color = "black";
      drawFilter(
        "Girasol",
        data[0].intersectionFeatures,
        data[0].intersectionArea
      );
    }
  } else {
    alert("Primero dibuje un polígono para extraer hectareas de este cultivo");
  }
});
var btnMaiz = document.getElementById("maiz");
btnMaiz.addEventListener("click", () => {
  if (drawnItems.getLayers().length !== 0) {
    {
      btn.forEach((e) => {
        e.style.backgroundColor = "#6c757d";
        e.style.color = "white";
      });
      btnMaiz.style.backgroundColor = "yellow";
      btnMaiz.style.color = "black";
      drawFilter(
        "Maíz",
        data[1].intersectionFeatures,
        data[1].intersectionArea
      );
    }
  } else {
    alert("Primero dibuje un polígono para extraer hectareas de este cultivo");
  }
});
var btnSoja1ra = document.getElementById("soja1ra");
btnSoja1ra.addEventListener("click", () => {
  if (drawnItems.getLayers().length !== 0) {
    {
      btn.forEach((e) => {
        e.style.backgroundColor = "#6c757d";
        e.style.color = "white";
      });
      btnSoja1ra.style.backgroundColor = "yellow";
      btnSoja1ra.style.color = "black";
      drawFilter(
        "Soja 1ra",
        data[2].intersectionFeatures,
        data[2].intersectionArea
      );
    }
  } else {
    alert("Primero dibuje un polígono para extraer hectareas de este cultivo");
  }
});
var btnSoja2da = document.getElementById("soja2da");
btnSoja2da.addEventListener("click", () => {
  if (drawnItems.getLayers().length !== 0) {
    {
      btn.forEach((e) => {
        e.style.backgroundColor = "#6c757d";
        e.style.color = "white";
      });
      btnSoja2da.style.backgroundColor = "yellow";
      btnSoja2da.style.color = "black";
      drawFilter(
        "Soja 2da",
        data[3].intersectionFeatures,
        data[3].intersectionArea
      );
    }
  } else {
    alert("Primero dibuje un polígono para extraer hectareas de este cultivo");
  }
});

/***********************CHART FILTER****************************/
let dataGraph;
let sumaArea;
const getDataGraph = () => {
  dataGraph = [];
  sumaArea = 0;
  data.map((e) => (sumaArea += e.intersectionArea));
  data.map((e) =>
    dataGraph.push(Number(((e.intersectionArea / sumaArea) * 100).toFixed(2)))
  );
};

const footerFilter = (tooltipItems) => {
  let has = "";

  tooltipItems.forEach(function (tooltipItem) {
    if (tooltipItem.parsed === dataGraph[0]) {
      has = Number(((dataGraph[0] * sumaArea) / 100).toFixed(2));
    } else if (tooltipItem.parsed === dataGraph[1]) {
      has = Number(((dataGraph[1] * sumaArea) / 100).toFixed(2));
    } else if (tooltipItem.parsed === dataGraph[2]) {
      has = Number(((dataGraph[2] * sumaArea) / 100).toFixed(2));
    } else if (tooltipItem.parsed === dataGraph[3]) {
      has = Number(((dataGraph[3] * sumaArea) / 100).toFixed(2));
    }
  });
  return has + " Hectáreas";
};

let canvaCGTandilFilter = document
  .getElementById("grafico-cgTandilFilter")
  .getContext("2d");
chartCGTandilFilter = new Chart(canvaCGTandilFilter, {
  type: "pie",
  data: {
    labels: ["Girasol", "Maíz", "Soja 1ra", "Soja 2da"],
    datasets: [
      {
        data: dataGraph,
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
        text: "Superficie seleccionada",
      },
      tooltip: {
        enabled: true,
        callbacks: {
          footer: footerFilter,
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
