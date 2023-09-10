import { readonly } from "vue"

export interface NewWebsiteForm {
  websiteName: string
  websiteUrl: string
  websiteLogo: string
  belongs: string[]
}
// -----------------------------------

//定义 获取成员列表 的请求参数对象类型
export interface paramsGetMemberList{
    departmentId:string
    searchType:string
    keyword:string
    pageSize:number,
    page:number
}

//定义 修改成员 的请求参数对象类型
export interface paramsEditMembers{
  username:string
  name?:string
  politicsStatus?:string
  nickName?:string
  avatar?:string
  dorm?:string
  major?:string
  grade?:string
  classNumber?:string
  position?:string
  phone?:string
  email?:string
}

//定义 指定成员角色 的请求参数对象类型
export interface paramsRole{
  username:string
  roles:Array<string>
}
export interface ChangeWebsiteInfForm extends NewWebsiteForm {
  websiteId: string
}
export interface RouteForm {
  readonly websiteId: string
  routeUrl: string
  routeDescription: string
  routeId?: string
}

export interface RoleForm {
  roleName: string;
  readonly departmentId: string
}

//定义 添加api 的请求参数的对象类型
export interface ApiForm{
  readonly websiteId: string;
  routeId: string | null;
  apiDescription: string;
  apiMethod: string;
  apiUrl: string;
  apiType: string;// 取值: 页面接口 或 全局接口
}
 //定义 删除站点权限路由 的请求参数的对象类型
export interface DeleteRouteForm{
      //权限路由id
      id: string;
      //取值：api，route
      type: string;
}