<template>
  <q-page class="flex flex-center column q-pa-xl">
    <p class="text-h4">File upload Button with drop-Area</p>
    <div id="fileArea" ref="dropSpace">
        <q-btn
          label="attach File"
          @click="clickFileButton"
          id="saveButton"
          ref="devButton"
          />
        <slot />
      <div id="file-list" @dragleave="preventDefaults">
        <div v-for="(item, index) in base64Files" :key="index" class="file-list-item" @dragleave="preventDefaults">
          <li>
            {{ item.name }}
            <q-icon
            @dragleave="preventDefaults"
            id="close"
            name="close"
            size="xs"
            color="red-10"
            @click="doRemoveFile(item.name)"
            @keydown.enter="doRemoveFile(item.name)"
            tabindex="0"
            />
            <q-tooltip>
              {{ item.name }}
            </q-tooltip>
          </li>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'UploadComponent',
  props: ['fileData', 'myKey'],
  emits: ['getFile', 'setTitle'],
  mounted () {
    for (let index = 0; index < this.$refs.devButton.length; index++) {
      this.addPreventChildren(this.$refs.devButton[index])
    }
    this.$refs.dropSpace.addEventListener('drop', this.handleDrop, false)
    ;['dragenter', 'dragover'].forEach(eventName => {
      this.$refs.dropSpace.addEventListener(eventName, this.highlight, false)
    })
    ;['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
      this.$refs.dropSpace.addEventListener(eventName, this.preventDefaults, false)
    })
    ;['dragleave', 'drop'].forEach(eventName => {
      this.$refs.dropSpace.addEventListener(eventName, this.unhighlight, false)
    })
  },
  beforeUnmount () {
    ;['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
      this.$refs.dropSpace.removeEventListener(eventName, this.preventDefaults, false)
    })
    this.$refs.dropSpace.removeEventListener('drop', this.handleDrop, false)
    ;['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
      this.$refs.dropSpace.removeEventListener(eventName, this.preventDefaults, false)
    })
    ;['dragleave', 'drop'].forEach(eventName => {
      this.$refs.dropSpace.removeEventListener(eventName, this.unhighlight, false)
    })
    for (let index = 0; index < this.$refs.devButton.length; index++) {
      this.rmvPreventChildren(this.$refs.devButton[index])
    }
  },
  methods: {
    addPreventChildren (item) {
      item.addEventListener('dragleave', this.preventDefaults, false)

      if (item.childNodes.length > 0) {
        item.childNodes.forEach(element => {
          this.addPreventChildren(element)
        })
      }
    },

    rmvPreventChildren (item) {
      item.removeEventListener('dragleave', this.preventDefaults, false)
      if (item.childNodes.length > 0) {
        item.childNodes.forEach(element => {
          this.rmvPreventChildren(element)
        })
      }
    },

    preventDefaults (e) {
      e.preventDefault()
      e.stopPropagation()
    },

    highlight () {
      this.$refs.dropSpace.classList.add('highlight')
    },

    unhighlight () {
      this.$refs.dropSpace.classList.remove('highlight')
    },

    handleDrop (e) {
      e.preventDefault()
      const files = e.dataTransfer.files
      for (let index = 0; index < files.length; index++) {
        const element = files[index]
        this.doUploadFile(element)
      }
    },

    handleSelection (e) {
      e.preventDefault()
      const file = e.target.files[0]
      this.doUploadFile(file)
    },

    clickFileButton  () {
      const input = document.createElement('input')
      input.type = 'file'
      input.addEventListener('input', this.handleSelection)
      input.click()
    },

    doUploadFile (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        const base64String = reader.result
          .replace('data:', '')
          .replace(/^.+,/, '')
        this.base64Files.push({ remote_uid: 9876, name: file.name, 'content--encoding': 'Base64', content: base64String })
      }
      if (file) {
        reader.readAsDataURL(file)
      }
      this.$emit('setTitle', file.name)
      this.$emit('getFile', this.base64Files)
    },

    doRemoveFile (fileName) {
      const arr = []
      for (let i = 0; i < this.base64Files.length; i++) {
        if (this.base64Files[i].name !== fileName) {
          arr.push(this.base64Files[i])
        }
      }
      this.base64Files = arr
      this.$emit('getFile', this.base64Files)
    },

    clearFiles () {
      this.base64Files = []
      this.$emit('getFile', this.base64Files)
    }
  },
  data () {
    return {
      base64Files: []
    }
  }
}
</script>

<style scoped>
.highlight {
  border: 2px dashed rgb(225, 210, 200);
  border-radius: 8px;
  padding-top: 5px;
  padding-left: 2px;
  margin-bottom: 2px;
}
#fileArea {
  display: flex;
  width: 80%;
  min-height: 4rem;
  margin-bottom: 1em;
  padding-right: 4px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.file-list-item {
  border: 1px solid #ccc;
  display: block;
  padding:5px;
  margin-right:2px;
  border-radius: 6px;
  margin-top:1px;
  background-color:rgb(245, 248, 248);
  height:32px;
  max-width:100%;
  overflow: hidden;
  line-height: 1.6;
}

#file-list {
  margin-top: 5px;
  widows: 10%;
  padding-top: 3px;
  margin-bottom: 5px;
  overflow: hidden;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, auto));
  grid-column-gap: 1px;
}

li {
  list-style-type: none;
  display:grid;
  grid-template-columns: 1fr 25px;
  word-break:break-word
}

#close {
  size: 250%;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: rgb(240, 240, 240);
  float:right;
  position: relative;
}

#close:hover {
  background-color: rgba(255, 240, 240, 0.7);
}

@media only screen and (max-width: 490px) {
  .fileArea {
    display:block;
  }
}
</style>
