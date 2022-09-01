<template>
    <div class= "game">
        <div class="rival">
                <div class="heros" v-for="(item,index) in rival" :key="index">
                        <img :src="item.img" alt="">
                        <div>{{item.name}}</div>
                </div>
        </div>
        <div class="vs"><span>vs</span></div>
        <div class="friend">
                <div class="heros" v-for="(item,index) in friend" :key="index">
                        <img :src="item.img" alt="">
                        <div>{{item.name}}</div>
                </div>
        </div>
        
    </div>
</template>

<script>
import { onMounted, reactive, toRefs } from "vue";
export default {
    setup () {
    const contest = reactive({
        rival:[{
            name:'优菈',
            img:'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fi0.hdslb.com%2Fbfs%2Farticle%2Fcf98bf70fd18a9407dde390a22953c8f1a580621.png&refer=http%3A%2F%2Fi0.hdslb.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1663339966&t=ce8bc6e3d0b0922bbb67510f25b02bed'
            },
            {
            name:'芭芭拉',
            img:'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fi0.hdslb.com%2Fbfs%2Farticle%2F9bceab2daa300b62da0ec7af74f763d82272d267.jpg&refer=http%3A%2F%2Fi0.hdslb.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1663340166&t=e6d52695e17ceb915593a7e420d0dadd'
            },
            {
            name:'可莉',
            img:'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.siemens-home.cn%2Fuploadimg%2Fimage%2F20201021%2F20201021114405_72302.png&refer=http%3A%2F%2Fimg.siemens-home.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1663340232&t=f4b4c760c8376e1be27f9a20f8eec35d',
            },
            {
            name:'阿贝多',
            img:'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fnimg.ws.126.net%2F%3Furl%3Dhttp%253A%252F%252Fdingyue.ws.126.net%252F2021%252F0522%252F4a704907p00qtiijh00vlc000s700jdm.png%26thumbnail%3D650x2147483647%26quality%3D80%26type%3Djpg&refer=http%3A%2F%2Fnimg.ws.126.net&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1663340284&t=3042d6f1d52ecba1aaf8bf7e190b9f48'
            },
            {
            name:'砂糖',
            img:'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fi0.hdslb.com%2Fbfs%2Farticle%2F4cd4d6ad235e409a16e540a32678875045c4a640.jpg&refer=http%3A%2F%2Fi0.hdslb.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1663340549&t=5ef84e78af58d272248d3a899e14b779'
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
.content{
    height: 500px;

}
.game{
    .rival .friend{
        width: 100%;
        height: 100%;
    }
    .vs{
        width: 100%;
        height: 50px;
        text-align: center;
    }
    img{
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
    .heros{
        width: 19%;
        height: 250px;
        display: inline-block;
        position: relative;
        div{
            position:absolute;
            text-align: center;
            top: 229px;
            left: 11px;
            color: red;
            font-size: 12px;
        }
    }
}


</style>