<template>
  <div class="home">
    <div class = "tab">
      <div class="fix-top">

      </div>
      <van-tabs swipeable @click-tab="changeWeb()"  v-model:active="active">
        <!-- <van-tab title="标签 1">内容 1</van-tab>
        <van-tab title="标签 2">内容 4</van-tab> -->
        
        <van-tab :title='item.title'  v-for="(item,index) in tabDate" :key="index"></van-tab>
        

        
        
      </van-tabs>
      
    </div>
    <!-- 这里显示上面切换页面的内容 -->
        <div class="content">
          <router-view></router-view>
        </div>
    <!-- v-for 循环 -->
    <!-- item表示数组的每一个值 index表示数组的下标(索引) key表示标识符 -->
    <!-- 如果这个渲染涉及到删除的时候 不要用index作为key值 -->
    <!-- <div v-for="(item,index) in obj" :key="index">
      {{item.name}}索引{{index}}
    </div> -->

  </div>
</template>

<script>
import axios from "axios";
import { onMounted, reactive, toRefs } from "vue";
import{useRouter} from 'vue-router'
export default {
  setup() {

    const Router = useRouter();
    const data = reactive({
      tabDate: [],
      active: 0,
      allUrl:[
        '',
        '/recommend',
        '/Choiceness',
      ]
      // obj: [{name:'小明',age:12,}, {name:'小红',age:12,}, {name:'小白',age:12,}, {name:'小黑',age:12,}]
    });

    //请求获取
    const getTab = () => {
      //这里面事判断是否存在 缓存 如果没有缓存的时候才去请求
      let locDate = JSON.parse(localStorage.getItem("resData"));
      console.log(locDate);

      //拦截 如果存在我就阻止请求
      if (locDate) {
        //在这里赋值
        data.tabDate = locDate.tab.slice(1);
        return;
      }

      axios({
        method: "get", //方式有两钟  get post
        url: "https://apis.netstart.cn/xpc/home/config" //请求的路径
      })
        .then((res) => {
          //获取数据成功执行的代码
          console.log("res", res);
          // 存储数据到本地
          data.tabDate = res.data.data;
          localStorage.setItem("resData", JSON.stringify(res.data.data));
        })
        .catch((err) => {
          //获取数据失败执行的代码
        });
    };

    //跳转的路径
    const changeWeb= () =>{
      console.log(data.active);
      Router.push({path:data.allUrl[data.active]})
    };


    //生命周期 onMounted
    onMounted(() => {
      //调用得到tab的数据
      getTab();
    });

    return {
      ...toRefs(data),
      changeWeb,
    };
  }
};
</script>

<style lang="less" scoped>
.home {
  // .tab{
  //   padding-bottom: 50px;

  // }
  .fix-top {
    position: fixed;
    top: 0;
    // 控制层级
    z-index: 999999999;
  }
}
</style>