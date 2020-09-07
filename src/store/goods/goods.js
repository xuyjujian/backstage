import api from '../../http/api'
import dayjs from 'dayjs'
// import {
//     Message
// } from 'element-ui'
export default {
    namespaced: true,
    state: {
        goodslist: [],
        total: 0,
        goodscategories:[]
    },
    mutations: {
        setgoodslist(state, data) {
            state.goodslist = data.goods
            state.total = data.total
        },
        setgoodscategories(state, good){
            state.goodscategories= good
        }
    },
    actions: {
        //商品列表
        async getgoods({
            commit
        }, {
            query,
            pagenum,
            pagesize
        }) {
            let res = await api.getgoods({
                query,
                pagenum,
                pagesize
            })
            if (res.meta.status === 200) {
                res.data.goods.map(item => {
                    item.add_time = dayjs(item.add_time).format('YYYY-MM-DD HH:mm:ss')
                })
                commit('setgoodslist', res.data)
            }
        },
        //编辑商品
        async putgoods({
            dispatch
        }, {
            id,
            goods_name,
            goods_price,
            goods_number,
            goods_weight,
            query,
            pagenum,
            pagesize
        }){
            let res = await api.putgoods({
                id,
                goods_name,
                goods_price,
                goods_number,
                goods_weight
            })
            if (res.meta.status === 201){
                dispatch('getgoods',{
                    query,
                    pagenum,
                    pagesize
                })
            }
        },
        //删除商品
        async deletegoods({
            dispatch
        },{
            id,
            query,
            pagenum,
            pagesize
        }){
            let res = await api.deletegoods({
                id,
            })
            if(res.meta.status === 200){
               
                dispatch('getgoods',{
                    query,
                    pagenum,
                    pagesize
                })
            }
        },
        //商品分类数据列表
        async getgoodscategories({commit}){
            let res = await api.getgoodscategories()
            if(res.meta.status === 200){
                commit('setgoodscategories', res.data)
            }
        }
    },
}