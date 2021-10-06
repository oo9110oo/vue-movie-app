<template>
    <div class="container">
        <input class="form-control" v-model="title" type="text" placeholder="Search for Movies, Series & more" 
        @keyup.enter="apply" />

        <div class="selects">   <!--v-model을 통해 양반향 데이터 바인딩으로 연결해야하지만 배열 데이터를 통해서 각각의 select를 반복적으로 출력하고 있어서
                                    따로 v-model에 type나 number로 바로 접근할 수 없다  
                                    그래서 접근하는 방법은 $data 속성을 이용
                                    $data[filter.name] 로 동적으로 사용할 수 있게 한다.  속성의 이름으로 동적 사용 
                                    $data는 data()와 동일한 내용으로 보면 된다.   $data.type 처럼 이용 가능
                                    $data["type"] 처럼 동적으로 작성 할 수 있다. [] 안에는 문자 데이터를 넣는다. -->
            <select             
                v-for="filter in filters"
                v-model="$data[filter.name]"      
                :key="filter.name"
                class="form-select"
            >
                <option v-if="filter.name === 'year'" value="">   <!--option태그에 value 속성이 없을 경우 content(내용)부분이 value값이 된다. -->
                        All Years   <!-- 아무것도 선택이 되어 있지 않을 경우에는 All Years가 표시된다 -> year: '' -->
                </option>          
                <option
                    v-for="item in filter.items"
                    :key= "item">
                    {{item}}
                </option>
            </select>
        </div>
        <button class="btn btn-primary" @click="apply">
            Apply
        </button>
    </div>
</template>

<script>
// import axios from 'axios'
export default {
    data() {
        return {
            title: '',
            type: 'movie',
            number: 10,
            year: '',
            filters: [                  // filters라는 데이터를 기반으로 각각의 옵션들을 v-for를 통해 제어하기 위해
                {
                    name: 'type',
                    items: ['movie', 'series', 'episode']
                },
                {
                    name: 'number',
                    items: [10, 20, 30]
                },
                {
                    name: 'year',
                    items: (() => { //즉시 실행함수 function() {}
                        const years = []
                        const thisYear = new Date().getFullYear()   // 현재 년도 반환
                        for (let i = thisYear; i >= 1985; i--) {
                            years.push(i)
                        }
                        return years
                    })()
                }
            ]

        }
    },
    methods: {
        async apply() {
            // Search movies....
            // const OMDB_API_KEY = '7035c60c'
            // const res = await axios.get(`https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${this.title}&type=${this.type}&y=${this.year}&page=1`)
            // console.log(res);
            this.$store.dispatch('movie/searchMovies', {    //movie는 store-index.js에 modules에 작성한 movie를 가리킨다.
                title: this.title,
                type: this.type,
                number: this.number,
                year: this.year
            })       //.js는 제거해야한다.  
            //Store의 Mutations를 실행할 때는 .commit() 메소드를 Actions를 실행할 때는 .dispatch() 메소드를 사용한다.
        }
    }
}
</script>

<style lang="scss" scoped>
//@import "~/scss/main";
    .container {
        display: flex;
        > * {       // 자식 선택자 >   * 은 전체 선택
            margin-right: 10px;
            font-size: 15px;
            &:last-child {
                margin-right: 0;
            }
        }
        .selects {
            display: flex;
            select {
                width: 120px;
                margin-right: 10px;
                &:last-child {
                    margin-right : 0;
                }
            }
        }
        .btn {
            width: 120px;
            height: 50px;
            font-weight: 700;
            flex-shrink: 0;   // flex 아이템이 지정한 가로 너비보다 더 줄어드는 것을 방지
        }

        @include media-breakpoint-down(lg) {
            display: block;
            input {
                margin-right: 0;
                margin-bottom: 10px;
            }
            .selects {
                margin-right: 0;
                margin-bottom: 10px;
                select {
                    width: 100%;
                }
            }
            .btn {
                width: 100%;
            }
        }
    }
</style>