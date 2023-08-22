//MAP
var map = L.map('map', {
    center: [-36.797510427713355, -59.8473260296755],
    zoom: 9,
    maxZoom: 17,
    minZoom: 8,
    zoomControl: false,
    rotate: true,
    touchRotate: false,
    rotateControl: {
      closeOnZeroBearing: false,
      position: 'topleft',
    },
    bearing: 0,
  });
  
  //ZOOM CONTROL
  var zoomControl = L.control.zoom({ position: 'topleft' }).addTo(map)
  
  //SIDEBAR
  // var sidebar = L.control.sidebar('sidebar').addTo(map);
  
  //BASE MAP
  var osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
  }).addTo(map);
  var Esri_WorldImagery = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
  });
  
  //ESCALA
  L.control.scale({ position: 'bottomleft' }).addTo(map);
  
  //MINIMAPA
  var osm2 = new L.TileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { minZoom: 0, maxZoom: 13 });
  var miniMap = new L.Control.MiniMap(osm2, { position: 'bottomleft' }).addTo(map);
  
  
  //CAPAS
  var dptos = L.geoJSON(departamentos, {
    style: dptoStyle,
    filter: function filtro(feature) {
      if (feature.properties.departa === 'AZUL') {
        return true
      }
      else { return false }
    },
    onEachFeature: popup,
  }).addTo(map);
  var cebada = L.geoJSON(cultivosFina, {
    style: cultivosStyle,
    filter: function filtro(feature) {
      if (feature.properties.Cultivo === 'Cebada' && feature.properties.Dpto === 'Azul') {
        return true
      }
      else { return false }
    },
    onEachFeature: popup,
  });
  var trigo = L.geoJSON(cultivosFina, {
    style: cultivosStyle,
    filter: function filtro(feature) {
      if (feature.properties.Cultivo === 'Trigo' && feature.properties.Dpto === 'Azul') {
        return true
      }
      else { return false }
    },
    onEachFeature: popup,
  });
  var girasol = L.geoJSON(cultivosGruesa, {
    style: cultivosStyle,
    filter: function filtro(feature) {
      if (feature.properties.Cultivo === 'Girasol' && feature.properties.Dpto === 'Azul') {
        return true
      }
      else { return false }
    },
    onEachFeature: popup,
  });
  var maiz = L.geoJSON(cultivosGruesa, {
    style: cultivosStyle,
    filter: function filtro(feature) {
      if (feature.properties.Cultivo === 'Maíz' && feature.properties.Dpto === 'Azul') {
        return true
      }
      else { return false }
    },
    onEachFeature: popup,
  });
  var soja1ra = L.geoJSON(cultivosGruesa, {
    style: cultivosStyle,
    filter: function filtro(feature) {
      if (feature.properties.Cultivo === 'Soja 1ra.' && feature.properties.Dpto === 'Azul') {
        return true
      }
      else { return false }
    },
    onEachFeature: popup,
  });
  var soja2da = L.geoJSON(cultivosGruesa, {
    style: cultivosStyle,
    filter: function filtro(feature) {
      if (feature.properties.Cultivo === 'Soja 2da.' && feature.properties.Dpto === 'Azul') {
        return true
      }
      else { return false }
    },
    onEachFeature: popup,
  });
  
  //STYLE
  function dptoStyle() {
    return {
      fillColor: '#3388ff',
      fillOpacity: 0.2,
      color: 'black',
      weight: 2,
      opacity: 1,
      dashArray: '8',
    }
  };
  function cultivosStyle(feature, latlng) {
    if (feature.properties.Cultivo == 'Cebada') {
      return {
        fillColor: 'rgba(252, 252, 0)',
        fillOpacity: 0.5,
        color: 'black',
        weight: 1.2,
        opacity: 1,
      }
    }
    else if (feature.properties.Cultivo == 'Trigo') {
      return {
        fillColor: 'rgba(255, 195, 0)',
        fillOpacity: 0.5,
        color: 'black',
        weight: 1.2,
        opacity: 1,
      }
    }
    else if (feature.properties.Cultivo == 'Girasol') {
      return {
        fillColor: 'rgba(46, 247, 33)',
        fillOpacity: 0.5,
        color: 'black',
        weight: 1.2,
        opacity: 1,
      }
    }
    else if (feature.properties.Cultivo == 'Maíz') {
      return {
        fillColor: 'rgba(243, 16, 16)',
        fillOpacity: 0.5,
        color: 'black',
        weight: 1.2,
        opacity: 1,
      }
    }
    else if (feature.properties.Cultivo == 'Soja 1ra.') {
      return {
        fillColor: 'rgba(248, 88, 226)',
        fillOpacity: 0.5,
        color: 'black',
        weight: 1.2,
        opacity: 1,
      }
    }
    else if (feature.properties.Cultivo == 'Soja 2da.') {
      return {
        fillColor: 'rgba(33, 49, 247)',
        fillOpacity: 0.5,
        color: 'black',
        weight: 1.2,
        opacity: 1,
      }
    }
  
  };
  
  //POPUP--MOUSEOVER
  function popup(feature, layer) {
    { //POPUP
      layer.bindPopup('<hr>' + '<pre>' + JSON.stringify(feature.properties, null, ' ').replace(/[\{\}"]/g, '') + '</pre>' + '<hr>', { className: '' });
    }
  };
  
  //LAYER CONTROL
  var baseLayers = {
    "OpenStreetMap": osm,
    "Imágen Satelital": Esri_WorldImagery,
  };
  
  var layersControl = L.control.layers(null, { '<svg style="width:20px; height:10px;vertical-align: inherit; margin-right: 4px;"><rect width="20" height="10" style="fill:rgba(252, 252, 0);stroke-width:2.5;stroke:black"/></svg><span>Cebada</span>': cebada, '<svg style="width:20px; height:10px;vertical-align: inherit; margin-right: 4px;"><rect width="20" height="10" style="fill:rgba(255, 195, 0);stroke-width:2.5;stroke:black"/></svg><span>Trigo</span>': trigo, '<svg style="width:20px; height:10px;vertical-align: inherit; margin-right: 4px;"><rect width="20" height="10" style="fill:rgba(46, 247, 33);stroke-width:2.5;stroke:black"/></svg><span>Girasol</span>': girasol, '<svg style="width:20px; height:10px;vertical-align: inherit; margin-right: 4px;"><rect width="20" height="10" style="fill:rgba(243, 16, 16);stroke-width:2.5;stroke:black"/></svg><span>Maíz</span>': maiz, '<svg style="width:20px; height:10px;vertical-align: inherit; margin-right: 4px;"><rect width="20" height="10" style="fill:rgba(248, 88, 226);stroke-width:2.5;stroke:black"/></svg><span>Soja 1ra</span>': soja1ra, '<svg style="width:20px; height:10px;vertical-align: inherit; margin-right: 4px;"><rect width="20" height="10" style="fill:rgba(33, 49, 247);stroke-width:2.5;stroke:black"/></svg><span>Soja 2da</span>': soja2da, '<svg style="width:20px; height:10px;vertical-align: inherit; margin-right: 4px;"><rect width="20" height="10" style="fill:#3388ff;stroke-width:2.5;stroke:black"/></svg><span>Azul</span>': dptos }, { collapsed: false, position: 'topright' });
  layersControl.addTo(map);
  var layersControlBase = L.control.layers(baseLayers, null, { collapsed: true, position: 'topleft' });
  layersControlBase.addTo(map);
  
  //GRUPOS DE CAPAS
  /*
  const titleAzul = L.control.attribution({ prefix: '<span style="text-decoration: underline;margin-right:120px;font-size: larger;">AZUL</span>', position: 'topright' }).addTo(map);
  var layersControlAzul = L.control.layers(null, { '<span>Cebada</span>': cebadaAzul, '<span>Trigo</span>': trigoAzul, '<span>Parcelas Rurales</span>': parcelasAzul, '<span>Límite Departamento</span>': dptoAzul }, { collapsed: false, position: 'topright' });
  layersControlAzul.addTo(map);
  const titleTandil = L.control.attribution({ prefix: '<span style="text-decoration: underline;margin-right:110px;font-size: larger;">TANDIL</span>', position: 'topright', style:'background-color:red' }).addTo(map);
  var layersControlTandil = L.control.layers(null, { '<span>Cebada</span>': cebadaTandil, '<span>Trigo</span>': trigoTandil, '<span>Parcelas Rurales</span>': parcelasTandil, '<span>Límite Departamento</span>': dptoTandil }, { collapsed: false, position: 'topright' });
  layersControlTandil.addTo(map);
  var layersControlBase = L.control.layers(baseLayers, null, { collapsed: true, position: 'topleft' });
  layersControlBase.addTo(map);
  */
  
  //LEYENDA..
  var legend = L.control.Legend({
    title: 'Referencias',
    position: "topright",
    collapsed: true,
    legends: [{
      label: "Cebada",
      type: "rectangle",
      color: 'black',
      fillColor: '#FCFC00',
    },
    {
      label: "Trigo",
      type: "rectangle",
      color: 'black',
      fillColor: 'rgba(255, 195, 0, 0.7)',
    },
    {
      label: "Girasol",
      type: "rectangle",
      color: 'black',
      fillColor: 'rgba(46, 247, 33, 0.7)',
    },
    {
      label: "Maíz",
      type: "rectangle",
      color: 'black',
      fillColor: 'rgba(243, 16, 16, 0.7)',
    },
    {
      label: "Soja 1ra",
      type: "rectangle",
      color: 'black',
      fillColor: 'rgba(248, 88, 226, 0.7)',
    },
    {
      label: "Soja 2da",
      type: "rectangle",
      color: 'black',
      fillColor: 'rgba(33, 49, 247 , 0.7)',
    },
    {
      label: "Departamentos",
      type: "rectangle",
      color: 'black',
      fillColor: '#3388ff',
      fillOpacity: 0.2,
    }]
  })//.addTo(map);
  
  //MARCA DE AGUA
  var img = L.DomUtil.create('img');
  L.Control.Watermark = L.Control.extend({
    onAdd: function (map) {
  
      img.src = './img/logo.jpeg';
      img.style.width = '150px';
      img.style.opacity = '70%';
  
      return img;
    },
  
    onRemove: function (map) {
      // Nothing to do here
    }
  });
  
  L.control.watermark = function (opts) {
    return new L.Control.Watermark(opts);
  }
  
  L.control.attribution({ prefix: '<span style="font-size: smaller;">Credits: </span><a href="https://mapgeogis.com/" rel="author" target="_blank" style="font-size: smaller;">© MapGeoGIS</a>', position: 'bottomright' }).addTo(map);
  L.control.watermark({ position: 'bottomright' }).addTo(map);
  
  //BAR GROUP BUTTONS  
  //CAMPAÑA GRUESA 2022/23
  var controlBarGruesa = L.control.bar('barGruesa', {
    position: 'left',
    visible: false,
  });
  map.addControl(controlBarGruesa);
  controlBarGruesa.hide();
  controlBarGruesa.setContent('<div class=""><canvas id="grafico-cgAzul"></canvas><hr><canvas id="grafico-cgTandil" style="display:none"></canvas></div>');
  
  //CAMPAÑA FINA 2022/23
  var controlBarFina = L.control.bar('barFina', {
    position: 'left',
    visible: false,
  });
  map.addControl(controlBarFina);
  controlBarFina.hide();
  controlBarFina.setContent('<div class=""><canvas id="grafico-cfAzul"></canvas><hr><canvas id="grafico-cfTandil"  style="display:none"></canvas></div>');
  
  //Herramientas Toggle
  var btnGruesa = L.easyButton({
    states: [{
      stateName: 'Abrir',        // name the state
      //icon: '<img src="./img/chart.png">',// and define its properties
      icon: '<i class="fa fa-pie-chart" aria-hidden="true"> CAMPAÑA GRUESA 2019/20</i>',// and define its properties
      //title: 'Gráficos',      // like its title
      onClick: function (btn) {       // and its callback
        //window.open('https://forms.gle/zX1bi6cXG82pkY178')
        controlBarGruesa.toggle();
        btn.state('Cerrar');
        if (screen.width < 400) {
          img.style.display = 'none';
        }
      }
    },
    {
      stateName: 'Cerrar',        // name the state
      //icon: '<img src="./img/chart-active2.png">',// and define its properties
      icon: '<i class="fa fa-arrow-left" aria-hidden="true" style="color:green"> CAMPAÑA GRUESA 2019/20</i>',// and define its properties
      //title: 'Gráficos',      // like its title
      onClick: function (btn) {       // and its callback
        //window.open('https://forms.gle/zX1bi6cXG82pkY178')
        controlBarGruesa.toggle();
        btn.state('Abrir');
        if (screen.width < 400) {
          img.style.display = 'block';
        }
      }
    }],
    position: 'bottomleft',
    //className:'btnForm',
  }).addTo(map);
  
  var btnFina = L.easyButton({
    states: [{
      stateName: 'Abrir',        // name the state
      //icon: '<img src="./img/chart.png">',// and define its properties
      icon: '<i class="fa fa-pie-chart" aria-hidden="true"> CAMPAÑA FINA 2019/20</i>',// and define its properties
      //title: 'Gráficos',      // like its title
      onClick: function (btn) {       // and its callback
        //window.open('https://forms.gle/zX1bi6cXG82pkY178')
        controlBarFina.toggle();
        btn.state('Cerrar');
        if (screen.width < 400) {
          img.style.display = 'none';
        }
      }
    },
    {
      stateName: 'Cerrar',        // name the state
      //icon: '<img src="./img/chart-active2.png">',// and define its properties
      icon: '<i class="fa fa-arrow-left" aria-hidden="true" style="color:green"> CAMPAÑA FINA 2019/20</i>',// and define its properties
      //title: 'Gráficos',      // like its title
      onClick: function (btn) {       // and its callback
        //window.open('https://forms.gle/zX1bi6cXG82pkY178')
        controlBarFina.toggle();
        btn.state('Abrir');
        if (screen.width < 400) {
          img.style.display = 'block';
        }
      }
    }],
    position: 'bottomleft',
    //className:'btnForm',
  }).addTo(map);
  
  //GRAFICOS
  const footer1 = (tooltipItems) => {
    let has = '';
  
    tooltipItems.forEach(function (tooltipItem) {
      if (tooltipItem.parsed === 58) {
        has = '37.784';
      }
      else if (tooltipItem.parsed === 42) {
        has = '27.364';
      }
    });
    return has + ' Hectáreas';
  };
  
  let canvaCFAzul = document.getElementById('grafico-cfAzul').getContext('2d')
  chartCFAzul = new Chart(canvaCFAzul, {
    type: 'pie',
    data: {
      labels: ['Cebada', 'Trigo'],
      datasets: [{
        data: [42, 58],
        backgroundColor: ['rgba(252, 252, 0, 0.7)', 'rgba(255, 195, 0, 0.7)'],
        hoverOffset: 12,
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          text: 'AZUL'
        },
        tooltip: {
          enabled: true,
          callbacks: {
            footer: footer1,
          }
        },
        datalabels: {
          color: 'black',
          font: {
            size: 14,
          },
          formatter: (value) => {
            return `${value}%`
          }
        }
      }
    },
    plugins: [ChartDataLabels],
  });
  
  const footer3 = (tooltipItems) => {
    let has = '';
  
    tooltipItems.forEach(function (tooltipItem) {
      if (tooltipItem.parsed === 18) {
        has = '28.703';
      }
      else if (tooltipItem.parsed === 23) {
        has = '36.973';
      }
      else if (tooltipItem.parsed === 35) {
        has = '55.546';
      }
      else if (tooltipItem.parsed === 24) {
        has = '38.529';
      }
    });
    return has + ' Hectáreas';
  };
  
  let canvaCGAzul = document.getElementById('grafico-cgAzul').getContext('2d')
  chartCGAzul = new Chart(canvaCGAzul, {
    type: 'pie',
    data: {
      labels: ['Girasol', 'Maíz', 'Soja 1ra', 'Soja 2da'],
      datasets: [{
        data: [18, 23, 35, 24],
        backgroundColor: ['rgba(46, 247, 33, 0.7)', 'rgba(243, 16, 16, 0.7)', 'rgba(248, 88, 226, 0.7)', 'rgba(33, 49, 247 , 0.7)'],
        hoverOffset: 12,
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          text: 'AZUL'
        },
        tooltip: {
          enabled: true,
          callbacks: {
            footer: footer3,
          }
        },
        datalabels: {
          color: 'black',
          font: {
            size: 14,
          },
          formatter: (value) => {
            return `${value}%`
          }
        }
      }
    },
    plugins: [ChartDataLabels],
  });
  
  const footer2 = (tooltipItems) => {
    let has = '';
  
    tooltipItems.forEach(function (tooltipItem) {
      if (tooltipItem.parsed === 40) {
        has = '43.497';
      }
      else if (tooltipItem.parsed === 60) {
        has = '65.219';
      }
    });
    return has + ' Hectáreas';
  };
  let canvaCFTandil = document.getElementById('grafico-cfTandil').getContext('2d')
  chartCFTandil = new Chart(canvaCFTandil, {
    type: 'pie',
    data: {
      labels: ['Cebada', 'Trigo'],
      datasets: [{
        data: [60, 40],
        backgroundColor: ['rgba(252, 252, 0, 0.7)', 'rgba(255, 195, 0, 0.7)'],
        hoverOffset: 12,
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          text: 'TANDIL'
        },
        tooltip: {
          enabled: true,
          callbacks: {
            footer: footer2,
          }
        },
        datalabels: {
          color: 'black',
          font: {
            size: 14,
          },
          formatter: (value) => {
            return `${value}%`
          }
        }
      }
    },
    plugins: [ChartDataLabels],
  });
  
  const footer4 = (tooltipItems) => {
    let has = '';
  
    tooltipItems.forEach(function (tooltipItem) {
      if (tooltipItem.parsed === 23) {
        has = '64.044';
      }
      else if (tooltipItem.parsed === 21) {
        has = '57.109';
      }
      else if (tooltipItem.parsed === 26) {
        has = '72.794';
      }
      else if (tooltipItem.parsed === 30) {
        has = '83.224';
      }
    });
    return has + ' Hectáreas';
  };
  
  let canvaCGTandil = document.getElementById('grafico-cgTandil').getContext('2d')
  chartCGTandil = new Chart(canvaCGTandil, {
    type: 'pie',
    data: {
      labels: ['Girasol', 'Maíz', 'Soja 1ra', 'Soja 2da'],
      datasets: [{
        data: [23, 21, 26, 30],
        backgroundColor: ['rgba(46, 247, 33, 0.7)', 'rgba(243, 16, 16, 0.7)', 'rgba(248, 88, 226, 0.7)', 'rgba(33, 49, 247 , 0.7)'],
        hoverOffset: 12,
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          text: 'TANDIL'
        },
        tooltip: {
          enabled: true,
          callbacks: {
            footer: footer4,
          }
        },
        datalabels: {
          color: 'black',
          font: {
            size: 14,
          },
          formatter: (value) => {
            return `${value}%`
          }
        }
      }
    },
    plugins: [ChartDataLabels],
  });
  