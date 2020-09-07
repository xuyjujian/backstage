
import service from './index'
import qs from	'qs'
export default{
    //登录
    postlogin({username,password}){
        return service.post('/login',{
            username,
            password
        })
    },
    //左菜单
    getMenus(){
        return service.get('menus')
    },
    //数据统计
    getDatareports(){
        return service.get('reports/type/1')
    },
    //订单数据列表
    getdrserlist({query,pagenum,pagesize}){
        return service.get(`orders?query=${query}&pagenum=${pagenum}&pagesize=${pagesize}`)
    },
    //物流信息
    getlogisticsmessage({id}){
        return service.get(`/kuaidi/${id}`)
    },
    //用户数据列表
    getuserslist({query,pagenum,pagesize}){
        return service.get(`users?query=${query}&pagenum=${pagenum}&pagesize=${pagesize}`)
    },
    //添加用户
    postadduser({
        username,
        password,
        email,
        mobile,
    }){
        return service.post('users',{username,
            password,
            email,
            mobile,})
    },
    //修改用户状态
    putuserstate({uId,type}){
        return service.put(`users/${uId}/state/${type}`)
    },
    //编辑用户提交
    putusermsg({id,email,mobile}){
        return service.put(`users/${id}`,{email,mobile})
    },
    //删除单个用户
    deleteueser({id}){
        return service.delete(`users/${id}`)
    },
    //权限列表
    getjurisdiction(){
        return service.get('rights/list ')
    },
    //角色列表
    getroles(){
        return service.get('roles')
    },
    //分配用户角色
    putrole({id,rid}){
        return service.put(`users/${id}/role`,{rid})
    },
    //添加角色
    postaddroles({roleName,roleDesc}){
        return service.post('roles',{roleName,roleDesc})
    },
    //编辑角色
    puteditrole({id,roleName,roleDesc}){
        return service.put(`roles/${id}`,{roleName,roleDesc})
    },
    //删除角色
    deleteroles({id}){
        return service.delete(`roles/${id}`)
    },
    //权限树状图
    gettreejurisdiction(){
        return service.get('rights/tree')
    },
    // 角色授权
    setRoles({ roleId, rids }) {
        return service.post(`roles/${roleId}/rights`, qs.stringify({ rids }), {
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        });
      },
    // setRoles({
    //     roleId,
    //     rids
    // }) {
    //     return service.post(`roles/${roleId}/rights`, {
    //         rids
    //     });
    // },
      //删除角色权限
      deletright({roleId,rightId}){
          return service.delete(`roles/${roleId}/rights/${rightId}`)
      },
      //商品列表
    getgoods({query,pagenum,pagesize}){
        return service.get(`goods?query=${query}&pagenum=${pagenum}&pagesize=${pagesize}`)
    },
    //编辑商品
    putgoods({id,goods_name,goods_price,goods_number,goods_weight}){
        return service.put(`goods/${id}`,{goods_name,goods_price,goods_number,goods_weight})
    },
    //删除商品
    deletegoods({id}){
        return service.delete(`goods/${id}`)
    },
    //商品分类数据列表
    getgoodscategories(){
        return service.get('categories')
    }
}