import request from './request'

export default function word(options) {
    return request({
        url: options.url,
        params: options.param
    })
}