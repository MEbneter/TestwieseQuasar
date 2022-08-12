<template>
  <q-page class="q-pa-md">
    <p class="text-h4 text-center">Navigator-Tests</p>
    <q-list v-for="item in navigatorItems" :key="item" separator bordered>
    <q-item dense class="q-px-sm q-ma-xs column" >
      <p class="text-h6" style="margin-right:180px">{{item.title}}</p>
      <p style="margin-right:180px">{{item.text}}</p>
      <div style="position:absolute; top:0.5em; right:0.5em; width: 180px">
        <q-btn
          color="blue-grey-14"
          outline dense label="print object in console"
          @click="getNavigatorItem(item.key)"
        />
        <q-btn
          round
          dense
          v-if="item.key === 'clipboard'"
          @click="copyToClipboard(item.text)"
          color="black"
          icon="content_copy"
          style="margin-top:1px; margin-right:2em"
        >
          <q-tooltip>
            Copy to clipboard
          </q-tooltip>
        </q-btn>
      </div>
    </q-item>
    </q-list>
  </q-page>
</template>

<script>
export default {
  name: 'NavigatorAPI',
  setup () {
    const navigatorItems = [
      {
        title: 'Navigator.connection',
        text: 'Provides a NetworkInformation object containing information about the network connection of a device.',
        key: 'connection'
      },
      {
        title: 'Navigator.cookieEnabled',
        text: 'Returns false if setting a cookie will be ignored and true otherwise.',
        key: 'cookieEnabled'
      },
      {
        title: 'Navigator.clipboard',
        text: 'The Clipboard API adds to the Navigator interface the read-only clipboard property, which returns the Clipboard object used to read and write the clipboard\'s contents.',
        key: 'clipboard'
      },
      {
        title: 'Navigator.credentials',
        text: 'Returns the CredentialsContainer interface which exposes methods to request credentials and notify the user agent when interesting events occur such as successful sign in or sign out.',
        key: 'credentials'
      },
      {
        title: 'Navigator.deviceMemory',
        text: 'Returns the amount of device memory in gigabytes. This value is an approximation given by rounding to the nearest power of 2 and dividing that number by 1024.',
        key: 'deviceMemory'
      },
      {
        title: 'Navigator.geolocation',
        text: 'Returns a Geolocation object allowing accessing the location of the device.',
        key: 'geolocation'
      },
      {
        title: 'Navigator.hid',
        text: 'Returns an HID object providing methods for connecting to HID devices, listing attached HID devices, and event handlers for connected HID devices.',
        key: 'hid'
      },
      {
        title: 'Navigator.hardwareConcurrency',
        text: 'Returns the number of logical processor cores available',
        key: 'hardwareConcurrency'
      },
      {
        title: 'Navigator.keyboard',
        text: 'Returns a Keyboard object which provides access to functions that retrieve keyboard layout maps and toggle capturing of key presses from the physical keyboard.',
        key: 'keyboard'
      },
      {
        title: 'Navigator.language',
        text: 'Returns a DOMString representing the preferred language of the user, usually the language of the browser UI. The null value is returned when this is unknown.',
        key: 'language'
      },
      {
        title: 'Navigator.languages',
        text: 'Returns an array of DOMString representing the languages known to the user, by order of preference.',
        key: 'languages'
      },
      {
        title: 'Navigator.locks',
        text: 'Returns a LockManager object that provides methods for requesting a new Lock object and querying for an existing Lock object.',
        key: 'locks'
      },
      {
        title: 'Navigator.maxTouchPoints',
        text: 'Returns the maximum number of simultaneous touch contact points are supported by the current device.',
        key: 'maxTouchPoints'
      },
      {
        title: 'Navigator.mediaCapabilities',
        text: 'Returns a MediaCapabilities object that can expose information about the decoding and encoding capabilities for a given format and output capabilities.',
        key: 'mediaCapabilities'
      },
      {
        title: 'Navigator.mediaDevices',
        text: 'Returns a reference to a MediaDevices object which can then be used to get information about available media devices (MediaDevices.enumerateDevices()), find out what constrainable properties are supported for media on the user\'s computer and user agent (MediaDevices.getSupportedConstraints()), and to request access to media using MediaDevices.getUserMedia().',
        key: 'mediaDevices'
      },
      {
        title: 'Navigator.mediaSession',
        text: 'Returns MediaSession object which can be used to provide metadata that can be used by the browser to present information about the currently-playing media to the user, such as in a global media controls UI.e',
        key: 'mediaSession'
      },
      {
        title: 'Navigator.onLine',
        text: 'Returns a boolean value indicating whether the browser is working online.',
        key: 'onLine'
      },
      {
        title: 'Navigator.permissions',
        text: 'Returns a Permissions object that can be used to query and update permission status of APIs covered by the Permissions API.',
        key: 'permissions'
      },
      {
        title: 'Navigator.presentation',
        text: 'Returns a reference to the Presentation API.',
        key: 'presentation'
      },
      {
        title: 'Navigator.serial',
        text: 'Returns a Serial object, which represents the entry point into the Web Serial API to enable the control of serial ports.',
        key: 'serial'
      },
      {
        title: 'Navigator.serviceWorker',
        text: 'Returns a ServiceWorkerContainer object, which provides access to registration, removal, upgrade, and communication with the ServiceWorker objects for the associated document.',
        key: 'serviceWorker'
      },
      {
        title: 'Navigator.storage',
        text: 'Returns the singleton StorageManager object used for managing persistence permissions and estimating available storage on a site-by-site/app-by-app basis.',
        key: 'storage'
      },
      {
        title: 'Navigator.userAgent',
        text: 'Returns the user agent string for the current browser.',
        key: 'userAgent'
      },
      {
        title: 'Navigator.userAgentData',
        text: 'Returns a NavigatorUAData object, which gives access to information about the browser and operating system of the user.',
        key: 'userAgentData'
      },
      {
        title: 'Navigator.vendor',
        text: 'Returns the vendor name of the current browser (e.g., "Netscape6").',
        key: 'vendor'
      },
      {
        title: 'Navigator.webdriver',
        text: 'Indicates whether the user agent is controlled by automation.',
        key: 'webdriver'
      },
      {
        title: 'Navigator.xr',
        text: 'Returns XRSystem object, which represents the entry point into the WebXR API.',
        key: 'xr'
      }
    ]
    const copyToClipboard = function (text) {
      navigator.clipboard.writeText(text)
    }
    const getNavigatorItem = function (item) {
      console.log(navigator[item])
    }
    return {
      getNavigatorItem,
      copyToClipboard,
      navigatorItems
    }
  }
}
</script>

<style scoped>

</style>
