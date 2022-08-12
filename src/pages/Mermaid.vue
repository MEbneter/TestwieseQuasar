<template>
  <q-page class="flex flex-center column">
    <p class="text-h4">
      Mermaid.js
    </p>
    <p class="text-caption q-mx-lg" style="min-width: 80%; text-align: center">
      It is a Javascript based diagramming and charting tool that renders
      Markdown-inspired text definitions to create and modify diagrams dynamically.
    </p>
    <!-- <code class="language-mermaid"> -->
      <q-input
        v-model="myMaid"
        filled
        type="textarea"
        autogrow
        style="min-width: 80%; min-height: 15vh"
      />
      <div class="q-my-sm" style="display: flex">
        <q-btn class="q-mx-sm" color="white" text-color="black" id="googleMap" label="Commit my Mermaid" @click="setMyMaid"/>
        <q-select class="q-mx-sm" v-model="chosenExample" :options="exampleSelection" label="Example Maid's" style="min-width: 200px; display: inline"  />
      </div>
      <div style="width:95%">
        <!-- <div class="mermaid theme-container " v-html="currentMaid"/> -->
        <code v-if="myToggle"><div class="mermaid theme-container "> {{ currentMaid }} </div></code>
      </div>

    <!-- </code> -->
  </q-page>
</template>

<script>
import mermaid from 'mermaid'

export default {
  name: 'MermaidDiagrams',
  components: { },
  created () {
    /* mermaid.initialize({startOnLoad:true}, this.setMermaidLoaded()) */
  },
  watch: {
    chosenExample () {
      this.getMermaidExampleString()
    }
  },
  methods: {
    setMyMaid () {
      this.myToggle = false
      console.log(this.myMaid)
      this.currentMaid = this.myMaid
      setTimeout(() => {
        this.myToggle = true
      }, 100)
      setTimeout(() => {
        mermaid.init()
      }, 600)
    },
    getMermaidExampleString () {
      this.myToggle = false
      if (this.chosenExample === 'pie') this.currentMaid = this.examples.pieMaid
      if (this.chosenExample === 'flow') this.currentMaid = this.examples.flowMaid
      if (this.chosenExample === 'sequenz') this.currentMaid = this.examples.sequenzMaid
      if (this.chosenExample === 'graph l-r') this.currentMaid = this.examples.graphLr
      setTimeout(() => {
        this.myToggle = true
      }, 100)
      setTimeout(() => {
        if (this.currentMaid === '') this.myToggle = false
        else this.myMaid = this.currentMaid
        mermaid.init()
      }, 600)
    }
  },
  data () {
    return {
      // Syntax error ohne Zeilenumbrüche(\r\n)
      myMaid: 'sequenceDiagram\r\nA->> B: Query\r\nB->> C: Forward query\r\nNote right of C: Thinking...\r\nC->> B: Response\r\nB->> A: Forward response',
      myToggle: false,
      currentMaid: '',
      chosenExample: '',
      exampleSelection: ['pie', 'flow', 'sequenz', 'graph l-r'],
      examples: {
        pieMaid: 'pie\r\ntitle Pets adopted by volunteers\r\n"Dogs":386\r\n"Cats":85\r\n"Rats":15',
        flowMaid: 'graph TD\r\nA[Christmas] -->|Get money| B(Go shopping)\r\nB --> C{Let me think}' +
            '\r\nC -->|One| D[Laptop]\r\nC -->|Two| E[iPhone]\r\nC -->|Three| F[fa:fa-car Car]',
        sequenzMaid: 'sequenceDiagram\r\nactor Alice\r\nAlice->>+John: Hello John, how are you?\r\n' +
            'Alice->>+John: John, can you hear me?\r\nJohn-->>-Alice: Hi Alice, I can hear you!\r\nJohn-->>-Alice: I feel great!',
        graphLr: 'graph LR;\r\nA--> B & C & D;\r\nB--> A & E;\r\nC--> A & E;\r\nD--> A & E;\r\nE--> B & C & D;'
      }
    }
  }
}
</script>

<style scoped>
.theme-container {
  padding: 0;
  margin: 0;
  margin-bottom: 24px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  min-width: 55%;
  border: 1px solid #BBBBBB;
  border-radius: 20px;
  overflow: visible;
}
</style>
<style>
.mermaid svg{
  width: 80%;
  margin: 5em;
}

</style>
