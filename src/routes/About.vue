<template>
    <div class="about">
        <div class="photo">
            <Loader
                v-if="imageLoading" 
                absolute />
            <img :src="image" :alt="name">
        </div>
        <div class="name">
            {{ name }}
        </div>
        <div>{{ email }}</div>
        <div>{{ blog }}</div>
        <div>{{ phone }}</div>

    </div>
</template>

<script>
import Loader from '~/components/Loader'
import { mapState } from 'vuex'
export default {
    components: {
        Loader
    },
    data() {
        return {
            imageLoading: true
        }
    },
    computed: {
        ...mapState('about', [  //... -> 전개연산자 : 객체나 배열의 값을 하나 하나 넘기는 용도로 사용할 수 있다
            'image',                    // 첫번째 인수 문자 데이터 -> 사용할 모듈  about.js 
            'name',                     // 두번째 인수 배열 데이터 -> 사용할 state를 가져온다.
            'email',
            'blog',
            'phone'
        ])   
        // image() {
        //     return this.$store.state.about.image
        // },
        // name() {
        //     return this.$store.state.about.name
        // },
        // email() {
        //     return this.$store.state.about.email
        // },
        // blog() {
        //     return this.$store.state.about.blog
        // },
        // phone() {
        //     return this.$store.state.about.phone
        // }
    },
    mounted() { //라이프 사이클에서는 비동기 처리를 사용하면 안된다. 별도의 methods를 만들어서 사용해야 한다.
        this.init()
    },
    methods: {
        async init() {
            await this.$loadImage(this.image)
            this.imageLoading = false
        }
    }
}
</script>

<style lang="scss" scope>
//@import "~/scss/main";
    .about {
        text-align: center;
        .photo {
            width: 250px;
            height: 250px;
            margin: 40px auto 20px;
            padding: 30px;
            border: 10px solid $gray-300;
            border-radius: 50%;
            box-sizing: border-box;
            background-color: $gray-200;
            position: relative;
            img {
                width: 100%;
            }
        }
        .name {
            font-size: 40px;
            font-family: "Oswald", sans-serif;
            margin-bottom: 20px;
        }
    }
</style>