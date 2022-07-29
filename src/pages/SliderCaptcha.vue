<template>
  <q-page class="flex flex-center column">
    <p class="text-h4">Slider Captcha</p>
    <div id="slider-container">
      <div class="slider-field">
        <div class="slider-wrapper">
          <div class="slider" ref="jkSlider" @mousedown="onmousedown" @touchstart="onmousedown" ></div>
        </div>
        <input value="isbot">
      </div>
      <div id="sliderText">
        <slot> {{!isBot}} </slot>
      </div>
    </div>
  </q-page>
</template>

<script>

export default {
  components: { },
  name: 'Slider',
  emits: ['bot-status'],

  watch: {
    isBot () {
      this.$emit('bot-status', this.isBot)
    }
  },

  created () {
    document.addEventListener('mouseup', this.removeListner)
    document.addEventListener('touchend', this.removeListner)
  },

  unmounted () {
    ['mouseup', 'touchend'].forEach(el => {
      document.removeEventListener(el, this.removeListner)
    })
  },

  methods: {
    removeListner () {
      const slider = this.$refs.jkSlider
      slider.removeEventListener('mousemove', this.onmousemove)
      slider.removeEventListener('touchmove', this.onmousemove)
    },
    onmousedown () {
      const slider = this.$refs.jkSlider
      slider.addEventListener('mousemove', this.onmousemove)
      slider.addEventListener('touchmove', this.onmousemove)
    },
    onmousemove (e) {
      const slider = this.$refs.jkSlider
      const captchas = document.getElementsByClassName('slider-wrapper')
      this.wrapper = captchas[0]
      const maxleft = this.wrapper.offsetWidth - slider.offsetWidth - 2
      const woffset = this.offset(this.wrapper)
      const pageX = e.type === 'mousemove' ? e.pageX : e.touches[0].pageX
      let left = pageX - woffset.left - slider.offsetWidth / 2
      if (left <= 0) left = 0
      else if (left >= maxleft) left = maxleft
      slider.style.left = left + 'px'
      if (left === maxleft) {
        this.wrapper.classList.add('human')
        document.querySelector('.slider-field input').value = 'notbot'
        this.isBot = false
      } else {
        this.wrapper.classList.remove('human')
        document.querySelector('.slider-field input').value = 'isbot'
        this.isBot = true
      }
    },
    offset (el) {
      const rect = el.getBoundingClientRect(),
        scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
        scrollTop = window.pageYOffset || document.documentElement.scrollTop
      return {
        top: rect.top + scrollTop,
        left: rect.left + scrollLeft
      }
    }
  },

  data () {
    return {
      isBot: true
    }
  }
}
</script>

<style scoped>
.slider-field input {
    display: none;
}

.slider-field {
  display: inline;
}

.slider-wrapper {
  margin-top: 10px;
  position: relative;
  display: inline-block;
  width: 100px;
  height: 30px;
  border: 1px solid gray;
  border-radius: 15px;
  background-color: white;
  border-color: #a2a2a2;
  box-shadow: inset 0 0 3px gray;
}

.slider-wrapper:before {
  position: absolute;
  left: 8px;
  line-height: 30px;
  font-size: 13px;
  z-index: 1;
  color: white;
}

.slider-wrapper:after {
  position: absolute;
  right: 10px;
  line-height: 30px;
  font-size: 13px;
  z-index: 1;
}

#slider-container {
  display: grid;
  grid-template-columns: 105px 1fr;
}

.slider {
  position: absolute;
  left: 0;
  top: 0;
  z-index: 2;
  height: 28px;
  width: 28px;
  border: 1px solid #111;
  border-radius: 20px;
  cursor: grab;
  background: white;
  border-color: white;
  box-shadow: 0 0 5px gray;
}

.slider-wrapper.human {
  background-color: #1bd421;
  border-color: #00a005;
  box-shadow: none;
}

#sliderText {
  display:inline;
  top: 50%;
  position: relative;
  -ms-transform: translateY(-30%);
  transform: translateY(-30%);
  margin-left: 3px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
</style>
