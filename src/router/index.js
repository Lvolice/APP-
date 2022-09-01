import { createRouter, createWebHistory } from "vue-router";
// 路由加载
// import HelloWorld from '../components/HelloWorld.vue'
const router = createRouter({
    history: createWebHistory(),
    routes: [
        //路由加载形式
        // {
        //     path: '/HelloWorld',
        //     name: 'HelloWorld',
        //     component: () => import('@/components/HelloWorld.vue')
        // },

        // 路由懒加载
        // {
        //     path: '/HelloWorld',
        //     name: 'HelloWorld',
        //     // 路由加载 这种方式一定会加载页面
        //     component: () => HelloWorld

        // },

        {
            path: '/',  //path:'/' /表示根目录
            name: 'Main', //取名字尽量和 vue
            //重定向 : '给一个想要去的路径' 
            // 意思是可以在加载'/'，目录时可以直接访问home页面
            redirect: 'home',
            component: () => import('../views/Main.vue'),
            children: [
                {
                    path: 'home',  //path:''就是你想要页面展示得路径
                    name: 'Home', //取名字尽量和 uve
                    // 路由懒加载
                    // 这种方式加载页面只有需要后才会加载。这样会增加用户访问等待时间很多
                    component: () => import('../views/Home.vue'),
                    children: [
                        {
                            path: '/recommend',  //path:''就是你想要页面展示得路径
                            name: 'Recommend', //取名字尽量和 uve
                            component: () => import('../views/homeView/Recommend.vue')
                        },
                        {
                            path: '/game',  //path:''就是你想要页面展示得路径
                            name: 'Game', //取名字尽量和 uve
                            component: () => import('../views/Game.vue')
                        },
                        {
                            path: '/genshin',  //path:''就是你想要页面展示得路径
                            name: 'GenShin', //取名字尽量和 uve
                            component: () => import('../views/GenShin.vue')
                        },

                    ]
                },
                {
                    path: 'my',  //path:''就是你想要页面展示得路径
                    name: 'My', //取名字尽量和 uve
                    component: () => import('../views/My.vue')
                },
                {
                    path: 'choiceness',  //path:''就是你想要页面展示得路径
                    name: 'Choiceness', //取名字尽量和 uve
                    component: () => import('../views/homeView/Choiceness.vue')
                },
                {
                    path: 'search',  //path:''就是你想要页面展示得路径
                    name: 'Search', //取名字尽量和 uve
                    component: () => import('../views/Search.vue')
                },
                {
                    path: 'takenotes',  //path:''就是你想要页面展示得路径
                    name: 'TakeNotes', //取名字尽量和 uve
                    component: () => import('../views/TakeNotes.vue')
                },
                {
                    path: 'videoplayback',  //path:''就是你想要页面展示得路径
                    name: 'Videoplayback', //取名字尽量和 uve
                    component: () => import('../views/Videoplayback.vue')
                },
            ],
        },
        {
            path: '/videoplayer',  //path:''就是你想要页面展示得路径
            name: 'VideoPlayer', //取名字尽量和 uve
            component: () => import('../views/VideoPlayer.vue')
        },
        {
            path: '/detail',  //path:''就是你想要页面展示得路径
            name: 'Detail', //取名字尽量和 uve
            component: () => import('../views/Detail.vue')
        },
        {
            path: '/searchcomment',  //path:''就是你想要页面展示得路径
            name: 'SearchComment', //取名字尽量和 uve
            component: () => import('../views/SearchComment.vue')
        },
    ],
})

export default router;