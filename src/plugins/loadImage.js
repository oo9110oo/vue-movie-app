export default {
    install(app) {  // vue.js에서 플러그인으로 활용될 때 매개변수로 현재 프로젝트에 해당하는 하나의 객체 데이터를 내려줘야 한다.
        app.config.globalProperties.$loadImage = (src) => {  //$loadImage 함수를 만드는 것
            return new Promise((resolve) => {   //비동기 식으로 동작
                const img = document.createElement('img')
                img.src = src
                img.addEventListener('load', () => {
                    //완료 ! 처리해줘야 함
                    resolve()
                })
            })
        }
    }
}