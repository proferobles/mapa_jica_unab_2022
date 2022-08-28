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


//icono publico
var publico = L.icon
	({
	iconUrl: 'https://cdn-icons-png.flaticon.com/512/3448/3448390.png',
	shadowUrl: '',
	iconSize: [30, 30], //recomendado
	iconAnchor: [5, 10], //la itad e igual
    popupAnchor: [0, -10],
    //shadowSize: [50, 50] // igual a icono
	});
    
    var awesomeIcons = ['font', 'cloud-download', 'medkit', 'github-alt', 'coffee', 'twitter', 'shopping-cart', 'tags', 'star'];

//icono bancos
var bank = L.icon
	({
	iconUrl: 'https://cdn-icons-png.flaticon.com/512/3448/3448477.png',
	shadowUrl: '',
	iconSize: [30, 30], //recomendado
	iconAnchor: [5, 10], //la itad e igual
    popupAnchor: [0, -10],
    //shadowSize: [50, 50] // igual a icono
	});


//icono empresas
var empresa = L.icon
({
iconUrl: 'https://cdn-icons-png.flaticon.com/512/7142/7142238.png',
shadowUrl: '',
iconSize: [25, 25], //recomendado
iconAnchor: [5, 10], //la itad e igual
popupAnchor: [0, -10],
//shadowSize: [50, 50] // igual a icono
});
    
    
      
      
//stilo del area 
    var myStyle = {
    "color": "#fcc2e9",
    "weight": 10,
    "opacity": 0.5 };

//stilo del area 
var myStyle2 = {
    "color": "#2EACF9",
    "weight": 4,
    "opacity": 1 };

 
// ZOOM A MARCADOR
var xxy = function(e){
    var coord = e.latlng.toString().split(',');
    var lat = coord[0].split('(');
    var lng = coord[1].split(')');
    console.log("You clicked the map at latitude: " + lat[1] + " and longitude:" + lng[0]);
    map.flyTo([lat[1], lng[0]], 16, {animate: true,duration: 2 });}


//marcadores
var area = L.geoJson(area, {style: myStyle})
var adelrey = L.geoJson(adelrey, {style: myStyle2}).bindPopup("<strong>Arroyo del Rey<strong>"+ "<br/>" + "<img src= 'arroyo.jpg'/>" + "<br/>" + "El arroyo del Rey es un curso "+ "<br/>" +"de agua que nace en las cercanías "+ "<br/>" +" del Barrio Rayo de Sol"+ "<br/>" +"(Longchamps),"+ "<br/>" +" provincia de Buenos Aires, para "+ "<br/>" +"desembocar en el Riachuelo,"+ "<br/>" +" con una trayectoria de 18 kilómetros").on('click', xxy);
var cefip = L.marker([-34.836746, -58.405327], {icon: publico}).bindPopup("Centro de Formacion Profesional e Innovacion Productiva" + "<br/>" + "<img src= 'cefip.jpg'/>").on('click',xxy);
var galicia = L.marker([-34.8342712,-58.4109098], {icon: bank},13).bindPopup("<strong>Banco Galicia</strong>" + "<br/>" + "Avenida Monteverde 3793" + "<br/>" + "Contacto: 8107773333" + "<br/>" + "<img src= 'galicia.jpg'/>" + "<A HREF='http://bancogalicia.com/'> Mas info... </A> " ).on('click', xxy);
var recorrido = L.geoJson(recorrido, {icon: publico})
var puntos = L.geoJson(puntos, {icon: publico})




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
								groupName : "informacion espacial",
								expanded : true,
								layers    : { 
									"Area SIPAB": area,
									"Cursos de agus" : adelrey,
			
								}	
                             },{
								groupName : "Instituciones publicas",
								expanded : true,
								layers    : { 
									"CEFIP" : cefip
								}	
                             },
							 
                             {
								groupName : "servicios bancarios",
								expanded : true,
								layers    : { 
									"Banco Galicia" : galicia
								}	
                             },
							 {
								groupName : "Recorridos en Bicicleta",
								expanded : true,
								layers    : { 
									"Circuito 3":recorrido,
									"Puntos de interes R3" : puntos, 
									
								}	
                             },
                             
                             ]

// configure StyledLayerControl options for the layer soybeans_sp


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

			var credctrl = L.controlCredits({
				image: "./designer.png",
				link: "https://www.instagram.com/profe.robles/",
				text: "Datos de desarrollo<br/>Rodrigo Robles"
			}).addTo(map);