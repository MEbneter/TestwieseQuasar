<template>
  <q-page class="flex flex-center column">
    <p class="text-h4">Fun with canvas and Images</p>
    <div>
    <input 
      type="file" 
      name="uploadfile" 
      id="file-selector" 
      ref="addFile" 
      @change="doUploadImg" 
      style="display:none;"
    />
    <q-btn
      class="q-ma-xs q-mb-md"
      push
      color="white" 
      for="file-selector" 
      id="fileButton" 
      text-color="primary"
      @click="openFileSelection" 
      label="Upload image"
    />
    </div>
    <div v-if="this.image.detailImage.content" id="imgView">
      <div class="test-h6 text-bold text-center" style="display: inline; min-height:120px; min-width:245px">Orginal Bild
      <div class="imagePreview" v-if="image.previewImage.type" >
        <img :src="image.detailImage.type + image.detailImage.content" />
      </div></div>
      <div class="test-h6 text-bold text-center" style="display: inline">Verkleinertes Bild
      <div class="imagePreview" v-if="image.previewImage.type" >
        <img id="previewImg" :src="image.previewImage.type + image.previewImage.content"/>
      </div></div>
      <div class="test-h6 text-bold text-center" style="display: inline">Grayscale Bild
      <div class="imagePreview" v-if="image.previewImage.type" >
        <img :src="image.grayscale.type + image.grayscale.content"/>
      </div></div>
      <div class="test-h6 text-bold text-center" style="display: inline">Inverted Bild
      <div class="imagePreview" v-if="image.previewImage.type" >
        <img :src="image.inverted.type + image.inverted.content"/>
      </div></div>
      <div class="test-h6 text-bold text-center" style="display: inline">Sepai Bild
      <div class="imagePreview" v-if="image.previewImage.type" >
        <img :src="image.sepai.type + image.sepai.content"/>
      </div></div>
    </div>
  </q-page>
</template>

<script>
import { 
  getBase64, 
  getLowResImage, 
  getFileExt, 
  checkImageSignatur, 
  getGrayscaleIMG, 
  getInvertedIMG, 
  getSepaiIMG 
  } from '../utils/file-handling'

export default {
  name: 'CanvasFun',
  methods: {
    openFileSelection (event) {
      if(event.target.id !== 'fileButton') this.$refs.addFile.click()
    },
    async doUploadImg (event) {
      event.preventDefault()
      const eventId = '#' + event.target.id
      const file = document.querySelector(eventId).files[0]
      const fileExt = await getFileExt(file)
      const base64High = await getBase64(file)
      const trueIMG = checkImageSignatur(fileExt, this.imgSignatur)
      const base64Low = await getLowResImage(base64High, 200)
      const grayscaleIMG = await getGrayscaleIMG(base64High)
      const invertedIMG = await getInvertedIMG(base64High)
      const sepaiIMG = await getSepaiIMG(base64High)
      console.log((base64Low.length / 1024).toFixed(2) + 'KB base64Low filesize')
      if (trueIMG) {
        this.image.detailImage = {
          remote_uid: 9876,
          name: file.name,
          'content--encoding': 'Base64',
          content: base64High.replace('data:', '').replace(/^.+,/, ''),
          type: base64High.split(',')[0] + ','
        }
        this.image.previewImage = {
          remote_uid: 9876,
          name: 'lowRes_' + file.name,
          'content--encoding': 'Base64',
          content: base64Low.replace('data:', '').replace(/^.+,/, ''),
          type: base64Low.split(',')[0] + ','
        }
        this.image.grayscale = {
          remote_uid: 9876,
          name: 'grayS_' + file.name,
          'content--encoding': 'Base64',
          content: grayscaleIMG.replace('data:', '').replace(/^.+,/, ''),
          type: grayscaleIMG.split(',')[0] + ','
        }
        this.image.inverted = {
          remote_uid: 9876,
          name: 'grayS_' + file.name,
          'content--encoding': 'Base64',
          content: invertedIMG.replace('data:', '').replace(/^.+,/, ''),
          type: invertedIMG.split(',')[0] + ','
        }
        this.image.sepai = {
          remote_uid: 9876,
          name: 'grayS_' + file.name,
          'content--encoding': 'Base64',
          content: sepaiIMG.replace('data:', '').replace(/^.+,/, ''),
          type: sepaiIMG.split(',')[0] + ','
        }
      } else {
        getNotify().then(notify => notify.default('wrong type of file!', 'Error', 4500))
      }
    }
  },
  data () {
    return {
      imgMod: 'normal',
      imgSignatur: [
        '89504E47', // png
        '47494638', // gif
        'FFD8FFDB', // jpg
        'FFD8FFE0',
        'FFD8FFE8',
        'FFD8FFE3',
        'FFD8FFE2',
        'FFD8FFE1',
        '424D',     // bmp
        '52494646', // webP
        '57454250',
        '4D4D002B', // tif
        '4D4D002A',
        '49492A00',
        '492049'
      ],
      image: {
        previewImage: {
          type: null,
          content: null
        },
        detailImage: {
          type: null,
          content: null
        }
      },
      previewPop: false
    }
  }
}
</script>
<style scoped>
.imagePreview {
  border: 2px solid #dbdbdb;
  border-radius: 6px;
  justify-content: center;
  align-items: center;
  padding: 1rem;
}
.construction {
  background: black;
  border-radius: 6px;
  border: 2px solid red;
}
#imgView {
  max-width: 96%;
}
</style>