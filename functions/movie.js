const axios = require('axios')  //Node.js 환경에서 동작하는 자바스크립트는 require 함수와 exports 객체를 통해서 내보내기와 가져오기를 관리한다.
const OMDB_API_KEY = process.env.OMDB_API_KEY

exports.handler = async function (event) {
    const payload = JSON.parse(event.body)
    
    const { title, type, year, page, id } = payload
    const url = id ? `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&i=${id}` : `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${title}&type=${type}&y=${year}&page=${page}`
        
    try {
        const { data } = await axios.get(url) 
        if (data.Error) {
            return {
                statusCode: 400,
                body: data.Error
            };
        }
        return {
            statsCode: 200,
            body: JSON.stringify(data)
        }
    } catch (error) {
        return {
            statusCode: error.response.status,
            body: JSON.stringify(error.message)
        };
    }

}