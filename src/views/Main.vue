<template>
  <!-- 这里事写网页得地方 -->
  <!-- 尽量给一个根标签 -->
  <div class="main">
    <!-- 做跳转用的 -->
    <router-view />

    <!-- active-color表示选中时候的颜色  inactive-color表示未选中时候的颜色-->
    <van-tabbar route active-color="adadad" inactive-color="lalala">
      <!-- to表示跳转页面位置  icon表示图标样式 -->
      <!-- <van-tabbar-item replace to="/home" icon="home-o">首页</van-tabbar-item>
      <van-tabbar-item replace to="/my" icon="friends-o">我的</van-tabbar-item>
      <van-tabbar-item replace to="/choiceness" icon="search"
        >每日推荐</van-tabbar-item
      > -->
      <!-- <van-tabbar-item replace to="/recommend" icon="search">推荐</van-tabbar-item> -->
      <!-- <van-tabbar-item replace to="/search" icon="search">搜索</van-tabbar-item>
      <van-tabbar-item replace to="/takenotes" icon="search"
        >手记</van-tabbar-item
      > -->
      <!-- <van-tabbar-item replace to="/videoplayback" icon="search"
        >视频播放页面</van-tabbar-item
      > -->
      <van-tabbar-item
        v-for="(item, index) in list"
        :key="index"
        :to="item.path"
      >
        <span>{{ item.cname }}</span>
        <template #icon="props">
          <img :src="props.active ? item.active : item.inactive" />
        </template>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
// 这里是写js逻辑得地方
import { reactive, ref, toRefs } from "vue";
export default {
  setup() {
    let active = ref(0);
    const data = reactive({
      list: [
        {
          // new URL('../assets/icon/home.png', import.meta.url).href

          active: new URL("../assets/home_active.png", import.meta.url).href,
          inactive: new URL("../assets/home.png", import.meta.url).href,
          cname: "首页",
          path: "/home",
        },
        {
          active: new URL("../assets/book_active.png", import.meta.url).href,
          inactive: new URL("../assets/book.png", import.meta.url).href,
          cname: "手记",
          path: "/takenotes",
        },
        {
          active: new URL("../assets/search_active.png", import.meta.url).href,
          inactive: new URL("../assets/search.png", import.meta.url).href,
          cname: "搜索",
          path: "/search",
        },
        {
          active: new URL("../assets/my_active.png", import.meta.url).href,
          inactive: new URL("../assets/my.png", import.meta.url).href,
          cname: "我的",
          path: "/my",
        },
      ],
    });
    const icon = {
      active: "https://fastly.jsdelivr.net/npm/@vant/assets/user-active.png",
      inactive:
        "https://fastly.jsdelivr.net/npm/@vant/assets/user-inactive.png",
    };
    return {
      ...toRefs(data),
      icon,
      active,
    };
  },
};
</script>

<style lang="less" scoped>
// 这里事写样式得地方 scoped表示这里得样式只在该文件生效 不会对别的文件造成影响
</style>