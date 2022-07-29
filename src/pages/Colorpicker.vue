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
  props: {
    colors:{
      type: Array,
      default: ()=>{}
    }
  },

  methods: {
    chosenColor(color) {
      this.$emit("color-chosen", color);
    }
  }
};
</script>