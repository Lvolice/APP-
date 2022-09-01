<template>
  <div class="recommend">
    <!-- 推荐 -->
    <div class="banner">
      <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
        <van-swipe-item v-for="(item,index) in banner.children" :key="index">
          <img :src="item.model.cover" alt =""/>
        </van-swipe-item>


        <template #indicator="{ active, total }">
          <div class="custom-indicator"><span>{{ active + 1 }}</span>/{{ total }}</div>
        </template>
      </van-swipe>
      

    </div>
  </div>
</template>

<script>
import { onMounted, reactive, toRefs } from "vue";
import axios from "axios";
export default {
  setup() {
    const data = reactive({
      //剩余一些变量（数据）
      AllData: [],
      //放置六张轮播图
      banner: []
    });

    const getBanner = () => {
      //这里面事判断是否存在 缓存 如果没有缓存的时候才去请求
      let all = JSON.parse(localStorage.getItem("all"));

      console.log(all);
      //拦截 如果存在我就阻止请求
      if (all) {
        //在这里赋值
        // data.All = locDate.tab.slice(1);
        data.banner = all[0];
        data.AllData = all.slice(1);
        return;
      }

      axios({
        method: "get",
        url: "https://apis.netstart.cn/xpc/home/recommend"
      })
        .then(res => {
          console.log("res", res.data.data.children);
          data.banner = res.data.data.children[0];
          data.AllData = res.data.data.children.slice(1);
          localStorage.setItem("all", JSON.stringify(res.data.data.children));
        })
        .catch(err => {
          console.log(err);
        });
    };
    onMounted(() => {
      getBanner();
    });
    return {
      ...toRefs(data)
    };
  }
};
</script>

<style lang="less" scoped>
.recommend {
  .banner {
    img {
      height: 200px;
      width: 100%;
    }
.custom-indicator {
    position: absolute;
    right: 5px;
    bottom: 5px;
    padding: 2px 5px;
    background: rgba(22, 21, 21, 0.1);
    font-size:14px;
    font-weight:600;
    color:white;
  }

  }
}
</style>