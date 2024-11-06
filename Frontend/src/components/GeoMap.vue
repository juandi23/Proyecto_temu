<template>
  <div id="map-container">
    <div id="map" ref="map"></div>
  </div>
</template>

<script>
import L from 'leaflet';

export default {
  name: 'GeoMap',
  data() {
    return {
      map: null,
      userLocation: null,
    };
  },
  mounted() {
    // Crear el mapa con un centro inicial provisional
    this.map = L.map(this.$refs.map).setView([0, 0], 2);

    // Agregar la capa de fondo de MapBox utilizando tu clave pública
    L.tileLayer(`https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoianVhbmRpOCIsImEiOiJjbTM0aGR4Y3AxdXVrMnFwejBpbXZxN2MzIn0.ycx8bliyx7KeTV16c5u1Ww`, {
      maxZoom: 18,
      tileSize: 512,
      zoomOffset: -1,
      attribution: '© <a href="https://www.mapbox.com/about/maps/">Mapbox</a> © <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(this.map);

    // Obtiene la ubicación del usuario con GeoJS
    this.getUserLocation();
  },
  methods: {
    getUserLocation() {
      fetch('https://get.geojs.io/v1/ip/geo.json')
        .then(response => response.json())
        .then(data => {
          this.userLocation = {
            latitude: parseFloat(data.latitude),
            longitude: parseFloat(data.longitude),
            city: data.city,
            country: data.country,
          };

          // Centra el mapa en la ubicación del usuario con un zoom alto para que solo se enfoque en esa área
          this.map.setView([this.userLocation.latitude, this.userLocation.longitude], 13); // Zoom ajustado para ver la ubicación de cerca

          // Agrega un marcador en la ubicación del usuario
          L.marker([this.userLocation.latitude, this.userLocation.longitude])
            .addTo(this.map)
            .bindPopup(`<b>${this.userLocation.city}, ${this.userLocation.country}</b>`)
            .openPopup();
        })
        .catch(error => console.error("Error al obtener la geolocalización:", error));
    }
  }
};
</script>

<style scoped>
#map-container {
  width: 300px;
  height: 150px;
  margin: 0 auto; /* Centrado */
  margin-top: 20px; /* Ajusta el espacio superior */
  overflow: hidden;
  border-radius: 8px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
}


#map {
  width: 100%;
  height: 100%;
}
</style>
