import api from '../../http/api'
import dayjs from 'dayjs'
export default {
    namespaced: true,
    state: {
       orderlist:[],
       total:null,
       logisticsmessage:[]
       
    },
    mutations: {
        setorderlist(state, data){
            state.orderlist=data.goods
            state.total=data.total
        },
        setlogisticsmessage(state,message){
            state.logisticsmessage=message
        }

       
    },
    actions: {
        async getdrserlist({commit},{query,pagenum,pagesize}){
            let res = await api.getdrserlist({query,pagenum,pagesize})
            if(res.meta.status === 200){
                res.data.goods.map(item=>{
                    item.update_time=dayjs(item.update_time).format('YYYY-MM-DD HH:mm:ss')
                })
                console.log(res.data.goods)
                commit('setorderlist',res.data)

            }
        },
        async getlogisticsmessage({commit},{id}){
            let res = await api.getlogisticsmessage({id})
            if(res.meta.status === 200){
                console.log(res)
            commit('setlogisticsmessage',res.data)
        }
            }
            
    },
}