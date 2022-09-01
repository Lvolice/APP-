import { createApp, ref } from 'vue'
import './style.css'
import App from './App.vue'
import {
  Button, Tabbar, TabbarItem, Tab, Tabs, Swipe, SwipeItem, Image as VanImage, Lazyload, Icon, Search, NavBar
} from 'vant';
import 'lib-flexible/flexible'
import router from './router/index'
import 'vant/lib/index.css';

export default {
  setup() {
    const active = ref(0);
    const icon = {
      active: 'https://fastly.jsdelivr.net/npm/@vant/assets/user-active.png',
      inactive:
        'https://fastly.jsdelivr.net/npm/@vant/assets/user-inactive.png',
    };
    return {
      icon,
      active,
    };
  },
};

const app = createApp(App);

app.use(router)
  .use(Swipe)
  .use(SwipeItem)
  .use(Tabbar)
  .use(TabbarItem)
  .use(Button)
  .use(Tab)
  .use(Tabs)
  .use(VanImage)
  .use(Lazyload)
  .use(Icon)
  .use(Search)
  .use(NavBar)

app.mount('#app')
