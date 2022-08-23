<template>
  <q-page class="flex flex-center column">
    <p class="text-h4">Base64 to Binary</p>
    <div>
      <q-btn
        class="q-mr-sm q-mb-sm"
        dense
        color="white"
        text-color="black"
        label="Clear"
        @click="base64 = ''"
      />
      <q-btn
        class="q-mr-sm q-mb-sm"
        dense
        color="white"
        text-color="black"
        label="Demo-String"
        @click="base64 = base64Demo"
      />
    </div>
    <span style="margin:0; padding:0; width: 75%; height: 1px">
        <q-chip class="text-overline float-right" outline icon-right="mood" color="green-9" v-if="isBase64">Is base64 </q-chip>
        <q-chip class="text-overline float-right" outline icon-right="mood_bad" color="negative" v-else>Not base64 </q-chip>
    </span>
      <div class="text-h6" style="">Base64</div>

    <q-input
      v-model="base64"
      class="theme-container"
      filled
      type="textarea"
    />
    <div class="text-h6">Text</div>

    <q-scroll-area class="theme-container" style="height: 25vh;">
      <div style="word-break: break-all"> {{ getBinaryFromAnsi() }} </div>
    </q-scroll-area>

    <div class="text-h6">HTML</div>
    <div class="theme-container" v-html="getBinaryFromAnsi()" />
  </q-page>
</template>
<script>
/**
 * Todo:
 * Error Handling
 * Text, html, img detection?
 * export example base64 in seperate json aGFsbG8=
 */
export default {
  name: 'Base64Viewer',
  components: { },
  computed: {
    isBase64 () {
      // eslint-disable-next-line no-useless-escape
      const notBase64 = /[^A-Z0-9+\/=]/i
      if (typeof this.base64 !== 'string') return
      const len = this.base64.length
      if (!len || len % 4 !== 0 || notBase64.test(this.base64)) {
        return false
      }
      const firstPaddingChar = this.base64.indexOf('=')
      return firstPaddingChar === -1 ||
        firstPaddingChar === len - 1 ||
        (firstPaddingChar === len - 2 && this.base64[len - 1] === '=')
    }
  },
  methods: {
    getBinaryFromAnsi () {
      return atob(this.base64)
    }
  },
  data () {
    return {
      base64: '',
      base64Demo:
        'PHVsPjxsaT5hPC9saT48bGk+PGI+YjwvYj48L2xpPjxsaT5jPC9saT48L3VsPg=='
    }
  }
}
</script>

<style scoped>
  .theme-container {
    margin-bottom: 4px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 75%;
    min-height: 10vh;
    border: 1px solid #BBBBBB;
    padding: 1em;
    border-radius: 20px;
    overflow: hidden;
    word-break: break-all;
  }
</style>
<style>
.q-chip__icon {
  margin-left: .1em;
  font-size: 2em;
  color: black
}
</style>
