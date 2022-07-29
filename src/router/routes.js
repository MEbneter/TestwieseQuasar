
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      { path: '/navigator', component: () => import('pages/Navigator.vue') },
      { path: '/geolocation', component: () => import('pages/Geolocation.vue') },
      { path: '/text2speech', component: () => import('pages/Txt2speech.vue') },
      { path: '/slider', component: () => import('pages/SliderCaptcha.vue') },
      { path: '/fileButton', component: () => import('pages/UploadFile-button.vue') },
      { path: '/notify', component: () => import('pages/Notify.vue') },
      { path: '/canvasFun', component: () => import('pages/CanvasFun.vue') },
      { path: '/animations', component: () => import('pages/CssAnimations.vue') },
      { path: '/transitions', component: () => import('pages/CssTransitions.vue') },
      { path: '/math', component: () => import('pages/MathBoard.vue') },
      { path: '/base64', component: () => import('pages/Base64.vue') },
      { path: '/drag', component: () => import('pages/DragDrop.vue') },
      { path: '/mermaid', component: () => import('pages/Mermaid.vue') },
      { path: '/event', component: () => import('pages/CustomEvent.vue') },
      { path: '/bounce', component: () => import('pages/Bounce.vue') },  
      { path: '/video', component: () => import('pages/Videos.vue') },      
      { path: '/console', component: () => import('pages/Console.vue') }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
