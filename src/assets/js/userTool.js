// 处理用户信息
class UserTool {
  /**
   判断用户是否存该权限
   @param {String} name 权限名称
   @return {Boolean} 是否存在
  */
  // isAccept (name) {
  //   let authority = JSON.parse(sessionStorage.getItem("permission"));
  //   let result = false
  //   function check (array) {
  //     array.forEach(item => {
  //       if(item.value === name){
  //         result =  true
  //       } else if (item.children && item.children.length > 0){
  //         check(item.children)
  //       }
  //     })
  //   }
  //   check(authority)
  //   return result
  // }
  // isAccept (name) {
  //   let authority = JSON.parse(sessionStorage.getItem("permList"));
  //   let result = false
  //   function check (array) {
  //     array.forEach(item => {
  //       if(item.permValue === name){
  //         result =  true
  //       } else if (item.pList && item.pList.length > 0){
  //         check(item.pList)
  //       }
  //     })
  //   }
  //   check(authority)
  //   return result
  // }
}
export default new UserTool()
