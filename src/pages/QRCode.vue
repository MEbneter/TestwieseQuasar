<template>
  <q-page class="flex flex-center column">
    <p class="text-h4">Generating QR-Code</p>
    <canvas id="canvas"></canvas>
    <q-input
      v-model="myQRString"
      filled
      type="textarea"
      style="width: 80%"
    />
    <q-btn push color="white" text-color="primary" label="Generate code" @click="doIt"/>
  </q-page>
</template>

<script>
import QRCode from 'qrcode'
// import { computed, ref } from 'vue'
export default {
  name: 'QR Code',
  mounted () {
    this.doIt()
  },
  methods: {
    doIt () {
      const canvas = document.getElementById('canvas')
      QRCode.toCanvas(canvas, this.myQRString, function (error) {
        if (error) console.error(error)
        console.log('success!')
      })
    }
  },
  data () {
    return {
      myQRString: 'Hier kann dein QR-String stehen.'
    }
  }
}
</script>

<style scoped>

</style>
