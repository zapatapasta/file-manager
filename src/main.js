
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/store'
import { createI18n } from 'vue-i18n'
const i18n = createI18n({
    locale: 'en',
    fallbackLocale: 'en',
    messages: {
      en: {
        message: {
          users: 'users',
          groups:'groups',
          files:'file managment',
          changeuser:'change user',
          language:'language',
          theme:'theme color',
          treemode:'tree mode',
          listmode:'list mode'
        }
    },
    pr: {
        message: {
            users: 'کاربران',
            groups:'گروه ها',
            files:'مدیریت فایل ها',
            changeuser:'تعویض کاربر',
            language:'زبان',
            theme:'رنگ تم',
            treemode:'حالت درختی',
            listmode:'حالت لیستی'
        }
      }
    }
})

const app = createApp(App)

// app.use(BootstrapVue);
app.use(store)
app.use(router)
app.use(i18n);

app.mount('#app')

