<template>
  <q-page class="flex flex-center column">
    <p class="text-h4">Testwiese</p>
    <img
      alt="Quasar logo"
      src="~assets/carpenter.png"
      width="300"
    >
    <div id="clock">
      <div class="date">{{ myDate }}</div>
      <div class="time">{{ myTime }}</div>
    </div>
    <div class="timer-container" id="clock">
      <div id="clockCenter" ></div>
      <div id="timer" @click="doClickTimer">
        <img src="~assets/clock-face-png.png" alt="" style="height:100%; width:100%">
        <div id="secCircle" ref="secCircle" class="clockPointer" style="top:-70px"/>
        <div style="top: -71px" id="minCircle" ref="minCircle" class="clockPointer"/>
        <div style="top: -70px" id="hourCircle" ref="hourCircle" class="clockPointer" />
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'PageIndex',
  mounted() {
    this.getDate()
    this.timeUpdate = setInterval(() => { this.getDate() }, 500)
  },
  unmounted(){
    clearInterval(this.timeUpdate)
  },
  methods: {
    doClickTimer (tempDate) {
      const minutes = tempDate.getMinutes()
      const seconds = tempDate.getSeconds()
      const hourToday = tempDate.getHours()
      const minutesToday = 60* hourToday + minutes
      const secondsToday =  60* minutesToday + seconds
      this.$refs.secCircle.style.transform = `rotate(${6 * secondsToday}deg)`
      this.$refs.minCircle.style.transform = `rotate(${6 * minutesToday}deg)`
      this.$refs.hourCircle.style.transform = `rotate(${30 * hourToday + (minutesToday/60)}deg)`
    },
    getDate () {
      const tempDate = new Date()
      const year = tempDate.getFullYear()
      const month = this.months[tempDate.getMonth()]
      const day = this.days[tempDate.getDay()]
      const dayNumber = this.zeroPadding(tempDate.getDate(), 2)
      this.myDate = day + '/' + dayNumber + ' - ' + month + ' - ' + year
      const hours = this.zeroPadding(tempDate.getHours(),2)
      const minutes = this.zeroPadding(tempDate.getMinutes(),2)
      const seconds = this.zeroPadding(tempDate.getSeconds(),2)
      this.myTime = hours + ':' + minutes + ':' + seconds
      this.doClickTimer(tempDate)
    },
    zeroPadding(num, digit) {
      var zero = '';
        for(var i = 0; i < digit; i++) {
            zero += '0';
        }
      return (zero + num).slice(-digit);
    }
  },
  data () {
    return {
      secCircle: null,
      timeUpdate: null,
      myDate: null,
      myTime: null,
      months: {
        0: 'January',
        1: 'February',
        2: 'March',
        3: 'April',
        4: 'May',
        5: 'June',
        6: 'July',
        7: 'August',
        8: 'September',
        9: 'October',
        10: 'November',
        11: 'December'
      },
      days: [
        'Sun',
        'Mon',
        'Tue',
        'Wed',
        'Thu',
        'Fri',
        'Sat'
      ]
    }
  }
})
</script>

<style scoped>
#clock {
  font-family: 'Share Tech Mono', monospace;
  text-align: center;
  color: #255cbd;
  margin-bottom: 1rem;
}
.time {
  letter-spacing: 0.05em;
  font-size: 20px;
  padding: 2px 0;
  z-index: 100;
}
.date {
  letter-spacing: 0.05em;
  font-size: 16px;
  padding: 2px 0;
}
.timer-container {
  display: flex;
  justify-content: center;
  border: 0;
  box-sizing: border-box;
}

#timer {
  font-size: 2em;
  height: 5em;
  width: 5em;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
#clockCenter {
  position: relative;
  background: #012;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  top: 65px;
  left: 75px
}
.clockPointer {
  position: relative;
  width: 90%;
  height: 0px;
  transform-origin: center;
  transition: 500ms;
}

#secCircle::after{
  content: ' ';
  position: absolute;
  top: -2.4em;
  right: 2.18em;
  height: 2.4em;
  width: 1px;
  background: #FFF;
  border-radius: 50%;
  border: 1px solid black;
}
#minCircle::after{
  content: ' ';
  position: absolute;
  top: -2em;
  right: 2.18em;
  height: 2em;
  width: 2px;
  background: #000;
  border-radius: 50%;
  border: 1px solid black;
}
#hourCircle::after{
  content: ' ';
  position: absolute;
  top: -1.8em;
  right: 2.18em;
  height: 1.6em;
  width: 4px;
  background: #226;
  border-radius: 50%;
  border: 1px solid black;
}
</style>
