<template>
  <q-page class="flex flex-center column">
    <div v-if="!scanning">
      <p class="text-h4">Generating QR-Code</p>
      <canvas id="canvas"></canvas>
      <q-input
        v-model="myQRString"
        filled
        type="textarea"
        style="width: 660px"
      />
      <q-page-sticky position="bottom-right" :offset="[18,80]">
        <q-btn @click="generateCode" fab icon="draw" color="blue" />
      </q-page-sticky>
    </div>
    <div v-else>
      <StreamBarcodeReader
          @decode="onDecode"
      ></StreamBarcodeReader>
    </div>
    <q-page-sticky position="bottom-right" :offset="[18,18]">
      <q-btn @click="toggleScanning" fab icon="camera_alt" color="blue" />
    </q-page-sticky>
  </q-page>
</template>

<script>
import { StreamBarcodeReader } from 'vue-barcode-reader'
import QRCode from 'qrcode'

export default {
  name: 'QR Code',
  components: {
    StreamBarcodeReader
  },
  mounted () {
    /**
     * devtools for mobile (https://github.com/liriliri/eruda)
     * only for developement, remove asap
     * maybe remove or change the condition if your not on Android
     */
    if (navigator.userAgent.includes('Android')) {
      const script = document.createElement('script')
      script.src = '//cdn.jsdelivr.net/npm/eruda'
      document.body.appendChild(script)
      script.onload = function () {
      // eslint-disable-next-line no-undef
        eruda.init()
      }
    }
    /**
     * devtools for mobile
     */
    this.generateCode()
  },
  methods: {
    generateCode () {
      const canvas = document.getElementById('canvas')
      const notify = this.$q.notify
      QRCode.toCanvas(canvas, this.myQRString, function (error) {
        if (error) console.error(error)
        notify({ type: 'positive', timeout: 2000, progress: true, closeBtn: true, message: 'Success, QR was generated.' })
      })
    },
    onDecode (text) {
      this.myQRString = text
      this.$q.notify({ type: 'positive', timeout: 2000, message: 'Code wurde gescannt.' })
      this.toggleScanning()
      this.generateCode()
    },
    toggleScanning () {
      if (!navigator.mediaDevices?.enumerateDevices) {
        console.log('enumerateDevices() not supported.')
      }
      navigator.mediaDevices.enumerateDevices()
        .then((devices) => {
          let hasCam = false
          devices.forEach((device) => { if (device.kind === 'videoinput') hasCam = true })

          if (hasCam) {
            this.scanning = !this.scanning
            this.$q.notify({ type: 'positive', message: 'Scanner aktiv.' })
          } else {
            this.$q.notify({
              type: 'negative',
              timeout: 3000,
              message: 'Keine Kammera gefunden.',
              actions: [
                { icon: 'close', color: 'green', 'text-color': 'secondary', size: 'lg', round: true, dense: true, handler: () => { /* ... */ } }
              ]
            })
          }
        })
        .catch((err) => {
          console.error(`${err.name}: ${err.message}`)
        })
    }
  },
  data () {
    return {
      scanning: false,
      // the prefix 'otpauth://totp/SecretKey?secret=' is needed for TOTP-TokenQR (2FA)
      myQRString: 'otpauth://totp/SecretKey?secret=OE3FIMKTIU2WO22TGFXCYTKMKNMGEMSVKFYCSTTBF5DSS5LGOVKA'
    }
  }
}
</script>

<style scoped>

</style>
