<template>
  <div class="search">
    <van-search
      v-model="value"
      placeholder="请输入搜索关键词"
      @search="getResulte"
    />
    <!-- 轮播 -->
    <div class="recommend">
      <van-swipe
        class="recommend-swipe"
        :autoplay="1000"
        indicator-color="white"
      >
        <van-swipe-item>
          <img
            src="https://img1.baidu.com/it/u=4231667083,3128345772&fm=253&app=138&size=w931&n=0&f=JPEG&fmt=auto?sec=1661706000&t=35e786e91d6d3c6d404b9d2bbe1446c2"
            alt=""
          />
          <div class="description">描述</div>
        </van-swipe-item>
        <div class="custom-indicator">
          <span>{{ active + 1 }}</span
          >/ {{ total }}
        </div>
      </van-swipe>
    </div>
    <!-- 中间盒子 -->
    <div class="creator-box">
      <div class="creator">
        <img
          src="https://img2.baidu.com/it/u=207148296,1247807342&fm=253&app=138&size=w931&n=0&f=JPEG&fmt=auto?sec=1661706000&t=fc9853e580df2b9477790a4f448dfb32"
          alt=""
        />
        <span>创作人</span>
      </div>
      <div class="organization">
        <img
          src="https://img2.baidu.com/it/u=207148296,1247807342&fm=253&app=138&size=w931&n=0&f=JPEG&fmt=auto?sec=1661706000&t=fc9853e580df2b9477790a4f448dfb32"
          alt=""
        />
        <span>机构</span>
      </div>
      <div class="orig-material">
        <img
          src="https://img2.baidu.com/it/u=207148296,1247807342&fm=253&app=138&size=w931&n=0&f=JPEG&fmt=auto?sec=1661706000&t=fc9853e580df2b9477790a4f448dfb32"
          alt=""
        />
        <span>正版素材</span>
      </div>
      <div class="activity">
        <img
          src="https://img2.baidu.com/it/u=207148296,1247807342&fm=253&app=138&size=w931&n=0&f=JPEG&fmt=auto?sec=1661706000&t=fc9853e580df2b9477790a4f448dfb32"
          alt=""
        />
        <span>活动</span>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs } from "vue";
import axios from "axios";
export default {
  setup() {
    const data = reactive({
      value: "请输入作品名,创作人",
      active: 0,
    });

    const getResulte = () => {
      axios({
        method: "get",
        url: `https://apis.netstart.cn/xpc/search?kw=${data.value}`,
      })
        .then((res) => {
          console.log("我是请求回来的数据", res);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    return {
      ...toRefs(data),
      getResulte,
    };
  },
};
</script>

<style lang="less" scoped>
.search {
  background: #f7f7f7;
  margin-top: 10px;
  .recommend-swipe {
    overflow: hidden;
    margin: 10px;
    border-radius: 10px;
    position: relative;
    img {
      height: 200px;
      width: 100%;
    }
    .descripton {
      color: white;
      font-size: 16px;
      font-weight: 550;
      position: absolute;
      display: flex;
    }
    .custom-indicator {
      position: absolute;
      right: 5px;
      bottom: 5px;
      padding: 2px 5px;
      color: white;
      font-size: 14px;
      font-weight: 550;
      span {
        font-size: 18px;
        margin-right: 2px;
      }
    }
  }
  .creator-box {
    justify-content: space-between;
    .creator {
      justify-content: space-between;
      img {
        height: 30px;
        width: 30px;
        border-radius: 50%;
      }
      span {
        bottom: 0;
        display: flex;
      }
    }
    .organization {
      // display: flex;
      margin-left: 0;
      img {
        height: 30px;
        width: 30px;
        border-radius: 50%;
      }
      span {
        bottom: 0;
        display: flex;
      }
    }
    .orig-material {
      margin-left: 0;
      img {
        height: 30px;
        width: 30px;
        border-radius: 50%;
      }
      span {
        bottom: 0;
        display: flex;
      }
    }
    .activity {
      img {
        height: 30px;
        width: 30px;
        border-radius: 50%;
      }
      span {
        bottom: 0;
        display: flex;
      }
    }
  }
}
</style>