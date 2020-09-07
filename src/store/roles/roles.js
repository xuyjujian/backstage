import api from '../../http/api'
import {
    Message
} from 'element-ui'
export default {
    namespaced: true,
    state: {
        jurisdiction: [],
        roleslist: [],
        treejuriddiction:[]
    },
    mutations: {
        setgetjurisdictionlist(state,data) {
            state.jurisdiction = data
        },
        setrolrslist(state,roles) {
            state.roleslist = roles
        },
        settreejuriddiction(state,tree){
            state.treejuriddiction = tree
        }
    },
    actions: {
        //权限列表
        async getjurisdiction({
            commit
        }) {
            let res = await api.getjurisdiction()
            if (res.meta.status === 200) {
                commit('setgetjurisdictionlist', res.data)
                console.log(res.data)
            }


        },
        //角色列表
        async getroles({
            commit
        }) {
            let res = await api.getroles()
            if (res.meta.status === 200) {
                console.log(res.data)
                commit('setrolrslist', res.data)
            }
        },
        //添加角色
        async postaddroles({
            dispatch
        }, {
            roleName,
            roleDesc,
        }) {
            let res = await api.postaddroles({
                roleName,
                roleDesc
            })
            if (res.meta.status === 201) {
                Message.success('添加成功')
                dispatch('getroles')
            }
        },
        //编辑角色
        async puteditrole({dispatch},{
            id,roleName,roleDesc
        }){
            let res = await api.puteditrole({
                id,roleName,roleDesc
            })
            if(res.meta.status === 200){
                Message.success('编辑成功')
                dispatch('getroles')
            }
        },
        //删除角色
        async deleteroles({dispatch},{id}){
            let res = await api.deleteroles({id})
            if(res.meta.status===200){
                dispatch('getroles')
            }
        },
         //权限树状图
        async gettreejurisdiction({commit}){
            let res= await api.gettreejurisdiction()
            if(res.meta.status ===200){
                commit('settreejuriddiction', res.data)
            }
        },
        //角色授权
        async setRoles({dispatch},{ roleId, rids }){
            let res=await api.setRoles({ roleId, rids })
            if(res.meta.status===200){
                Message.success(res.meta.msg);
                dispatch('getroles')
            }
        },
        //删除角色权限
        async deletright({dispatch},{roleId,rightId}){
            let res=await api.deletright({roleId,rightId})
            if(res.meta.status===200){
                Message.success(res.meta.msg);
                dispatch('getroles')
            }
        }

    },
}