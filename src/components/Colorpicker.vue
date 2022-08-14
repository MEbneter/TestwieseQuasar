<template>
  <div padding>
    <q-btn
    class="q-mr-sm q-mb-sm"
    dense
    v-for="color in colors"
    :key="color"
    color="white"
    @click="chosenColor(color)"
    text-color="black"
    :label="color" />
  </div>
</template>
<script>
export default {
  name: 'ColorPicker',
  props: {
    colors: {
      type: Array,
      default: () => {}
    }
  },

  methods: {
    chosenColor (color) {
      this.$emit('color-chosen', color)
    }
  }
}
</script>
