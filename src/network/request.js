import axios from 'axios'

export default  function request(options) {
    const instance = axios.create({
        baseURL: process.env.VUE_APP_BASEURL,
        timeout: 20000
    })
    return instance(options).then(res => {
        return res
    }).catch(err => {
        return err
    })

}