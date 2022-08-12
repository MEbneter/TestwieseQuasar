<template>
  <q-page class="flex flex-center column">
    <p class="text-h4">Notifications and Alerts</p>
    <div class="q-pa-md" style="width: 80%">
      <q-input
        v-model="inputText"
        filled
        autogrow
      />
    </div>
    <q-btn push color="white" text-color="primary" class="q-mb-sm" label="Trigger alarm" @click="doAlert"/>
    <q-btn push color="white" text-color="primary" class="q-mb-sm" label="Notify in Browser" @click="doNotify"/>
    <q-btn push color="white" text-color="primary" class="q-mb-sm" label="Desktop Notification" @click="doNotification"/>
    <div>Your notification permission: {{ isPermitted }}</div>
    <div><a href="https://blog.atulr.com/web-notifications/">Guide für Push-Notification mit Node.js</a></div>
  </q-page>
</template>

<script>
import { ref, computed } from 'vue'
import { useQuasar } from 'quasar'
export default {
  name: 'NotificationsVariants',
  setup () {
    const $q = useQuasar()
    const inputText = ref('Hier kann dein persönlicher Alert/Notification-Text stehen')

    const doAlert = function () {
      alert(inputText.value)
    }

    const doNotify = function () {
      $q.notify(inputText.value)
    }

    const isPermitted = computed(() => {
      return Notification.permission
    })

    const doNotification = function () { // mdn example
      // Let's check if the browser supports notifications
      if (!('Notification' in window)) {
        alert('This browser does not support desktop notification')
      } else if (Notification.permission === 'granted') {
        Notification(inputText.value)
      } else if (Notification.permission !== 'denied') {
        Notification.requestPermission(function (permission) {
          if (permission === 'granted') {
            Notification(inputText.value)
          }
        })
      }
    }

    return {
      inputText,
      doAlert,
      doNotify,
      doNotification,
      isPermitted
    }
  }
}
</script>
