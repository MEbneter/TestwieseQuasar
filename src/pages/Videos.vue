<template>
  <q-page class="flex flex-center column">
    <p class="text-h4">Embeding videos with quasar</p>
    <q-select v-model="selectedTopic" :options="videoDescr" label="Video selection" style="width: 320px"/>
    <div>
      <q-video
        id="videoField"
        :src="selectedVideo[0].url"
        :title="selectedVideo[0].descr"
        :ratio="16/9"
      />
    </div>
      <!--
        watch?v= muss mit embeded/ ersetzt werden !!!
        <q-video src="https://www.youtube.com/watch?v=Cr5tFKzCwQk" />
        <q-video src="https://www.youtube.com/embed/Cr5tFKzCwQk" />
        OWASP top 10 api-url
        https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=2&playlistId=PLyqga7AXMtPOguwtCCXGZUKvd2CDCmUgQ&key=isChN0tm1Ne
      -->
  </q-page>
</template>

<script>
/**
 * Todo:
 * Use the GoogleAPI to get all videos of the playlist (https://developers.google.com/youtube/v3/docs/playlists/list)
 * Text-field to enter video-playlist-url
 *    API-URL = 'https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults='
 *        // mit nextPageToken //
 *        + NResults + '&playlistId=' + ListID + '&pageToken=' + NextPageToken +'&key=' + APIKey
 *        // ohne nextPageToken //
 *        + NResults + '&playlistId=' + ListID + '&key=' + APIKey;
 * Get own legit api-key
 */
import { computed, ref } from 'vue'
export default {
  name: 'VideoView',
  setup () {
    const selectedTopic = ref()
    const videos = [
      {
        url: 'https://www.youtube.com/embed/ri7s1tUR-Gk',
        descr: 'Online Registrieren'
      },
      {
        url: 'https://www.youtube.com/embed/QyTrdybxk4s',
        descr: 'Eigene Adresse erfassen'
      },
      {
        url: 'https://www.youtube.com/embed/uFPmNh7PMuk',
        descr: 'Eigene Firmenlogo hinterlegen'
      },
      {
        url: 'https://www.youtube.com/embed/XvGyHrYD8sk',
        descr: 'Adresse hinzufügen'
      },
      {
        url: 'https://www.youtube.com/embed/FNUdYfOcCAY',
        descr: 'Adresse status'
      },
      {
        url: 'https://www.youtube.com/embed/pM_0xO4gLKo',
        descr: 'Konfigurieren: Adress-Zuordung'
      },
      {
        url: 'https://www.youtube.com/embed/pM_0xO4gLKo?t=6',
        descr: 'Konfigurieren: Auswahl für Datenbankfelder'
      },
      {
        url: 'https://www.youtube.com/embed/gt5X5_yF308?t=3',
        descr: 'Felder anordnen / Spalten Ein-Ausblenden'
      },
      {
        url: 'https://www.youtube.com/embed/MPvw3Z78Pkg',
        descr: 'Datenanalyse 1'
      },
      {
        url: 'https://www.youtube.com/embed/x01CZ9_VHt8?t=3',
        descr: 'Datenanalyse 2'
      },
      {
        url: 'https://www.youtube.com/embed/P26NeEHLuXA',
        descr: 'Design & Skins 1'
      },
      {
        url: 'https://www.youtube.com/embed/AopxJwaC84c',
        descr: 'Design & Skins 2'
      },
      {
        url: 'https://www.youtube.com/embed/PeokDi73vtQ?t=1',
        descr: 'Updates installieren'
      }
    ]

    selectedTopic.value = videos[1].descr

    const videoDescr = computed(() => {
      return videos.map(video => video.descr)
    })
    const selectedVideo = computed(() => {
      return videos.filter(video => video.descr === selectedTopic.value)
    })

    return {
      videos,
      videoDescr,
      selectedTopic,
      selectedVideo
    }
  }
}
</script>

<style scoped>
#videoField {
  width: 420px;
}
</style>
