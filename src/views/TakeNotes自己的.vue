<!-- <template>
  <div class="take-notes">
    <!-- 头部固定的手记 开始 -->
    <div class="notes-title">
      <div class="title">手记</div>
      <div class="icon">
        <!-- 右侧的图文 -->
        <span>
          <van-icon name="records" size="20px" color="#d65244" />
          写一写</span
        >
      </div>
    </div>
    <!-- 头部固定的手记 开始 -->
    <!-- 手记内容开始 -->
    <div class="notes-content" v-for="item in list" :key="item.id">
      <div class="send-info">
        <!-- 左边图像信息 -->
        <div class="info-left">
          <img :src="item.user.avatar" alt="" />
          <div class="username-time">
            <div class="username">{{ item.user.username }}</div>
            <div class="time">{{ item.addtime }}</div>
          </div>
        </div>
        <!-- 右边盒子图像 -->
        <div class="info-right">
          <span>
            <i></i>
            关注
          </span>
          <van-icon name="ellipsis" size="20px" color="#9e9fa4" />
        </div>
      </div>
      <div class="send-content">
        <!-- 具体内容热点 -->
        <div class="send-title">{{ item.title }}</div>
        <div class="detail-content">
          <span v-for="value in item.topics" :key="value.id"
            >#{{ value.name }}</span
          >
          <p>{{ item.content }}</p>
        </div>
      </div>
      <div class="send-img">
        <img
          v-for="(imgs, index) in item.images"
          :key="index"
          :src="imgs"
          alt=""
        />
        <!-- <img src="" alt="" />
        <img src="" alt="" /> -->
      </div>
      <div class="like-msg-share">
        <div class="like">
          <van-icon name="good-job-o" size="20px" />
          6
        </div>
        <div class="msg">
          <van-icon name="comment-o" size="20px" />
          1
        </div>
        <div class="share">
          <van-icon name="share-o" size="20px" />
          分享
        </div>
      </div>
    </div>

    <!-- 手记内容结束 -->
  </div>
</template>

<script>
import { onMounted, reactive, toRefs } from "vue";
import axios from "axios";
export default {
  setup() {
    const data = reactive({
      list: [],
    });
    const getList = () => {
      let list = JSON.parse(localStorage.getItem("list"));
      if (list) {
        data.list = list;
        console.log("data.list", data.list);
        return;
      }
      // 加载中
      axios({
        method: "get",
        url: "https://apis.netstart.cn/xpc/notes",
      })
        .then((res) => {
          console.log("res", res);
          // 加载消失
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
    onMounted(() => {
      getList();
    });
    return {
      ...toRefs(data),
    };
  },
};
</script>

<style lang="less" scoped>
.take-notes {
  height: 100vh;
  background: #f3f4f6;
  .notes-title {
    position: relative;
    .title {
      font-size: 16px;
      font-weight: 550;
      background: #f3f4f6;
      height: 50px;
      line-height: 50px;
      text-align: center;
    }
    span {
      position: absolute;
      right: 0;
      top: 0;
      width: 65px;
      padding: 0 10px;
      height: 30px;
      background: #ffede7;
      border-radius: 20px;
      display: flex;
      align-content: space-around;
      font-weight: 550;
      color: #cf6258;
    }
  }

  .hanlder-bottom {
    margin-bottom: 80px;
  }
  // 手记内容 开始
  .send-info {
    padding-top: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .info-left {
      img {
        height: 30px;
        width: 30px;
        border-radius: 50%;
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
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 3;
    }
    span {
      color: #4d8ae1;
    }
    p {
      display: inline;
    }
  }
  .send-img {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    padding: 10px 0;
    border-bottom: 1px solid #8080804d;
    img {
      width: 32%;
      height: auto;
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
  }
  // div {
  //   display: flex;
  //   align-items: center;
  // }

  // span {
  //   margin-left: 5px;
  // }
}
</style> -->