<template>
  <div class="video-player" v-if="videoData.video">
    <!-- 视频播放页面 放置播放器 视频文路径 -->

    <video
      :src="videoData.video.content.progressive[0].https_url"
      controls
    ></video>
    <!-- 简介和评论 -->
    <van-tabs v-model:active="active">
      <van-tab title="简介">
        <!-- 简介开始 -->
        <div class="introduction">
          <div class="introduction-title">{{ videoData.title }}</div>
          <!-- 播放次数和播放时间 -->
          <div class="movie-type-time">
            <span
              class="movie"
              v-for="(item, index) in videoData.categories"
              :key="index"
            >
              {{ item.category_name }}-{{ item.sub.category_name }}
            </span>
            <span class="type">{{
              hanlderCounter(videoData.author.userinfo.occupation)
            }}</span>
            <span class="time"
              >{{ getYear(videoData.publish_time) }}-{{
                getMonth(videoData.publish_time)
              }}</span
            >
            <span class="count">{{
              hanlderCounter(videoData.count.count_view)
            }}</span>
          </div>
          <div class="detail">{{ videoData.content }}</div>
          <!-- 点赞 收藏 分享 -->
          <div class="three-icon">
            <!-- 点赞 -->
            <div class="like">
              <van-icon name="good-job-o" size="26px" />
              <span>{{ hanlderCounter(videoData.count.count_like) }}</span>
            </div>
            <!-- 收藏 -->
            <div class="collect">
              <van-icon name="star-o" size="26px" />
              <span>{{ hanlderCounter(videoData.count.count_collect) }}</span>
            </div>
            <!-- 分享 -->
            <div class="share">
              <van-icon name="share-o" size="24px" />
              <span>{{ hanlderCounter(videoData.count.count_share) }}</span>
            </div>
          </div>
          <!-- 电影标签 -->
          <div class="tags">
            <span>创意</span>
            <span>混剪</span>
            <span>剧情短片</span>
            <span>武侠</span>
          </div>
          <!-- 创作者 -->
          <div class="creator-box" v-if="videoData.team.length > 0">
            <div class="creator-title">创作人</div>
            <div class="creator-big">
              <div class="v-scroll">
                <div
                  class="creator-info"
                  v-for="(item, index) in videoData.team"
                  :key="index"
                >
                  <div class="author-box">
                    <img src="item.userinfo.avatar" alt="" />
                  </div>
                  <div class="author-info">
                    <div class="username">{{ item.userinfo.username }}</div>
                    <div class="introduce">{{ item.role }}</div>
                  </div>
                  <div class="attention">关注</div>
                </div>
              </div>
            </div>
          </div>
          <!-- 创作者结束 -->

          <!-- 相似视频   开始-->
          <div class="same-content">
            <div class="same-title">相似视频</div>
            <div class="same-item" v-for="item in sameData" :key="item.id">
              <!-- 一左一右 -->
              <div class="same-left">
                <img :src="item.cover" alt="" />
                <span>{{ hanlderTime(item.duration) }}</span>
              </div>
              <div class="same-right">
                <div class="right-title">{{ item.title }}</div>
                <div class="right-bottom">
                  <div class="like-count">
                    <span
                      >播放量&nbsp;{{
                        hanlderCounter(item.count.count_view)
                      }}</span
                    >
                    <span
                      >喜欢&nbsp;{{
                        hanlderCounter(item.count.count_like)
                      }}</span
                    >
                  </div>
                  <div class="user-box">
                    <img :src="item.author.userinfo.avatar" alt="" />
                    <span class="username-info">{{
                      item.author.userinfo.username
                    }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- 相似视频结束 -->
        </div>

        <!-- 简介结束 -->
      </van-tab>
      <!-- 评论开始 -->
      <van-tab title="评论" :badge="commentsData.length">
        <!-- 评论开始 -->
        <div class="comments-item" v-for="item in commentsData" :key="item.id">
          <!-- 作者评论相关信息 -->
          <div class="comments-author">
            <!-- 左边盒子 -->
            <div class="comments-left">
              <img :src="item.userInfo.avatar" alt="" />
            </div>
            <!-- 右边盒子 -->
            <div class="comments-right">
              <div class="comments-username">
                <div class="username">{{ item.userInfo.username }}</div>
                <van-icon name="ellipsis" color="#989898" size="18px " />
              </div>
              <div class="comments-content">{{ item.content }}</div>
              <div class="comments-time-address">
                <div class="time-left">
                  <span>{{ getMonth(item.addtime) }}</span>
                  <span>{{ item.ip_location }}</span>
                </div>
                <div class="time-right">
                  <van-icon class="msg" name="comment-o" size="16px" />
                  <van-icon name="good-job-o" size="16px" />
                  {{ item.userInfo.count.count_liked }}
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- 评论结束 -->
      </van-tab>
      <div class="search">
        <van-search v-model="value" left-icon="none" placeholder="我有话要说" />
      </div>
    </van-tabs>
  </div>
</template>

<script>
import { onMounted, reactive, toRefs } from "vue";
import { useRoute } from "vue-router";
import axios from "axios";
import { Toast } from "vant";
export default {
  setup() {
    const Route = useRoute();
    const data = reactive({
      // 存放请求过来的视频数据
      videoData: {},
      sameData: [],
      commentsData: [],
    });
    // 请求视频的数据
    const getVideo = (id) => {
      // console.log("我是请求数据的id", id);
      // // 本地存储
      // let info = JSON.parse(localStorage.getItem("info"));
      // if (info) {
      //   // console.data = info
      //   data.videoData = info;
      //   return;
      // }
      Toast.loading({
        message: "加载中...",
        forbidClick: true,
        duration: 0, //持续加载转圈
      });

      axios({
        method: "get",
        // url:'https://apis.netstart.cn/xpc/article/'+id, 两种写法
        url: `https://apis.netstart.cn/xpc/article/${id}`,
      })
        .then((res) => {
          console.log("res", res);
          data.videoData = res.data.data;
          Toast.clear(); //出现数据时同时清空加载转圈效果
          // localStorage.setItem("info", JSON.stringify(res.data.data));
        })
        .catch((err) => {
          console.log(err);
          // 失败提示
          Toast.fail("加载失败"); //加载失败同时提示用户 与情况加载圈
        });
    };
    // 请求动态数据
    const getSame = (id) => {
      // let sameData = JSON.parse(localStorage.getItem("sameData"));
      // if (sameData) {
      //   data.sameData = sameData;
      //   console.log("相关数据", data.sameData);
      //   return;
      // }
      axios({
        method: "get",
        url: `https://apis.netstart.cn/xpc/article/${id}/next`,
      })
        .then((res) => {
          data.sameData = res.data.data.list;
          localStorage.setItem("sameData", JSON.stringify(res.data.data.list));
          console.log("相关数据", res);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    // 请求视频评论数据
    const getComments = (id) => {
      let commentsData = JSON.parse(localStorage.getItem("commentsData"));
      if (commentsData) {
        data.commentsData = commentsData;
        console.log("评论数据", data.commentsData);
        return;
      }
      axios({
        method: "get",
        url: `https://apis.netstart.cn/xpc/comments?resource_id=${id}`,
      })
        .then((res) => {
          data.commentsData = res.data.data.list;
          localStorage.setItem(
            "commentsData",
            JSON.stringify(res.data.data.list)
          );
          console.log("评论数据", res);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    //转化播放次数
    const hanlderCounter = (count) => {
      //如果播放次数过w 做判断
      if (count >= 10000) {
        return (count / 10000).toFixed(2) + "w";
        //保留多上小数 两种方式 toFixed(小数位数)会四舍五入 另一种要自己写
        console.log((count / 10000).toFixed(2));
      } else if (count >= 1000) {
        //如果播放次数过k 做判断
        return (count / 1000).toFixed(2) + "k";
      } else {
        //小于一千返回本身
        return count;
      }
    };
    //转化时间
    const hanlderTime = (time) => {
      //求分钟
      let minute = parseInt(time / 60);
      //判断 minute 是否小于10
      //三目运算符 条件满足选第一个 不满足选第二个
      minute = minute < 10 ? "0" + minute : minute;
      //求秒 260%60 取余
      let second = parseInt(time % 60);
      second = second < 10 ? "0" + second : second;
      //引号 单包双 或 双包单
      return minute + "'" + second + '"';
    };
    // 转化年月日
    const getYear = (time) => {
      const date = new Date(time + 1000);
      console.log(Date);
      return (
        date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate()
      );
    };
    const getMonth = (time) => {
      const date = new Date(time * 1000);
      let month = date.getMonth() + 1;
      month = month < 10 ? "0" + month : month;
      let day = date.getMonth();
      day = day < 10 ? "0" + day : day;
    };

    onMounted(() => {
      console.log("Route", Route);
      // 获取传递过来的id
      let id = Route.query.id;
      getVideo(id);
      getSame(id);
      getComments(id);
    });

    return {
      ...toRefs(data),
      hanlderCounter,
      hanlderTime,
      getYear,
      getMonth,
    };
  },
};
</script>

<style lang="less" scoped>
// 视频播放页面 样式 开始
.video-player {
  video {
    width: 100%;
    height: 200px;
  }
  /deep/ .van-tabs__wrap {
    border-bottom: 1px solid #8080807d;
  }
  /deep/ .van-tabs--active {
    font-size: 700;
    font-weight: 16px;
  }
  .introduction {
    padding: 10px;
    .introduction-title {
      font-size: 17px;
      font-weight: 550;
      // 字体左右之间的间隙
      letter-spacing: 2px;
      margin-top: 30px;
    }
    .movie-type-time {
      // 记住 子盒子没有设置颜色和字体大小的时候 会从父盒子那里继承
      color: #a8a8a8;
      font-size: 14px;
      margin: 10px 0;
      span {
        margin-right: 15px;
      }
    }
    .detail {
      color: #5e5e5e;
      font-size: 15px;
      letter-spacing: 1px;
      word-break: break-all; //在恰当的断字点进行换行
      overflow: hidden; //文字超出的进行隐藏
      text-overflow: ellipsis; //超出的文字用省略号表示
      display: -webkit-box; //将元素设为盒子伸缩模型显示
      text-overflow: ellipsis; //利用盒子模型
      -webkit-box-orient: vertical; //伸缩方向设为垂直方向
      -webkit-line-clamp: 3; //设定一共3行，超出的部分隐藏，并用省略号来表示
    }
    .three-icon {
      display: flex;
      justify-content: space-between;
      font-weight: 550;
      margin-top: 15px;
      .van-icon {
        font-weight: 600;
      }
      span {
        display: block;
        text-align: center;
        margin-top: 5px;
        font-size: 14px;
      }
    }
    .tags {
      border-top: 1px solid #80808040;
      border-bottom: 1px solid #80808040;
      span {
        background: #f7f7f7;
        color: #585858;
        padding: 8px 15px;
        border-radius: 5px;
        margin: 15px 0;
        text-align: center;
        display: inline-block;
      }
    }
    // 创作者开始
    .creator-box {
      width: 100%;
      overflow: scroll;
      .v-scroll {
        width: 1900px;
        display: flex;
      }
      .creator-title {
        font-weight: 600;
        font-size: 20px;
        letter-spacing: 2px;
        padding-top: 20px;
      }
      .creator-info {
        // width: 200px;
        margin-right: 15px;
        height: 50px;
        // background: pink;
        margin-top: 15px;
        display: flex;
        align-items: center;
        justify-content: space-around;

        width: 270px;
        padding: 10px;
        border-radius: 10px;
        box-shadow: 1px 1px 4px 0 grey;

        .username {
          font-size: 16px;
          font-weight: 550;
          letter-spacing: 2px;
        }
        .introduce {
          font-size: 13px;
          color: #b6b6b6;
          margin-top: 5px;
          width: 120px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .attention {
          color: #cf5c54;
          background: #fdeeeb;
          border-radius: 20px;
          height: 30px;
          line-height: 30px;
          width: 70px;
          text-align: center;
          font-weight: 550;
          font-size: 14px;
        }
      }
      img {
        width: 50px;
        height: 50px;
        border-radius: 50%;
      }
      // 创作者结束
    }
    // 相似视频开始
    .same-content {
      // display: flex;
      margin-top: 20px;
      .same-title {
        font-size: 16px;
        font-weight: 600;
        letter-spacing: 1px;
      }
      .same-item {
        height: 120px;
        // background: pink;
        margin: 15px 0;
        display: flex;
        border-bottom: 1px solid #8080802b;
        padding-bottom: 20px;
        .same-left {
          width: 175px;
          position: relative;
          margin-right: 10px;
          border-radius: 5px;
          overflow: hidden;

          img {
            // margin: 15px 5px;
            height: 120px;
            width: 175px;
          }
          span {
            position: absolute;
            right: 8px;
            bottom: 8px;
            color: white;
          }
        }
        .same-right {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 5px 0;
          flex: 1;

          .right-title {
            font-size: 14px;
            font-weight: 550;
          }
          .like-count {
            color: #adadad;
            font-size: 14px;
            margin-bottom: 8px;
            // span {
            //   margin: 0 8px;
            // }
          }
          .ueser-box {
            display: flex;
            align-items: center;
          }
          // display: flex;
          img {
            width: 30px;
            height: 30px;
            border-radius: 50%;
            margin-right: 10px;
          }
        }
      }
    }
    // 相似视频结束
  }
  // 评论相关内容 开始
  .comments-item {
    padding: 10px;
    margin-bottom: 70px;
    .comments-author {
      display: flex;
      margin-top: 20px;
      img {
        width: 30px;
        height: 30px;
        border-radius: 50%;
      }
      .comments-left {
        margin-right: 15px;
      }
      .comments-username {
        display: flex;
        justify-content: space-between;
        .username {
          color: #949494;
          font-size: 13px;
        }
        .van-icon {
          // color: #989898;
          transform: rotateZ(90deg);
        }
      }
      .comments-content {
        font-size: 15px;
        font-weight: 550;
        margin: 5px 0 10px 0;

        word-break: break-all;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        text-overflow: ellipsis;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 3;
      }
      .comments-right {
        flex: 1;
        span {
          margin: 10px;
        }
      }
      .comments-time-address {
        display: flex;
        justify-content: space-between;
        color: #767676;
        border-bottom: 1px solid #9891913b;
        padding-bottom: 10px;
        .time-right {
          span {
            margin: 10px;
          }
        }
        .msg {
          margin-right: 18px;
        }
      }
    }
  }
  .search {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;

    /deep/ .van-search_field {
      background: #f0f0f0;
    }
    /deep/ .van-search__content {
      background: #f0f0f0;
    }
  }
}
</style>