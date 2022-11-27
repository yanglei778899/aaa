import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store, { setupStore } from './store'
import { globalRegister } from './global'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

// 初始化样式
import 'normalize.css'
import './assets/css/index.less'

// import lyRequest from './service'
// lyRequest.request({})
// console.log(process.env, 11111)

const app = createApp(App)
app.use(globalRegister)
app.use(store)
setupStore()
app.use(router)
app.use(ElementPlus)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app.mount('#app')
