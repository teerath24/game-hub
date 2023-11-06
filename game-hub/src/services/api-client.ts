import axios from "axios";

export default axios.create({
    baseURL:'https://api.rawg.io/api',
    params:{
        key:'10a80d22c55c41ecbcfca0f2e5ca13e5'
    }
})