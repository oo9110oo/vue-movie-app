import { createStore } from 'vuex'
import movie from './movie'
import about from './about'

export default createStore({
    modules: {  // movie, about 데이터의 타입들이 모듈에 연결된다.
        movie,
        about
    }
})