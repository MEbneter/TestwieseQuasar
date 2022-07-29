<template>
  <q-page class="flex flex-center column q-pa-xl">
    <p class="text-h4">Console magic with JS</p>
      <!-- default values for parameters only work with brackets in VUE-Template -->

      <div class="theme-container q-my-sm">
        <q-btn push color="primary" class="q-ma-xs" label="Write to console" @click="fanzyConsole()" />
        <q-input clearable class="q-mb-xs" color="blue-12" v-model="consoleText" style="width: 98%"/>
        
        <div class="theme-content q-mb-xs q-mt-sm">
          <div class="vertical-middle q-pb-sm q-px-sm" style="position:relative; top:-0.6em; left:1em; background-color: #FFF; display:inline">General</div>
          <div class="flex" style="flex-direction: row; align-items: center; justify-content: center;">
            <q-input
              dense
              v-model="backgroundColor"
              :rules="['anyColor']"
              hint="Select your background color"
              class="my-input"
            >
              <template v-slot:append>
                <q-icon name="colorize" class="cursor-pointer">
                  <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                    <q-color v-model="backgroundColor" />
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
            <div class="q-pa-xs">
              <q-input
                dense
                v-model.number="consolePadding"
                type="number"
                hint="Select your padding in pixel"
              />
            </div>
          </div>
        </div>

        <div class="theme-content q-mb-xs q-mt-sm">
          <div class="vertical-middle q-pb-sm q-px-sm" style="position:relative; top:-0.6em; left:1em; background-color: #FFF; display:inline">Border</div>
          <div class="flex" style="flex-direction: row; align-items: center; justify-content: center;">
            <q-input
              dense
              v-model="borderColor"
              :rules="['anyColor']"
              hint="Select your border color"
              class="my-input"
            >
              <template v-slot:append>
                <q-icon name="colorize" class="cursor-pointer">
                  <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                    <q-color v-model="borderColor" />
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
            <div class="q-pa-xs">
              <q-input
                dense
                v-model.number="borderSize"
                type="number"
                hint="Select your border size in pixel"
              />
            </div>
          </div>
        </div>

        <div class="theme-content q-mb-xs q-mt-sm">
          <div class="vertical-middle q-pb-sm q-px-sm" style="position:relative; top:-0.6em; left:1em; background-color: #FFF; display:inline">Font</div>
          <div class="flex" style="flex-direction: row; align-items: center; justify-content: center;">
            <q-input
              dense
              v-model="fontColor"
              :rules="['anyColor']"
              hint="Select your font color"
              class="my-input"
            >
              <template v-slot:append>
                <q-icon name="colorize" class="cursor-pointer">
                  <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                    <q-color v-model="fontColor" />
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
            <div class="q-pa-xs">
              <q-input
                dense
                v-model.number="fontSize"
                type="number"
                hint="Select your font size in pixel"
              />
            </div>
          </div>
        </div>
      </div>
      <q-btn push color="primary" class="q-ma-xs q-mt-md" label="with ansi" @click="ansiConsole" />
  </q-page>
</template>

<script>
export default {
  name: 'Console',

  mounted () {

  },
  beforeUnmount () {

  },
  methods: {
    fanzyConsole () {
      const style = 'background-color: ' + this.backgroundColor + '; color: ' + this.fontColor + '; border: ' + this.borderSize + 'px solid ' 
                    + this.borderColor + '; font-size: ' + this.fontSize + 'px; border-radius: 4px; padding:'+ this.consolePadding + 'px'
      console.log("%c" + this.consoleText, style); 
    },
    ansiConsole () {
      /**
       * https://developer.chrome.com/docs/devtools/console/format-style/
       * 
       * '\x1B[41;93;4mHello'
       * ansci start --> \x1B[
       * background  --> 41;
       * fontcolor   --> 93;
       * fontstyle   --> 4m
       */
      const hello = '\x1B[41;93;4mHello';
      const space = '\x1B[m ';
      const world = '\x1B[34;102;3mWorld';

      console.log(hello + space + world);
    }
  },

  data () {
    return {
      consoleText: 'your console text',
      backgroundColor: '#DDEEEE',
      borderColor: '#220000',
      fontColor: '#000000',
      fontSize: 10,
      borderSize: 2,
      consolePadding: 8
    }
  }
}
</script>

<style scoped>
  .theme-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 75%;
    min-height: 160px;
    border: 1px solid #BBBBBB;
    padding: 1em;
    padding-top: 0.5em;
    border-radius: 20px;
    overflow: hidden;
    min-width: 300px;
  }
  .theme-content {
    width: 96%;
    min-height: 120px;
    border: 1px solid #BBBBBB;
    padding: 1em;
    padding-top: 0px;
    border-radius: 20px;
  }
</style>
