var map = L.map('map').setView([-24.5343, -51.5528], 7); // Centro do Paraná

// Camadas base
var osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

var googleSat = L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',{
    maxZoom: 20,
    subdomains:['mt0','mt1','mt2','mt3']
});

// Camadas WMS
var propriedades = L.tileLayer.wms('http://localhost:8080/geoserver/ne/wms?service=WMS&version=1.1.0&request=GetMap&layers=ne%3Apropriedades_rurais_1&bbox=-49.244842529296875%2C-25.038708482931646%2C-48.90301888784693%2C-24.83534927313428&width=768&height=456&srs=EPSG%3A4674&styles=&format=application/openlayers', {
  layers: 'ne:propriedades_rurais_1',
  format: 'image/png',
  transparent: true,
  attribution: 'Camada de Propriedades'
});

var desmatamento = L.tileLayer.wms('https://terrabrasilis.dpi.inpe.br/geoserver/prodes-mata-atlantica-nb/yearly_deforestation/ows', {
  layers: 'yearly_deforestation',
  format: 'image/png',
  transparent: true,http://localhost:8080/geoserver/ne/wms
  attribution: 'Yearly deforestation biome since 2004'
});

// Controle de camadashttp://localhost:8080/geoserver/ne/wms
var baseMaps = {
  "OpenStreetMap": osm,
  "Google Satélite": googleSat
};

var overlayMaps = {
  "Propriedades": propriedades,
  "Desmatamento": desmatamento
};

// ... (código anterior) ...

function adicionarMarcador() {
    var lat = parseFloat(document.getElementById("latitude").value);
    var lng = parseFloat(document.getElementById("longitude").value);
  
    if (isNaN(lat) || isNaN(lng)) {
      alert("Coordenadas inválidas!");
      return;
    }
  
    var marker = L.marker([lat, lng]).addTo(map);
    map.setView([lat, lng], 15); // Centraliza o mapa no marcador
  
    // Opcional: adicionar um popup ao marcador
    marker.bindPopup("<b>Coordenadas:</b><br>" + lat + ", " + lng).openPopup();
  }
  
  // ... (restante do código) ...

L.control.layers(baseMaps, overlayMaps).addTo(map);
