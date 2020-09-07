import axios from 'axios'
import nprogress from 'nprogress'
import {Message} from 'element-ui'

const ispro =process.env.NOOE_ENV ==='production'

const service = axios.create({
    baseURL: ispro ? '' : '/api',
    timeout: 100000
})

service.interceptors.request.use((config)=>{
    nprogress.start()
    let token = localStorage.getItem('adminToken')
    if(token){
        config.headers['Authorization'] = token
    }
    return config
}, err =>{
    nprogress.done()
    return Promise.reject(err)
})

service.interceptors.response.use((res)=>{
    nprogress.done()
    return res.data
}, err =>{
    if(err.response &&err.response.status){
        let status = err.response.status
        if(status===400){
            Message.error('参数错误')
        }
        if(status===401){
            Message.error('登录过期，请重新登录')
        }
        if(status===403){
            Message.error('没有权限')
        }
        if(status===404){
            Message.error('接口路径错误')
        }
        if(status===500){
            Message.error('服务器错误')
        }
        if(status===503){
            Message.error('服务器在维护')
        }
    }
    return Promise.reject(err)
})
export default service