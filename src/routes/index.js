import { createRouter, createWebHashHistory } from 'vue-router'
import Home from './Home'
import Movie from './Movie'
import About from './About'
import NotFound from './NotFound'

export default createRouter({
    //Hash
    // https://google.com/#/search    해쉬모드는 #/ 붙여서 해당하는 페이지로 접근하는 모드 
                                    //사용하는 이유는 페이지를 새로고침했을때 페이지를 찾을 수 없다는 메시지를 방지할 수 있다.
    history: createWebHashHistory(),

    scrollBehavior() {
        return { top: 0}
    },

    // pages를 구분해주는 것 (routes)
    // https://google.com/
    routes: [
        {
            path: '/',  //페이지를 구분해주는 각각의 경로   '/'은 메인페이지로 이동
            component: Home
        },
        {
            path: '/movie/:id',
            component: Movie
        },
        {
            path: '/about',
            component: About
        },
        {
            path: '/:notFound(.*)',
            component: NotFound
        }
    ]
})

