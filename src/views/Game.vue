<template>
  <div class="game">
    <div class="rival">
      <div class="heros" v-for="(item,index) in rival" :key="index">
        <img :src="item.img" alt />
        <div>{{item.name}}</div>
      </div>
    </div>
    <div class="vs">
      <span>vs</span>
    </div>
    <div class="friend">
      <div class="heros" v-for="(item,index) in friend" :key="index">
        <img :src="item.img" alt />
        <div>{{item.name}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs } from "vue";
export default {
    setup () {
    const contest = reactive({
        rival:[{
            name:'王昭君',
            img:'https://img2.baidu.com/it/u=3783693909,3720787376&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500'
            },
            {
            name:'瑶',
            img:'https://img2.baidu.com/it/u=854850161,2773636471&fm=253&app=120&size=w931&n=0&f=JPEG&fmt=auto?sec=1660928400&t=3bc7b6c36275e033e740cacd4d57ae1a'
            },
            {
            name:'小乔',
            img:'https://img0.baidu.com/it/u=925134462,1589919354&fm=253&fmt=auto&app=138&f=JPG?w=500&h=288',
            },
            {
            name:'澜',
            img:'https://img2.baidu.com/it/u=4119412323,2945349218&fm=253&fmt=auto&app=138&f=JPEG?w=889&h=500'
            },
            {
            name:'马可波罗',
            img:'https://img1.baidu.com/it/u=1655158657,1553641513&fm=253&fmt=auto&app=138&f=JPEG?w=600&h=305'
            },
            {
            name:'王昭君',
            img:'https://img2.baidu.com/it/u=3783693909,3720787376&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500'
            },
            {
            name:'瑶',
            img:'https://img2.baidu.com/it/u=854850161,2773636471&fm=253&app=120&size=w931&n=0&f=JPEG&fmt=auto?sec=1660928400&t=3bc7b6c36275e033e740cacd4d57ae1a'
            },
            {
            name:'小乔',
            img:'https://img0.baidu.com/it/u=925134462,1589919354&fm=253&fmt=auto&app=138&f=JPG?w=500&h=288',
            },
            {
            name:'澜',
            img:'https://img2.baidu.com/it/u=4119412323,2945349218&fm=253&fmt=auto&app=138&f=JPEG?w=889&h=500'
            },
            {
            name:'马可波罗',
            img:'https://img1.baidu.com/it/u=1655158657,1553641513&fm=253&fmt=auto&app=138&f=JPEG?w=600&h=305'
            },
    ],
})  
           
    
       
       
        
    
    
        return {
            ...toRefs(contest)
        }
    }
}
</script>

<style lang="less" scoped>
.content {
  height: 500px;
}
.game {
  .rival .friend {
    width: 100%;
    height: 100%;
  }
  .vs {
    width: 100%;
    height: 50px;
    text-align: center;
  }
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .heros {
    width: 19%;
    height: 250px;
    display: inline-block;
    //允许换行
    flex-wrap: wrap;
    position: relative;
    div {
      position: absolute;
      text-align: center;
      top: 229px;
      left: 11px;
      color: red;
      font-size: 12px;
    }
  }
}
</style>