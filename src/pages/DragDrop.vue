<template>
  <q-page class="flex flex-center column">
    <p class="text-h4">
      Drag n Drop
      <q-icon
        name="refresh"
        size="sm"
        @click="clearNavigation"
      />
    </p>
    <div class="theme-container" id="dropTarget" style="min-height: 6vh" @dragover="dropDragItem" />

    <div class="q-mt-md q-mb-lg">
      <span class="dragItem typeItem" id="d1" @dragstart="setDragItem" draggable="true">
        nummer 1
      </span>
      <span class="dragItem typeItem" id="d2" @dragstart="setDragItem" draggable="true">
        nummer 2
      </span>
      <span class="dragItem typeItem" id="d3" @dragstart="setDragItem" draggable="true">
        nummer 3
      </span>
      <span class="dragItem typeItem" id="d4" @dragstart="setDragItem" draggable="true">
        nummer 4
      </span>
    </div>
  </q-page>
</template>

<script>

export default {
  components: { },
  mounted () {
    this.dropEl = document.getElementById('dropTarget')
  },
  methods: {
    setDragItem (ev) {
      this.selectedDragElement = ev.target
    },
    clearNavigation () {
      console.log('clearNavigation')
      // this.dropEl.innerHtml = ''
      while (this.dropEl.lastElementChild) {
        this.dropEl.removeChild(this.dropEl.lastElementChild)
      }
    },
    dropDragItem (ev) {
      ev.preventDefault()
      this.selectedDragElement.addEventListener('dragend', this.dropChild, { once: true })
    },
    dropChild () {
      let alreadyExists = false
      if (this.dropEl.childNodes[0]) {
        this.dropEl.childNodes.forEach(element => {
          if (element.id === this.selectedDragElement.id) alreadyExists = true
        })
      }
      this.selectedDragElement.removeEventListener('dragstart', this.setDragItem)
      this.selectedDragElement.removeEventListener('draged', this.dropChild)
      if (!alreadyExists) this.dropEl.appendChild(this.setupNavChild())
    },
    setupNavChild () {
      const childCopy = this.selectedDragElement.cloneNode(true)
      childCopy.draggable = false
      childCopy.classList.add('navItem')
      childCopy.classList.remove('dragItem')
      return childCopy
    }
  },
  data () {
    return {
      dropEl: null,
      selectedDragElement: null
    }
  }
}
</script>

<style scoped>
  .theme-container {
    margin-bottom: 4px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 75%;
    height: 5vh;
    border: 1px solid #BBBBBB;
    padding: 1em;
    border-radius: 20px;
    overflow: hidden;
    word-break: break-all;
  }
  .typeItem {
    border: 1px solid #BBBBBB;
    padding: 6px;
    border-radius: 12px;
    margin: 2px;
  }
  .dragItem:hover {
    cursor: grab;
  }
  .navItem {
    background: #BBDDDD
  }
  .navItem:hover {
    background: #DDFFDD;
    cursor: pointer;
  }
</style>
