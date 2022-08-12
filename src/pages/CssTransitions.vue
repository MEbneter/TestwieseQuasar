<template>
  <q-page class="flex flex-center column">
    <p class="text-h4">CSS-Transitions</p>
    <div class="theme-container q-my-sm">
      <div class="text-h6">Growing div that rotates</div>
      <div class="box"></div>
    </div>
    <div class="theme-container q-my-sm" ref="ballspace" @click="moveBall">
      <div class="text-h6">Ball that follows your mouse-click's</div>
      <div ref="foo" class="ball"></div>
    </div>
    <div class="theme-container q-my-sm">

      <div class="text-h6">Color ease conditional to your Mouse-xPos</div>
      <div
        @mousemove="onMousemove"
        :style="{ backgroundColor: `hsl(${xPos}, 80%, 50%)` }"
        class="movearea"
      >
        <p style="text-align:center">x: {{ xPos }}</p>
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'CssTransitions',
  mounted () {
    const ball = this.$refs.foo
    const container = this.$refs.ballspace
    const containerHalfHeight = 0 - container.offsetHeight / 2
    const containerHalfWidth = 0 - container.offsetWidth / 2
    ball.style.top = containerHalfHeight + 'px'
    ball.style.left = containerHalfWidth + 'px'
  },
  unmounted () {
    if (this.$refs.ballspace) this.$refs.ballspace.removeEventListener('click', this.moveBall)
  },
  methods: {
    moveBall (ev) {
      const f = this.$refs.foo
      const container = this.$refs.ballspace.getBoundingClientRect()
      f.style.transform = 'translateY(' + (ev.clientY - container.top) + 'px)'
      f.style.transform += 'translateX(' + (ev.clientX - container.left) + 'px)'
    },
    onMousemove (e) {
      this.xPos = e.clientX
    }
  },
  data () {
    return {
      xPos: 0
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
    border-radius: 20px;
    overflow: hidden;
  }
  .movearea {
    transition: 0.3s background-color ease;
    width: 90%;
    height: 75px;
  }
  .box {
    border-style: solid;
    border-width: 1px;
    display: block;
    width: 75px;
    height: 75px;
    background-color: #0000FF;
    transition: width 2s, height 2s, background-color 2s, transform 2s;
  }
  .box:hover {
    background-color: #FFCCCC;
    width: 150px;
    height: 150px;
    transform: rotate(180deg);
  }
  .ball {
    border-radius: 25px;
    width: 50px;
    height: 50px;
    background: #c00;
    position: relative;
    transition: transform 2s;
  }
</style>
