import axios from 'axios'
import _uniqBy from 'lodash/uniqBy'

const _defaultMessage = 'Search for the movie title!'

export default {
    // namespaced: 'true',         //movie.js가 하나의 store에서 module화 되어서 사용이 될수 있다는 것을 명시적으로 나타내는 옵션  true로 하면
    //                             //index.js에 modules 부분에 사용할 수 있다.
    // state: () => {              //각각의 data들
    //     return {
    //         movies: []
    //     }
    // },                  
    // getters: {                  //state를 계산된 데이터를 만들어내는 방식 (computed)
    //     movieIds(state) {       // state 부분의 데이터를 특정하게 계산해서 새로운 데이터를 만들어 낼때 사용 () 매개변수로 state를 가지고 와야 한다.
    //         return state.movies.map(m => m.imdbID)
    //     }
    // },                
    // mutations: {                //methods와 비슷한 역할     state의 데이터를 변경할 수 있다.  (mutations에서만 데이터 변경 가능)
    //     resetMovies(state) {    // movies에 접근할 수 있는 매개변수를 넣어줘야 한다. (state)
    //         state.movies = []
    //     }
    // },              
    // actions: {                  //methods와 비슷한 역할
    //     searchMovies({ state, getters, commit}) { //비동기로 동작(처리)    commit는 mutations
            
    //     }  
    // }      
    namespaced: true,
    state: () => {
        return {
            movies: [],
            //message: 'Search for the movie title!',
            message: _defaultMessage,
            loading: false,
            theMoive: {}
        }
    },
    getters: {},
    mutations: {
        updateState(state, payload) {    //state는 state에 접근할 수 있는 매개변수,  payload는 특정 데이터를 받아서 갱신하도록 해준다
            // ['movies', 'message', 'loading']
            Object.keys(payload).forEach(key => {       //Object.keys() 는 객체 데이터의 속성의 이름들만 가지고 새로운 배열 데이터를 만들어준다.
                // state.movies = payload.movies       // == state['movies'] = payload['movies']
                // state.message = payload.message
                state[key] = payload[key]
            })         

        },
        resetMovies(state) {
            state.movies = []
            state.message = _defaultMessage
            state.loading = false
        }
    },
    actions: {                  // context : state, getters, mutations 활용할 수 있는 내용들이 있다.
        async searchMovies(context, payload) {          //payload : searchMovies가 실행될 때 인수로 들어오는 데이터들을 payload로 받을 수 있다.
            if(context.state.loading) {
                return 
            }            
            context.commit('updateState', {
                message: '',
                loading: true
            })
            try {
                 //const { title, type, number, year } = payload //구조분해    -> 아래 _fetchMovie에 payload를 정의해놓았기 때문에 이 부분은 사용할 필요가 없다.
                //const OMDB_API_KEY = '7035c60c'

                //const res = await axios.get(`https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${title}&type=${type}&y=${year}&page=1`)
                const res = await _fetchMovie({
                    ...payload,
                    page: 1
                })
                const { Search, totalResults } = res.data       // Search는 개발도구에서보면 검색했을 때 Search 변수에 값이 담겨져 온다.
                context.commit('updateState', {
                    movies: _uniqBy(Search, 'imdbID')
                    // message: 'Hello World',
                    // loading: true
                })
                console.log(totalResults)       // 총 검색된 갯수 268개  
                console.log(typeof totalResults)    // String 타입

                const total = parseInt(totalResults, 10)
                const pageLength = Math.ceil(total / 10)    //ceil -> 올림처리 메소드

                // 추가 요청 전송
                if ( pageLength > 1) {
                    for (let page = 2; page <= pageLength; page++) {
                        if (page > payload.number / 10 ) {
                            break
                        }
                        //const res = await axios.get(`https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${title}&type=${type}&y=${year}&page=${page}`)
                        const res = await _fetchMovie({
                            ...payload,
                            page: page
                        })
                        const { Search } = res.data
                        context.commit('updateState', {
                            movies: [
                                ...context.state.movies, 
                                ..._uniqBy(Search, 'imdbID')
                            ]
                        })
                    }
                }
            } catch (message) {
                context.commit('updateState', {
                    movies: [],
                    message: message
                })
            // } catch ({ message }) {
            //     context.commit('updateState', {
            //         movies: [],
            //         message: message
            //     })
            } finally {
                context.commit('updateState', {
                    loading: false
                })
            }
        },
        async searchMovieWithId({state, commit}, payload) {     // context를 보조 분해해서 {state, commit} 로 만들수 있다.
            if ( state.loading) return

            commit('updateState', {
                theMovie: {},
                loading: true
            })

            const { id } = payload
            try {
                const res = await _fetchMovie({
                    id: id
                })
                commit('updateState', {
                    theMovie: res.data      // 영화의 상세정보
                })
            } catch (error) {
                commit('updateState', {
                    theMovie: {}
                })
            } finally {
                commit('updateState', {
                    loading: false
                })
            }
        }
    }
}

function _fetchMovie(payload) {        //변수명 앞에 _ 을 붙이면 이 파일에서만 사용된다는 뜻을 가짐
    const { title, type, year, page, id } = payload
    const OMDB_API_KEY = '7035c60c'
    const url = id ? `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&i=${id}` : `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${title}&type=${type}&y=${year}&page=${page}`
    //const url = `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}`
    return new Promise((resolve, reject) => {
        axios.get(url)
        .then(res => {           
            if (res.data.Error) {   // 응답받은 내용이 정상응답인데 data부분에 Error이 있을 경우에 reject를 실행시키도록 한다.
                reject(res.data.Error)
            }
            resolve(res)
        })
        .catch((err) => {
            reject(err.message)
        })
    })
}

// async function _fetchMovie(payload) {
//   return await axios.post('/.netlify/functions/movie', payload)
// }