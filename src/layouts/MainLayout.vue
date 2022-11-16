<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
          Testwiese
        </q-toolbar-title>

        <div>Quasar v{{ $q.version }}</div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
    >
      <q-list class="q-my-sm">
        <q-item v-for="link in essentialLinks" :key="link" class="q-py-xs">
          <q-btn align="left" flat style="color: #0050a0; width:100%" :icon="link.icon" :label="link.title" :to="link.link" />
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>

const linksList = [
  {
    title: 'Home',
    icon: 'home',
    link: '/'
  },
  {
    title: 'Navigator',
    icon: 'assistant_direction',
    link: '/navigator'
  },
  {
    title: 'Geolocation',
    icon: 'my_location',
    link: '/geolocation'
  },
  {
    title: 'Text to speech',
    icon: 'chat_bubble_outline',
    link: '/text2speech'
  },
  {
    title: 'Slider',
    icon: 'toggle_off',
    link: '/slider'
  },
  {
    title: 'File upload',
    icon: 'file_upload',
    link: '/fileButton'
  },
  {
    title: 'Notifications/Alerts',
    icon: 'notifications',
    link: '/notify'
  },
  {
    title: 'Canvas-IMG',
    icon: 'image',
    link: '/canvasFun'
  },
  {
    title: 'CSS-Animations',
    icon: 'favorite',
    link: '/animations'
  },
  {
    title: 'CSS-Transitions',
    icon: 'interests',
    link: '/transitions'
  },
  {
    title: 'Video',
    icon: 'smart_display',
    link: '/video'
  },
  {
    title: 'JS-Math',
    icon: 'calculate',
    link: '/math'
  },
  {
    title: 'Drag n Drop',
    icon: 'drag_indicator',
    link: '/drag'
  },
  {
    title: 'Mermaid.js',
    icon: 'schema',
    link: '/mermaid'
  },
  {
    title: 'Base64',
    icon: 'code',
    link: '/base64'
  },
  {
    title: 'QRCode',
    icon: 'qr_code_2',
    link: '/qrcode'
  },
  {
    title: 'Cam',
    icon: 'camera',
    link: '/camimg'
  },
  {
    title: 'Custom Event',
    icon: 'festival',
    link: '/event'
  },
  {
    title: 'Debounce/Throttle',
    icon: 'self_improvement',
    link: '/bounce'
  },
  {
    title: 'Console',
    icon: 'announcement',
    link: '/console'
  }
]

import { ref } from 'vue'
/* import mermaid from "mermaid"; */
export default ({
  name: 'MainLayout',

  setup () {
    const leftDrawerOpen = ref(false)
    /*  mermaid.initialize({startOnLoad:true}) */
    return {
      essentialLinks: linksList,
      leftDrawerOpen,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      }
    }
  }
})
</script>
