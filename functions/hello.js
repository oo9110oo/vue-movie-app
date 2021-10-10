exports.handler = async function (event, context) {
    return {
        statusCode : 200,
        //body: 'Hello world;'    //문자데이터만 할당 가능
        body: JSON.stringify({    //json stringify메소드를 이용해서 하나의 객체 데이터를 문자로 변환해서 할당할 수 있다.
            name: 'Kcs',
            age: 85,
            email: 'oo9110oo@gmail.com'
        })
    }
}