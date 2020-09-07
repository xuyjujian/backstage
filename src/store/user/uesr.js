import api from '../../http/api'
import router from '../../router'
import {
    Message
} from 'element-ui'
export default {
    namespaced: true,
    state: {
        menus: [],
        userslist: [],
        total: 0,
        value: null,
        roleslist:[]

    },
    mutations: {
        setMenus(state, data) {
            state.menus = data
        },
        setUserslis(state, userdata) {
            state.userslist = userdata.users
            state.total = userdata.total
        },

        setrolrslist(state,  roles){
            state.roleslist=roles
        }
    },

    actions: {
        //侧边栏请求
        async getMenus({
            commit
        }) {
            let res = await api.getMenus()
            if (res.meta.status === 200) {
                //拿到router的数据
                // let route =router.options.routes[0].children
                res.data.map(item => {
                    item.path = "/" + item.path
                    router.options.routes.map(item2 => {
                        if (item.path === item2.path) {
                            item.icon = item2.meta.icon
                            item.children.map(item1 => {
                                item1.path = item.path + "/" + item1.path
                                item2.children.map(item3 => {
                                    if (item1.path === item3.meta.parentpath) {
                                        item1.icon = item3.meta.icon
                                    }
                                })
                            })
                        }
                    })

                })
                commit('setMenus', res.data)
            }
        },
        //登录
        async postlogin({
            commit
        }, {
            username,
            password
        }) {
            console.log(commit)
            let res = await api.postlogin({
                username,
                password
            })
            if (res.meta.status === 200) {
                localStorage.setItem('adminToken', res.data.token)
                localStorage.setItem('adminUser', JSON.stringify(res.data))
                router.push('/')
                Message.success('登录成功')
            }
            if (res.meta.status === 400) {
                Message.error(res.meta.msg)
            }
        },
        //用户数据列表
        async getuserslist({
            commit
        }, {
            query,
            pagenum,
            pagesize
        }) {
            let res = await api.getuserslist({
                query,
                pagenum,
                pagesize
            })
            if (res.meta.status === 200) {
                console.log(res.data.users)
                commit('setUserslis', res.data)
            }
        },
        //添加用户
        async postadduser({
            dispatch
        }, {
            username,
            password,
            email,
            mobile,
            query,
            pagenum,
            pagesize
        }) {
            let res = await api.postadduser({
                username,
                password,
                email,
                mobile,
            })
            if(res.meta.status === 201){
            console.log(res)
            Message.success('添加成功')
            dispatch('getuserslist',{
                query,
                pagenum,
                pagesize
            })
            }
            
        },
        //修改用户状态
        async putuserstate({commit},{uId,type}){
            let res = await api.putuserstate({uId,type})
            Message.success(res.meta.msg)
            console.log(commit)
        },
        ////编辑用户提交
        async putusermsg({
            dispatch
        }, {
            id,
            email,
            mobile,
            query,
            pagenum,
            pagesize
        }) {
            let res=await api.putusermsg({
                id,email,mobile 
            })
            if(res.meta.status === 200){
                Message.success(res.meta.msg)
                dispatch('getuserslist', {
                    query,
                    pagenum,
                    pagesize
                })
            }
        },
        //删除用户
        async deleteueser({dispatch},{
            id,
            query,
            pagenum,
            pagesize
        }){
            let res = await api.deleteueser({
                id,
                query,
                pagenum,
                pagesize
            })
            if(res.meta.status===200){
                dispatch('getuserslist',{
                    query,
                    pagenum,
                    pagesize
                })
            }
        },
        //角色列表
        async getroles({commit}){
            let res= await api.getroles()
            if(res.meta.status===200){
                console.log(res.data)
                commit('setrolrslist',res.data)
            }
        },
        //分配用户角色
        async putrole({dispatch},{id,rid,query,pagenum,pagesize}){
            let res= await api.putrole({id,rid})
            Message.success(res.meta.msg)
            dispatch('getuserslist',{
                query,
                pagenum,
                pagesize
            })
        }
    },
}