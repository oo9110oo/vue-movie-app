export default {
    namespace: true,    // store에서 하나의 모듈이 될 수 있도록 정의
    state: () => ({      // 하나의 데이터   state를 함수로 만드는 이유 : 객체 데이터는 배열 데이터와 동일하게 하나의 참조형 데이터이고 데이터의 불변성을 유지하려면 함수로 만들어서 반환해줘야 한다.
      name: 'KCS',
      email: 'oo9110oo@naver.com',
      blog: 'https://heropy.blog',
      phone: '+82-10-5651-1563',
      image: 'https://heropy.blog/css/images/logo.png'  
    })             
}