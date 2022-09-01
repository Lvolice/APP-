<template>
  <div class="recommend">
    <!-- 推荐 -->

    <div class="banner">
      <van-swipe class="my-swipe" :autoplay="1000" indicator-color="white">
        <van-swipe-item v-for="(item, index) in banner.children" :key="index">
          <img :src="item.model.cover" alt="" />

          <!--放置描述的-->

          <div class="description">{{ item.model.title }}</div>
        </van-swipe-item>

        <!--<van-swipe-item>2</van-swipe-item>
    
      <van-swipe-item>3</van-swipe-item>
    
      <van-swipe-item>4</van-swipe-item>-->

        <div class="custom-indicator">
          <span>{{ active + 1 }}</span>

          / {{ total }}
        </div>
      </van-swipe>
    </div>

    <div class="remain">
      <div class="item-box" v-for="(item, index) in AllData" :key="index">
        <!--注意 v-for不能和v-if一起使用 优先级问题v-for的优先级比v-if高
          遍历一百个 y-if="false"要移除 这里做一个判断要小视频盒子或者是大视频
          v-if判断类型用不同的盒子-->
        <div
          class="uiMiddleCard"
          v-if="item.type == 'uiMiddleCard'"
          @click="toVideoPlayer(item.children[0].model.resource.id)"
        >
          <!--三个盒子-->
          <div class="cover">
            <van-image
              width="100%"
              height="100"
              lazy-load
              :src="item.children[0].model.resource.cover"
            />
            <!--播放的次数 点赞 视频时长-->
            <div class="count-good-time">
              <div class="count-left">
                <!--播放次数-->
                <span class="count">
                  <van-icon name="eye-o" size="16px" />
                  {{
                    hanlderCounter(
                      item.children[0].model.resource.count.count_view
                    )
                  }}
                </span>
                <span class="good">
                  <van-icon name="good-job-o" size="16px" />
                  {{
                    hanlderLike(
                      item.children[0].model.resource.count.count_like
                    )
                  }}
                </span>
              </div>
              <div class="time">
                {{ hanlderTime(item.children[0].model.resource.duration) }}
              </div>
            </div>
          </div>
          <!--标题-->
          <div class="title">{{ item.children[0].model.resource.title }}</div>
          <!--电影类型-->
          <div class="movie-type">
            <span class="author">
              {{ item.children[0].model.resource.author.userinfo.username }}
            </span>
            <!--引用别的图片-->
            <van-icon name="more" size="16px" />
          </div>
        </div>
        <!--宽度是沾满的盒子-->
        <div class="uiBigCardTop" v-if="item.type == 'uiBigCardTop'">
          <div class="bg-count-comment">
            <img :src="item.children[0].model.resource.cover" alt="" />

            <div class="count-comment-view">
              <!-- 这里手动打空格  无论多少个  他都是算作一个 &nbsp;  &牛逼 s p-->
              <span>
                {{
                  hanlderCounter(
                    item.children[0].model.resource.count.count_comment
                  )
                }}
                评论&nbsp;&nbsp;|
              </span>
              <span>
                {{
                  hanlderCounter(
                    item.children[0].model.resource.count.count_view
                  )
                }}
                观看&nbsp;&nbsp;|
              </span>
              <span>
                {{ hanlderTime(item.children[0].model.resource.duration) }}
              </span>
            </div>
          </div>

          <!-- 大家都在看 眼睛的图片  还有文字 -->
          <div class="people-like">
            <van-icon name="eye-o" size="18px" />
            <span>大家都在看</span>
          </div>

          <!-- 标题  收藏 点赞开始 -->
          <div class="top-title-collect">
            <div class="title">
              {{ item.children[0].model.resource.title }}
            </div>
            <div class="right-box">
              <!-- 收藏 -->
              <div class="collect">
                <van-icon name="star-o" size="22px" color="#5c5c5c" />
                <span>
                  {{
                    hanlderCounter(
                      item.children[0].model.resource.count.count_collect
                    )
                  }}
                </span>
              </div>
              <!-- 点赞 -->
              <div class="good-job">
                <van-icon name="good-job-o" size="22px" color="#5c5c5c" />
                <span>
                  {{
                    hanlderCounter(
                      item.children[0].model.resource.count.count_like
                    )
                  }}
                </span>
              </div>
              <!-- 三个点 -->
              <div class="doint">
                <van-icon name="ellipsis" size="22px" color="#5c5c5c" />
              </div>
            </div>
          </div>
          <!-- 标题  收藏 点赞结束 -->

          <!-- 作者开始 -->
          <div class="author-box">
            <div class="author-img">
              <img
                :src="
                  'https://images.weserv.nl/?url=' +
                  item.children[0].model.resource.author.userinfo.avatar
                "
                alt=""
              />
              <!-- 这里面做一个金标的图 -->
              <!-- <img src="//lf3-cdn2-tos.bytescm.com/toutiao/toutiao_web_pc/svgs/auth_0.600aa73b.svg" alt=""> -->
            </div>
            <div class="author-usename">
              {{ item.children[0].model.resource.author.userinfo.username }}
            </div>
          </div>
          <!-- 作者结束 -->
        </div>

        <!-- 推广  广告 -->
        <div class="uiBigCard" v-if="item.type == 'uiBigCard'">
          <div class="uiBigCard-top">
            <!-- 一左一右盒子 -->
            <div class="author-photo">
              <img
                :src="item.children[0].model.resource.creator.avatar"
                alt=""
              />
              <span>{{
                item.children[0].model.resource.creator.username
              }}</span>
            </div>
            <van-icon name="ellipsis" size="22px" color="#5c5c5c" />
          </div>
          <!-- 标题 -->
          <div class="ad-title">
            <!-- 似乎都按时候ID杰卡斯圣诞节雷克萨就快来升级覅哦 -->
            {{ item.children[0].model.resource.title }}
          </div>
          <!-- 封面 和推广文字 -->
          <div class="face-box">
            <img :src="item.children[0].model.resource.cover" alt="" />
            <span class="promotion">推广</span>
          </div>
          <div class="check-box">立即查看</div>
        </div>
        <!-- 广告结束 -->

        <!-- 创作者 -->
        <div
          class="uiCollectionSlideOne"
          v-if="item.type == 'uiCollectionSlideOne'"
        >
          <!-- 标题 -->
          <div class="creator-mode">
            <h3 class="creator">推荐创作者</h3>
            <div class="mode">查看更多></div>
          </div>
          <!-- 10哥创作者 -->
          <div class="ten-creator">
            <div class="create-scroll">
              <div
                class="items-box"
                v-for="(value, index) in item.children"
                :key="index"
              >
                <!-- 头像 -->
                <div class="avator-box">
                  <img
                    class="avator"
                    :src="value.model.resource.avatar"
                    alt=""
                  />
                  <!-- 金标 -->
                  <img
                    class="gold"
                    src="https://lf3-cdn2-tos.bytescm.com/toutiao/toutiao_web_pc/svgs/auth_0.600aa73b.svg "
                    alt=""
                  />
                </div>

                <!-- 作者得到名字 -->
                <div class="author-img">
                  {{ value.model.resource.username }}
                </div>
                <!-- 作者的作品和粉丝 -->
                <div class="production-fans">
                  {{ value.model.resource.count.count_atticle }}
                </div>
                <div class="production-type">
                  {{ value.model.resource.occcupation }}
                </div>
                <div class="attention">关注</div>
              </div>
            </div>
          </div>
        </div>
        <!-- 创作者结束 -->
      </div>
    </div>
  </div>
</template>
<script>
import { onMounted, reactive, toRefs } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
export default {
  setup() {
    const Router = useRouter(); //跳转播放页面
    const data = reactive({
      AllData: [],
      banner: [],
      active: 0,
    });
    const getBanner = () => {
      let all = JSON.parse(localStorage.getItem("all"));

      console.log(all);
      //拦截  如果存在我就阻止请求
      if (all) {
        // 在这里赋值
        data.banner = all[0];
        data.AllData = all.slice(1);
        return; // 有终止后面代码的意思
      }

      axios({
        method: "get",
        url: "https://apis.netstart.cn/xpc/home/recommend",
      })
        .then((res) => {
          console.log("res", res);
          data.banner = res.data.data.children[0];
          data.AllData = res.data.data.children.slice(1);
          localStorage.setItem("all", JSON.stringify(res.data.data.children));
        })
        .catch((ess) => {
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
    const hanlderLike = (counts) => {
      //如果播放次数过w 做判断
      if (counts >= 10000) {
        return (counts / 10000).toFixed(2) + "w";
        //保留多上小数 两种方式 toFixed(小数位数)会四舍五入 另一种要自己写
        console.log((counts / 10000).toFixed(2));
      } else if (counts >= 1000) {
        //如果播放次数过k 做判断
        return (counts / 1000).toFixed(2) + "k";
      } else {
        //小于一千返回本身
        return counts;
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
    const toVideoPlayer = (id) => {
      console.log("id", id);
      // 跳转
      Router.push({
        path: "/VideoPlayer", //跳转的路径
        //id:id,es6的写法
        // query 和parmas区别: 前者参数刷新页面 还会存在 后者刷新页面参数就没有显示了
        query: {
          id,
        },
      });
    };

    onMounted(() => {
      // 调用的得到tab的数据
      getBanner();
      hanlderCounter();
      hanlderLike(0);
      hanlderTime();
    });
    return {
      ...toRefs(data),
      hanlderCounter,
      hanlderTime,
      hanlderLike,
      toVideoPlayer,
    };
  },
};
</script>

<style lang="less" scoped>
//层数尽量不超过第四层
.recommend {
  background: #f7f7f7;
  margin-top: 50px;
  .banner {
    overflow: hidden;
    margin: 10px;
    border-radius: 10px;
    img {
      width: 100%;
      height: 200px;
    }
    .description {
      color: white;
      font-size: 16px;
      font-weight: 600;
      position: absolute;
      bottom: 10px;
      left: 10px;
    }
    .custom-indicator {
      position: absolute;
      right: 5px;
      bottom: 5px;
      padding: 2px 5px;
      color: white;
      font-size: 14px;
      font-weight: 600;
      span {
        font-size: 18px;
        margin-right: 2px;
      }
    }
  }
  .remain {
    //弹性布局
    display: flex; //换行
    flex-wrap: wrap;
    padding: 10px;
    justify-content: space-between;
    margin-bottom: 60px;
    // .item-box{
    //   width: 150px;
    //   height: 200px;
    //   background: pink;
    // }
    .uiMiddleCard {
      width: calc(50vw - 15px);
      height: 200px;
      background: white;
      margin-top: 10px;
      border-radius: 6px;
      overflow: hidden;
      position: relative;
      .cover {
        position: relative;
        .count-good-time {
          position: absolute;
          bottom: 8px;
          width: 100%;
          height: 20px;
          display: flex;
          justify-content: space-between;
          padding: 0 10px;
          box-sizing: border-box;
          align-items: center;
          color: white;
        }
        .count {
          margin-right: 10px;
        }
        .time {
          height: 20px; //前提只有一行的时候
          line-height: 20px;
        }
      }
      .title {
        font-size: 14px;
        font-weight: 700;
        padding: 0 10px;
        margin-top: 10px;
        word-break: break-all;
        .div {
          width: 300px;
          height: auto;
          display: -webkit-box;
          overflow: hidden;
          /*超出隐藏*/
          text-overflow: ellipsis;
          /*隐藏后添加省略号*/
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 3; //想显示多少行
        }
      }
      .movie-type {
        position: absolute;
        bottom: 10px;
        width: 100%;
        padding: 0 10px;
        box-sizing: border-box;
        display: flex;
        justify-content: space-between;
        color: #a3a3a3;
        .van-icon {
          transform: rotateZ(90deg);
        }
      }
    }
    .uiBigCardTop {
      width: calc(100vw - 20px); // height: 350px;
      padding-bottom: 10px;
      background: white;
      margin-top: 10px;
      border-radius: 6px;
      margin-top: 10px;
      overflow: hidden;
      position: relative;
      .bg-count-comment {
        position: relative;
        img {
          width: calc(100vw - 20px); // 自适应
          height: auto;
        }
        .count-comment-view {
          position: absolute;
          bottom: 10px;
          color: white;
          right: 15px;
        }
        span {
          margin: 0 4px;
        }
      }
      .people-like {
        background: #fde1e0;
        width: 80px;
        padding: 3px 8px;
        border-radius: 10px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-top: 8px;
        margin-left: 15px; // 字体颜色
        color: #ed4737;
      }
      .top-title-collect {
        // 弹性布局
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-left: 15px;
        margin-top: 8px;
        .title {
          width: 230px;
          font-weight: 600;
          font-size: 15px;
          color: #303030;
        }
        .right-box {
          display: flex;
        }
        .collect,
        .good-job {
          position: relative;
          margin-right: 15px;
          span {
            position: absolute;
            right: -15px;
            top: -6px;
          }
        }
        .doint {
          .van-icon {
            transform: rotateZ(90deg);
          }
        }
      }
      .author-box {
        display: flex; // 根据轴垂直居中
        align-items: center;
        margin-top: 10px;
        margin-left: 15px;
        img {
          width: 30px;
          height: 30px; // 变成一个圆形
          border-radius: 50%;
        }
        .author-usename {
          margin-left: 10px;
        }
      }
    }
    // 广告样式
    .uiBigCard {
      margin-top: 10px;
      width: calc(100vw - 20px);
      // height: 350px;
      background: white;
      border-radius: 10px; // 超出隐藏
      overflow: hidden;
      .uiBigCard-top {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 10px;
      }
      .author-photo {
        display: flex;
        align-items: center;

        img {
          width: 35px;
          height: 35px;
          border-radius: 50%;
          margin-right: 10px;
        }
      }
      .van-icon {
        transform: rotateZ(90deg);
        // margin-right: 0;
      }
      ad-title {
        padding-left: 10px;
        font-size: 14px;
        font-weight: 550;
      }
      .face-box {
        position: relative;
        margin-top: 10px;
        img {
          width: 100%;
          height: auto;
        }
        .promotion {
          position: absolute;
          right: 10px;
          top: 10px;
          color: white;
          background-color: #c3c4c6;
          padding: 1px 4px;
        }
      }
      check-box {
        // position: absolute;
        color: #666;
        font-size: 14px;
        padding: 10px;
      }
    }
    // 广告结束

    // 创作者
    .uiCollectionSlideOne {
      width: calc(100vw - 20px);
      // height: 350px;
      // background: pink;
      padding: 15px 0;
      .creator-mode {
        display: flex;
        justify-content: space-between;
        height: 50px;
        // background: skyblue;s
        align-items: center;
        .creator {
          font-size: 18px;
          color: #242424;
        }
        .mode {
          color: #aaaa;
          margin-right: 20px;
          font-size: 14px;
        }
      }
      // 10个创作者
      .ten-creator {
        width: 100%;
        background-color: pink;
        // height: 150px;
        // 超出用滚动条
        overflow: scroll;
        margin-top: 15px;
        .create-scroll {
          width: 1900px;
        }
        .items-box {
          width: 150px;
          height: 200px;
          background: white;
          float: left;
          margin-right: 10px;
          border-radius: 10px;
          text-align: center;
          .avator-box {
            position: relative;
            width: 50px;
            margin: 10px auto;
          }

          .avator {
            width: 50px;
            height: 50px;
            border-radius: 50%;
            margin-left: 16px;
          }
          .gold {
            font-weight: 600;
            font-size: 16px;
            margin: 5px 0;
            padding: 0 10px;
          }
          .author-img {
            font-weight: 600;
            font-size: 16px;
            margin: 5px 0;
            padding: 0 10px;

            //单行省略号
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          .production-fans {
            color: #b6b6b6;
            margin-bottom: 2px;
          }
          .production-type {
            color: #b6b6b6;
          }
          .attention {
            color: white;
            background-color: red;
            width: 66px;
            height: 30px;
            border-radius: 14px;
            line-height: 30px;
            margin: 10px auto;
          }
        }
      }
    }
    // 创作者结束
  }
}
</style>
