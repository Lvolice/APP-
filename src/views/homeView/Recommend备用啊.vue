<template>
  <div class="recommend">
    <!-- 推荐 -->

    <div class="banner">
      <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
        <van-swipe-item v-for="(item, index) in banner.children" :key="index">
          <img :src="item.model.cover" alt="" />
        </van-swipe-item>

        <template #indicator="{ active, total }">
          <div class="custom-indicator">
            <span>{{ active + 1 }}</span>
            / {{ total }}
          </div>
        </template>
      </van-swipe>
    </div>

    <div class="remain">
      <div class="item-box" v-for="(item, index) in AllData" :key="index">
        <!-- v-for 不能和v-if一起使用 -->
        <!-- 做一个判断 要么小视频  要么是盒子 -->
        <div class="uiMiddleCard" v-if="item.type == 'uiMiddleCard'">
          <!-- 三个盒子 -->
          <div class="cover">
            <van-image
              width="100%"
              height="100"
              lazy-load
              :src="item.children[0].model.resource.cover"
            />
          </div>
          <!-- 标题 -->
          <div class="title">{{ item.children[0].model.resource.title }}</div>
          <!-- 电影类型 -->
          <div class="movie-type">
            <span class="author">高分获奖集合</span>
            <!-- 引用别的图片 -->
            <van-icon name="ellipsis" />
          </div>
        </div>

        <div class="uiBigCardTop" v-if="item.type == 'uiBigCardTop'"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, reactive, toRefs } from 'vue'
import axios from 'axios'
export default {
  setup() {
    const data = reactive({
      // 剩余的一些变量(数据)
      AllData: [],
      // 放五六张的轮播图
      banner: [],
    })

    const getBanner = () => {
      let all = JSON.parse(localStorage.getItem('all'))

      console.log(all)
      if (all) {
        data.banner = all[0]
        console.log(data.banner)
        data.AllData = all.slice(1)
        console.log(data.AllData)
        return
      }

      axios({
        method: 'get',
        url: 'https://apis.netstart.cn/xpc/home/recommend',
      })
        .then((res) => {
          console.log('res', res.data.data.children)
          data.banner = res.data.data.children[0]
          data.AllData = res.data.data.children.slice(1)
          localStorage.setItem('all', JSON.stringify(res.data.data.children))
        })
        .catch((err) => {
          console.log(err)
        })
    }
    //   生命周期  去调用轮播图的数据

    onMounted(() => {
      getBanner()
    })
    return {
      ...toRefs(data),
    }
  },
}
</script>
<style lang="less" scoped>
.custom-indicator {
  position: absolute;
  right: 5px;
  bottom: 5px;
  padding: 2px;
  font-size: 12px;
  background: rgba(0, 0, 0, 0.1);
  color: white;
  span {
    font-size: 18px;
    margin-right: 2px;
  }
}

.recommend {
  .banner {
    overflow: hidden;
    margin: 10px;
    border-radius: 10%;
    img {
      width: 100%;
      height: 200px;
    }
  }

  .remain {
    display: flex;
    flex-wrap: wrap;
    padding: 10px;
    justify-content: space-between;
    // .item-box {
    //   width: 150px;
    //   height: 200px;
    //   background-color:pink;
    // }
    // vw是根据屏幕
    .uiMiddleCard {
      border-radius: 6px;
      overflow: hidden;
      width: calc(50vw - 15px);
      height: 200px;
      background-color: pink;
      margin-top: 10px;
    }
    .uiBigCardTop {
      width: calc(100vw - 20px);
      height: 200px;
      background-color: pink;
      margin-top: 10px;
    }
  }
}
</style>
