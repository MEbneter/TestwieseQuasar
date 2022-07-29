<template>
  <q-page class="flex flex-center column">
    <p class="text-h4">Custom Evente ($emit)</p>
    <p style="text-align:center">Custom-Event - In vue usually used to get data from child to parent-component (color-chosen in this case) <br>
    for the opposite direktion we can use props (colors in this case)</p>
    <ColorPicker @color-chosen="updateBackgroundColor" :colors="colors"/>
    <div :style="{ background: backgroundColor }" id="colorContainer" />
    <a href="https://developer.mozilla.org/en-US/docs/Web/Events/Creating_and_triggering_events" target="_blank">MDN-Creating and triggering events (classical js)</a>
    <a href="https://v2.vuejs.org/v2/guide/components-props.html" target="_blank">VUE.js guide props</a>
    <a href="https://v2.vuejs.org/v2/guide/components-custom-events.html" target="_blank">Vue.js guide custom events</a>
  </q-page>
</template>
<script>
  import ColorPicker from './ColorPicker';
  export default {
    components: { ColorPicker },
    methods: {
      updateBackgroundColor(color) {
        this.backgroundColor = color;
      }
    },
    data() {
      return {
        backgroundColor: 'wheat',
        colors: [
          'bisque',
          'darkkhaki',
          'thistle',
          'wheat'
        ]
      }
    }
  }
</script>

<style scoped>
#colorContainer {
  width: 300px;
  height: 300px;
  border: 2px solid #aaaaaa;
  border-radius: 10px;
  margin:4px
}
</style>