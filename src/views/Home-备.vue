<template>
  <!-- 这里是写网页得地方 -->
  <div class="home">
    <!-- 双大括号 -->
    {{name}}
    {{age}}
    {{sex}}

    <!-- 绑定一个点击事件  @click表示点击事件-->
    <div @click="changeName">我去输出值</div>

    <!-- 
      判断语句 v-if  v-show v-if和v-show的区别
      v-if就是讲整个删除或者是重新渲染
      v-show 就是把元素通过display：none;和block  控制显示和隐藏

      什么时候使用v-if，什么时候使用v-show ：切换频率高的时候使用v-show，使用频率低的时候使用v-if
     -->

     <div v-if="bol"> 我被控制显示和隐藏 </div>
     <div v-show="bol"> 我被控制显示和隐藏 </div>
     <!--  -->
  </div>

  <!-- vue2的写法 根标签   包住所有的标签 -->
  <!-- vue3的写法 没有限制 -->
</template>

<script>
// reactive表示用来进行数据关联   toRefs简化数据输出时的代码量
import { reactive,toRefs,onMounted} from 'vue';
// 这里是写js逻辑得地方
export default {
  setup() {
    // 模板语法  还有变量 需要导入 reactive想要页面的值和变量挂钩 如果我变量变化的时候 我页面的值也会跟着改变
    //就是我后续 的变量名字 不能和data一样 常量
    const data = reactive({
      name:'靓仔',
      age:18,
      sex:'不明',
      bol : false,
    })

    // 箭头函数
    const changeName = () =>{
      console.log(123)
      data.bol  = !data.bol//自己给自己取反
      // 修改data里面的值   const中常量按理来说常量值不能修改，但是使用对象里的属性 （数组索引）可以修改
      data.name = '靓女'
      // 修改之后也会相应的改变上面data.name输出时的结果
    }

    // 生命周期
    onMounted(()=>{
      console.log('当页面渲染后我就去输出');
    })

    //把方法和变量抛出去
    return {
      //就跟打包一样全部拿出去，到时候挑的时候就直接从里面挑
      ...toRefs(data),
      changeName
      };
  }
};
</script>

<style lang="less" scoped>
// 这里事写样式得地方 scoped表示这里得样式只在该文件生效 不会对别的文件造成影响
</style>