import api from '../../http/api'
export default {
    namespaced: true,
    state: {
        legend:[],
        series:[],
        xAxis:[],
        yAxis:[]
    },
    mutations: {
        setData(state, data) {
            state.legend = data.legend.data
            state.series = data.series
            state.xAxis = data.xAxis
            state.yAxis = data.yAxis
        },
    },
    actions: {
        async getDatareports({commit}){
            let res = await api.getDatareports()
            if(res.meta.status === 200){
                
                console.log(res.data.legend.data,'legend')
                console.log(res.data.series,'series')
                console.log(res.data.xAxis,"xAxis")
                console.log(res.data.yAxis,'yAxis')
                commit('setData',res.data)
            }
            
        }
    },
}