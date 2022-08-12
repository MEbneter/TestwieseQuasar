<template>
  <q-page class="flex flex-center column">
    <p class="text-h4">CSS-Animations</p>
    <div class="theme-container  q-my-sm">
      <div class="text-h6">Pulsing Heart as infinite ease-out animation for scale with Keyframes</div>
      <q-icon name="favorite" class="heart" style="margin:auto"/>
    </div>
    <div class="theme-container  q-my-sm">
      <div class="text-h6">Text slidein animation</div>
      <div id="parAnimate">
        Hallo. Ich bin ein kleiner Blindtext. Und zwar schon so lange ich denken kann. Es war nicht leicht zu verstehen,
        was es bedeutet, ein blinder Text zu sein: Man macht keinen Sinn. Wirklich keinen Sinn. Man wird
        zusammenhangslos eingeschoben und rumgedreht – und oftmals gar nicht erst gelesen.
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'CssAnimations',
  setup () {

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
  .heart {
    color: red;
    font-size: 50px;
    animation: heart-pulse 0.9s infinite ease-out;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  @keyframes heart-pulse {
    0% {
      transform: scale(0); /* scaling to 0 */
    }
    50% {
      transform: scale(1.1); /* increasing the size */
    }
    70% {
      transform: scale(0.75); /* decreasing the size */
    }
    100% {
      transform: scale(0); /* seeting back to initial size */
    }
  }

  #parAnimate {
  animation-duration: 3s;
  animation-name: slidein;
  animation-iteration-count: infinite;
  animation-direction: alternate;
  }
  @keyframes slidein {
    from {
      margin-left: 100%;
      width: 300%;
    }

    to {
      margin-left: 0%;
      width: 100%;
    }
  }

</style>
