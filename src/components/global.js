import Vue from 'vue'

Vue.component('copy-rights', 
    () => import('./CopyRights.vue')
)

Vue.component('sidebar', 
    () => import('./Sidebar.vue')
)

Vue.component('header_main', 
    () => import('./Header_main.vue')
)

Vue.component('footer_main', 
    () => import('./Footer_main.vue')
)
