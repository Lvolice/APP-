<template>
  <div class="take-notes">
    <div class="notes-title">
      <div class="title">手记</div>
      <div class="icon">
        <span>
          <van-icon name="records" size="20px" color="#d65244" />
          写一条
        </span>
      </div>
    </div>
    <div class="hanlder-bottom">
      <div
        class="notes-content"
        v-for="item in list"
        :key="item.id"
        @click="toDetail(item.id)"
      >
        <div class="send-info">
          <div class="info-left">
            <img :src="item.user.avatar" alt />
            <div class="username-time">
              <div class="username">{{ item.user.username }}</div>
              <div class="time">{{ item.addtime }}</div>
            </div>
          </div>
          <div class="info-right">
            <span> <i>+</i>关注 </span>
            <van-icon name="ellipsis" size="20px" color="#9e9fa4" />
          </div>
        </div>
        <div class="send-content">
          <div class="send-title">{{ item.title }}</div>
          <div class="detail-content">
            <span v-for="value in item.topics" :key="value.id"
              >#{{ value.name }}</span
            >
            <div>{{ item.content }}</div>
          </div>
        </div>
        <div class="send-img">
          <img
            v-for="(imgs, index) in item.images"
            :key="index"
            :src="imgs"
            alt
          />
        </div>
        <div class="like-msg-share">
          <div class="like">
            <van-icon name="good-job-o" size="20px" />
            <span>{{ hanlderCount(item.count.count_liked) }}</span>
          </div>
          <div class="msg">
            <van-icon name="comment-o" size="20px" />
            <span>{{ hanlderCount(item.count.count_commented) }}</span>
          </div>
          <div class="share">
            <van-icon name="share-o" size="20px" />
            <span>分享</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, reactive, toRefs } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
//import { time } from 'console';
export default {
  setup() {
    const Router = useRouter();
    const data = reactive({
      list: [],
    });
    const getList = () => {
      //加载拦截
      let list = JSON.parse(localStorage.getItem("list"));
      if (list) {
        data.list = list;
        console.log("data.list", data.list);
        return;
      }

      axios({
        method: "get",
        url: "https://apis.netstart.cn/xpc/notes",
      })
        .then((res) => {
          console.log("res", res);
          //加载圈圈取消
          data.list = res.data.data.list.map((item) => {
            if (item.images) {
              item.images = item.images.slice(0, 3);
            }
            return item;
          });
          localStorage.setItem("list", JSON.stringify(data.list));
        })
        .catch((err) => {
          console.log(err);
        });
    };
    const sendTime = (time) => {
      let date = parseInt(new Date().getTime() / 1000);
      console.log(date);

      let distance = date - time;

      let day = parseInt(distance / (24 * 3600));

      let hoursSeconds = distance % (24 * 3600);

      let hours = parseInt(hoursSeconds / 3600);
      if (day > 0) {
        return day + "天前";
      } else if (hours > 0) {
        return hours + "小时前";
      } else {
        return "刚刚";
      }

      console.log(day, hours);
    };

    sendTime(1661397599);
    //转化次数
    const hanlderCount = (count) => {
      //如果播放次数过 w 做一个判断
      if (count >= 10000) {
        return (count / 10000).toFixed(1) + "w";
        //保留多少位小数 两种方式 toFixed（小数的为数）（会四舍五入）另一种方式自己去写
        console.log((count / 10000).toFixed(1));
      } else if (count >= 1000) {
        //播放次数过k的时候做一个判断
        return (count / 1000).toFixed(1) + "k";
      } else {
        //播放次数小于一千  返回自己
        return count;
      }
    };
    // 跳转页面详情
    const toDetail = (id) => {
      console.log(id);
      Router.push({ path: "/detail", query: { id } });
    };
    onMounted(() => {
      getList();
    });

    return {
      ...toRefs(data),
      hanlderCount,
      sendTime,
      toDetail,
    };
  },
};
</script>

<style lang="less" scoped>
.take-notes {
  height: 100vh;
  overflow: scroll;
  background: #f3f4f6;
  .notes-title {
    position: relative;
    .title {
      font-size: 16px;
      font-weight: 550;
      background: white;
      height: 50px;
      line-height: 50px;
      text-align: center;
    }
    span {
      position: absolute;
      right: 15px;
      top: 10px;
      width: 65px;
      padding: 0 10px;
      height: 30px;
      background: #ffede7;
      border-radius: 20px;
      display: flex;
      align-items: center;
      justify-content: space-around;
      font-weight: 550;
      color: #cf6258;
    }
  }
  .hanlder-bottom {
    margin-bottom: 80px;
  }
  .notes-content {
    //height: 350px;
    background: white;
    margin-top: 15px;
    padding: 0 10px;
    .send-info {
      padding-top: 10px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .info-left {
        display: flex;
        align-items: center;
        img {
          width: 30px;
          height: 30px;
          border-radius: 50%;
          margin-right: 10px;
        }
        .username {
          font-weight: 550;
          font-size: 14px;
        }
        .time {
          color: #aeb3b7;
          margin-top: 3px;
        }
      }
      .info-right {
        align-items: center;
        display: flex;
        span {
          color: #d94f47;
          font-weight: 550;
          i {
            font-size: 16px;
            margin-right: 4px;
          }
        }
        /deep/ .van-icon {
          transform: rotateZ(90deg);
          margin-left: 10px;
        }
      }
    }
    .send-content {
      .send-title {
        margin-top: 10px;
        font-size: 16px;
        font-weight: 550;
      }
      .detail-content {
        font-size: 14px;
        color: #343a46;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
      }
      span {
        color: #4d8ae1;
        margin-top: 10px;
      }
      div {
        display: inline;
      }
    }
    .send-img {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      padding: 10px 0;
      border-bottom: 1px solid #8080801f;
      img {
        width: 32%;
        height: 120px;
        border-radius: 5px;
      }
    }
    .like-msg-share {
      display: flex;
      justify-content: space-around;
      height: 50px;
      align-items: center;
      color: #717880;
      font-size: 16px;
      div {
        display: flex;
        align-items: center;
      }
      span {
        margin-left: 5px;
      }
    }
  }
}
</style>