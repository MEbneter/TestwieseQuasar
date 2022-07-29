<template>
  <q-page class="flex flex-center column">
    <q-btn color="white" text-color="black" label="Show my location" @click="geoFindMe"/><br/>
    <p class="text-caption" id="status"></p>
    <div id="showCoord">
      <div>Latitude: </div><div class="float-right">{{ lat }}</div>
      <div>Longitude:</div><div class="float-right"> {{ long }}</div>
    </div>
    <q-btn class="q-my-sm" color="white" text-color="black" id="openStreet" label="Open-street map" @click="openMap"/>
    <q-btn class="q-my-sm" color="white" text-color="black" id="googleMap" label="Google maps" @click="openMap"/>
  </q-page>
</template>

<script>
import {  } from 'vue'
export default {
  components: { },
  name: 'Geolocation',

  created () {

  },

  methods: {
    openMap(e) {
      const urlBase = {
        openStreet: 'https://www.openstreetmap.org/#map=18/' + this.lat + '/' + this.long,
        googleMap:  'https://www.google.com/maps/search/?api=1&query=' + this.lat + ',' + this.long
      }
      const targetURL = urlBase[e.target.parentElement.parentElement.id]
      window.open(targetURL, '_blank').focus();     
    },
    geoFindMe() {
      const status = document.querySelector('#status');
      const that = this
      function success(position) {
        that.long = position.coords.longitude;
        that.lat  = position.coords.latitude;

        status.textContent = '';
      }

      function error() {
        status.textContent = 'Unable to retrieve your location';
      }

      if(!navigator.geolocation) {
        status.textContent = 'Geolocation is not supported by your browser';
      } else {
        status.textContent = 'Locating…';
        navigator.geolocation.getCurrentPosition(success, error);
      }
    }
  },

  data () {
    return {
      lat: '',
      long: ''
    }
  }
}
</script>

<style scoped>
#showCoord {
  display: grid;
  grid-template-columns: 1fr 1fr;
  margin-bottom: 1rem;
  min-width: 200px;
}
</style>