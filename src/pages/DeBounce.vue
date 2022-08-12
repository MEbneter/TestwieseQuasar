<template>
  <q-page class="flex flex-center column">
    <p class="text-h4">Debounce and Throttle</p>
    <div>
      <q-btn
        class="q-mr-sm"
        color="white"
        text-color="black"
        label="Debounce"
        @click="derBounce"
      />
      <q-btn
        class="q-mr-sm"
        color="white"
        text-color="black"
        label="Throttle"
        @click="derThrottle"
      />
    </div>
    <p class="q-mb-sm q-pa-sm" style="width: 300px"><b>Debouncing</b> enforces that a function wont be called again until a certain amount of time has passed without it being called.(0.5sec)</p>
    <p class="q-mb-sm q-pa-sm" style="width: 300px"><b>Throttling</b> enforces a maximum number of times a function can be called over time.(2sec)</p>
  </q-page>
</template>
<script>
export default {
  name: 'DeBounce',
  components: { },
  methods: {
    debounce (func, timeout = 500) {
      let timer
      return (...args) => {
        clearTimeout(timer)
        timer = setTimeout(() => { func.apply(this, args) }, timeout)
      }
    },
    doThrottle (func, timeout = 2000) {
      let allowThrottle = true
      // return (func, timeout) => {  // <<-- Funktioniert au
      return (...args) => {
        if (allowThrottle) {
          allowThrottle = false
          func.apply(this, args)
          setTimeout(() => {
            allowThrottle = true
          }, timeout)
        }
      }
    },
    doNotify (inputText = 'blub') {
      this.$q.notify(inputText)
    }
  },
  data () {
    return {
      derBounce: this.debounce(() => this.doNotify('deBounce')/* ,3000 */),
      derThrottle: this.doThrottle(() => this.doNotify('deThrottle'))
    }
  }
}
</script>

<style scoped>

</style>
