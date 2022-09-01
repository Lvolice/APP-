<template>
  <div class="detail" v-if="detailContent.title">
    <!-- 手记里面的信息 -->
    <!-- 头部 导航栏 开始 -->
    <div class="nav">
      <van-nav-bar fixed>
        <template #left>
          <van-icon name="arrow-left" size="18" @click="goBack" />
          <img
            v-for="(item, index) in detailContent.user.user_groups"
            :key="index.id"
            :src="detailContent.user.avatar"
            alt=""
          />
          <span>{{ detailContent.user.occupation }}</span>
          <span>{{ detailContent.user.username }}</span>
        </template>
      </van-nav-bar>
    </div>

    <!-- 头部导航栏结束 -->
    <!-- 图像遍历 -->
    <div class="content">
      <div class="img-box">
        <img
          v-for="(item, index) in detailContent.images"
          :key="index.id"
          :src="item"
          alt=""
        />
      </div>
    </div>
    <!-- 文章部分 -->
    <div class="detail-title-content">
      <div class="title">
        <h1>{{ detailContent.title }}</h1>
      </div>
      <div class="content">
        <p>
          {{ detailContent.content }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { useRoute, useRouter } from "vue-router";
import { onMounted, reactive, toRefs } from "vue";
import axios from "axios";

export default {
  setup() {
    const Route = useRoute();
    const Router = useRouter();
    const data = reactive({
      detailContent: {},
    });

    const getDetailData = (id) => {
      let detailContent = JSON.parse(localStorage.getItem("detailContent"));
      if (detailContent) {
        data.detailContent = detailContent;
        console.log("data.detailContent", data.detailContent);
      }
      axios({
        method: "get",
        url: `https://apis.netstart.cn/xpc/note/${id}`,
      })
        .then((res) => {
          //   console.log("res", res);
          data.detailContent = res.data.data;
          localStorage.setItem("detailContent", JSON.stringify(res.data.data));
        })
        .catch((err) => {
          console.log("err", err);
        });
    };

    const goBack = () => {
      // 返回上一页
      Router.go(-1);
    };
    onMounted(() => {
      console.log(Route.query);
      getDetailData(Route.query.id);
    });
    return {
      ...toRefs(data),
      goBack,
    };
  },
};
</script>

<style lang="less" scoped>
.detail {
  // position: relative;
  .nav {
    .van-nav-bar__left {
      img {
        width: 30px;
        height: 30px;
        border-radius: 50%;
        margin-left: 15px;
        margin-right: 10px;
      }
    }
    /deep/ .van-icon {
      color: black;
    }
  }
  .img-box {
    margin-top: 50px;
    img {
      width: 32%;
      height: 110px;
      float: left;
      margin-right: 5px;
      margin-top: 10px;
    }
    img:nth-child(3n) {
      margin-right: 0;
    }
  }
  .content {
    padding: 0 10px;
  }
  // 文章内容部分
  .detail-title-content {
    .title {
      float: left;
      word-wrap: wrap;
      padding: 0 18px;
      // margin-left: 15px;
      // margin-top: 10px;
      h1 {
        font-size: 16px;
        font-weight: 550;
      }
    }
    .content {
      float: left;
      margin-top: 15px;
      margin-right: 10px;
      margin-left: 5px;
      p {
        font-size: 10px;
        margin-left: 15px;
      }
    }
  }
}
</style>