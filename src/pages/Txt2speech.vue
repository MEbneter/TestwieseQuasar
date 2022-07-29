<template>
  <q-page class="flex flex-center column">
    <p class="text-h4">Text 2 speech</p>
    <div class="q-pa-md" style="width: 80%">
      <q-input
        v-model="inputText"
        filled
        autogrow
      />
      <q-select v-model="voice" :options="voicesArr" label="Voices" @click="getVoices"/>
    </div>
    <div class="q-mt-sm">
      Volume:
      <q-slider
        dense
        v-model="audioSetting.volume"
        markers
        snap
        style="width: 200px"
        label
        :min="0"
        :max="5"
        :step="0.5"
      />
    </div>
    <div class="q-mt-sm">
      Pitch:    
      <q-slider
        dense
        v-model="audioSetting.pitch"
        markers
        snap
        style="width: 200px"
        label
        :min="0"
        :max="5"
        :step="0.5"
      />
    </div>
    <div class="q-mt-sm">
      Rate: 
      <q-slider
        dense
        v-model="audioSetting.rate"
        markers
        snap
        style="width: 200px"
        label
        :min="0"
        :max="5"
        :step="0.5"
      />
    </div>    

    <q-btn push color="white" text-color="primary" class="q-mt-sm" label="Say something" @click="saySomething"/>
  </q-page>
</template>

<script>
import {  } from 'vue'
export default {
  components: { },
  name: 'Text2Speech',

  created () {
    this.synth = window.speechSynthesis
    this.voices = this.synth.getVoices()
    setTimeout(() => {
      this.getVoices()
    }, 200);
  },
  mounted () {
    setTimeout(() => {
      this.getVoices()
      this.voice = this.voicesArr[0]
    }, 500);
  },

  computed: {
    voicesArr () { return this.voices.map((el) => el.name) },
    chosenVoice () { return this.voices.filter((el)=> el.name === this.voice )}
  },

  methods: {
    getVoices (){
      this.synth = window.speechSynthesis
      this.voices = this.synth.getVoices()
    },
    saySomething (e) {
      e.preventDefault();
      const utterThis = new SpeechSynthesisUtterance(this.inputText);

      console.log(this.chosenVoice[0])
      utterThis.pitch = this.audioSetting.pitch
      utterThis.volume = this.audioSetting.volume
      utterThis.rate = this.audioSetting.rate
      utterThis.voice = this.chosenVoice[0]
      this.synth.speak(utterThis);
    }
  },

  data () {
    return {
      voice: null,
      inputText: 'Der Kaplan klebt klappbare Pappplakate.',
      voices: () => window.speechSynthesis.getVoices().map((el) => el.name),
      synth: null,
      audioSetting: {
        volume: 1,
        pitch: 1,
        rate: 1
      }
    }
  }
}
</script>

<style scoped>

</style>