// Inicializar el mapa con una vista central (setview) y un zoom (3)
var map = L.map('map').setView([-34.8439726,-58.4099678], 14);
//Agregar mapa base de IGN
var ign_clasico = L.tileLayer('https://wms.ign.gob.ar/geoserver/gwc/service/tms/1.0.0/capabaseargenmap@EPSG%3A3857@png/{z}/{x}/{-y}.png', {
    attribution: '<a href="http://leafletjs.com" title="A JS library for interactive maps">Leaflet</a> | <a href="http://www.ign.gob.ar/AreaServicios/Argenmap/IntroduccionV2" target="_blank">Instituto Geográfico Nacional</a> + <a href="http://www.osm.org/copyright" target="_blank">OpenStreetMap</a>',
    minZoom: 3,
    maxZoom: 18
   }).addTo(map);


var esri_sat = L.tileLayer('http://www.google.cn/maps/vt?lyrs=s@189&gl=cn&x={x}&y={y}&z={z}', {
    attribution: '<a href="http://leafletjs.com" title="A JS library for interactive maps">Leaflet</a> | <a href="https://www.google.com/maps" target="_blank">www.google.com/map</a>',
    minZoom: 3,
    maxZoom: 18
}); 

var google_trans = L.tileLayer('https://mt1.google.com/vt?lyrs=h@159000000,traffic|seconds_into_week:-1&style=3&x={x}&y={y}&z={z}', {
    attribution: '<a href="http://leafletjs.com" title="A JS library for interactive maps">Leaflet</a> | <a href="https://www.google.com/maps" target="_blank">www.google.com/map</a>',
    minZoom: 3,
    maxZoom: 18
}); 

//Estilo de estaciones de trenes

function createCustomIcon (feature, latlng) {
	let myIcon = L.icon({
	  iconUrl: 'https://cdn-icons-png.flaticon.com/512/1783/1783356.png',
	  iconSize:     [20, 20], // width and height of the image in pixels
	  shadowSize:   [35, 20], // width, height of optional shadow image
	  iconAnchor:   [12, 12], // point of the icon which will correspond to marker's location
	  shadowAnchor: [12, 6],  // anchor point of the shadow. should be offset
	  popupAnchor:  [0, 0] // point from which the popup should open relative to the iconAnchor
	})
	return L.marker(latlng, { icon: myIcon })
  }
  
  // create an options object that specifies which function will called on each feature
  let myLayerOptions = {
	pointToLayer: createCustomIcon
  }

  var stylebike = {
	color: "#1C2833",
	weight: 3,
	opacity: 0.6,
	dashArray: '7, 7, 7'
	 };


  var stylebus = {
	color: "#5153FF",
	weight: 3,
	opacity: 0.6,
	dashArray: '7, 7, 7'
	  };

// ZOOM A MARCADOR
var xxy = function(e){
    var coord = e.latlng.toString().split(',');
    var lat = coord[0].split('(');
    var lng = coord[1].split(')');
    console.log("You clicked the map at latitude: " + lat[1] + " and longitude:" + lng[0]);
    map.flyTo([lat[1], lng[0]], 16, {animate: true,duration: 2 });}


//Datos recorridos en bicicleta

var recorrido1 = L.geoJson(recorrido1, stylebike)
var recorrido2 = L.geoJson(recorrido2, stylebike)


//Datos colectivos
var cole1 = L.geoJson(cole1 ,stylebus)
var cole2 = L.geoJson(cole2,stylebus)
var cole3 = L.geoJson(cole3,stylebus)
var cole4 = L.geoJson(cole4,stylebus)


  
// create the GeoJSON layer
 var estaciones= L.geoJSON(estaciones, myLayerOptions)





var baseMaps = [
			                { 
								groupName : "Mapas Base",
								expanded : true,
								layers    : {
									"Mapa Base": ign_clasico,
									"Satelital": esri_sat,
									"Transito": google_trans
						
								}
					        },

                        ]

var overlays = [
							 {
								groupName : "Transporte publico",
								expanded : true,
								
								layers    : { 
									"Recorrido 506 - Ramal 7": cole1,
									"Recorrido 501 - Ramal 1": cole2,
									"Recorrido 501 - Los Altos": cole3,
									"Recorrido 510":cole4,
									"Linea Roca": estaciones
									
			
								}	
                             },{
								groupName : "Instituciones publicas",
								expanded : true,
								layers    : { 
									
								}	
                             },
							 
                             {
								groupName : "servicios bancarios",
								expanded : true,
								layers    : { 
									
								}	
                             },
							 {
								groupName : "Recorridos en Bicicleta",
								expanded : true,
								layers    : { 
									"Circuito N°1":recorrido1,
									"Circuito N°2": recorrido2
									
									
								}	
                             },
                             
                             ]

// configuracion de los estilos de capas


            var options = {
				container_width 	: "300px",
				group_maxHeight     : "80px",
				//container_maxHeight : "350px", 
				exclusive       	: true,
				collapsed : false, 
				position: 'topright'
			};
		
		    var control = L.Control.styledLayerControl(baseMaps, overlays, options);
			map.addControl(control);

			

			