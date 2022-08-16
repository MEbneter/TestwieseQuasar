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
    <q-btn push class="q-ma-xs" color="white" text-color="primary" label="Generate code" @click="generateCode"/>
  </q-page>
</template>

<script>
import QRCode from 'qrcode'
export default {
  name: 'QR Code',
  mounted () {
    this.generateCode()
  },
  methods: {
    generateCode () {
      const canvas = document.getElementById('canvas')
      QRCode.toCanvas(canvas, this.myQRString, function (error) {
        if (error) console.error(error)
        console.info('Success, QR was generated.')
      })
    }
  },
  data () {
    return {
      // the prefix 'otpauth://totp/SecretKey?secret=' is needed for TOTP-TokenQR (2FA)
      myQRString: 'otpauth://totp/SecretKey?secret=OE3FIMKTIU2WO22TGFXCYTKMKNMGEMSVKFYCSTTBF5DSS5LGOVKA'
    }
  }
}
</script>

<style scoped>

</style>
