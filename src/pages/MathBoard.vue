<template>
  <q-page class="flex flex-center column" v-if="currencyRates">
    <p class="text-h4">JS-Math</p>
    <p class="text-h6">Currency calculation</p>

      <q-input v-model="inputValue" type="number" label="Amount" style="width: 300px" />
      <q-select v-model="sCurr" :options="currOptions" label="Start Currency" style="width: 300px" />
      <q-select v-model="eCurr" :options="currOptions" label="End Currency" style="width: 300px" />
      <div class="flex">
        <q-input v-model="decPoints" type="number" min="0" max="10" step="1" label="Decimal Points" style="width: 145px" class="q-mr-xs" />
        <q-input v-model="roundTo" type="number" min="0" max="10" step="1" label="Round Value" style="width: 145px" class="q-mr-xs" />
      </div>
      <q-input v-model="result" label="Result" readonly style="width: 300px" />
  </q-page>
</template>

<script>
import { computed } from 'vue'
export default {
  components: { },
  name: 'MathBoard',

  created () {
    // api call to get the exchange rates
    fetch('https://api.exchangerate-api.com/v4/latest/CHF')
      .then(res => res.json())
      .then((res) => {
        this.currencyRates = res.rates
        this.currOptions = Object.entries(this.currencyRates).map((el) => el[0])
      })
  },

  methods: {
    changeCurrency () {
      const calcRate = this.currencyRates[this.eCurr] / this.currencyRates[this.sCurr]
      return this.round(calcRate * this.inputValue)
    },

    round (value = this.inputValue) {
      let factorDecimal = 1
      for (let index = 0; index < this.decPoints; index++) {
        factorDecimal *= 10
      }
      const result = Math.round(value * factorDecimal / this.roundTo) / factorDecimal * this.roundTo

      return result.toFixed(this.decPoints).toString()
    }
  },

  data () {
    return {
      decPoints: 2,
      roundTo: 5,
      result: computed(() => this.changeCurrency()),
      inputValue: 0,
      currOptions: null,
      sCurr: 'CHF',
      eCurr: 'CHF',
      currencyRates: null
    }
  }
}
</script>

<style scoped>

</style>
