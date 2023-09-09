export interface NewWebsiteForm {
  websiteName: string
  websiteUrl: string
  websiteLogo: string
  belongs: string[]
}
<<<<<<< HEAD
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


=======
export interface ChangeWebsiteInfForm extends NewWebsiteForm {
  websiteId: string
}
export interface RouteForm {
  websiteId: string
  routeUrl: string
  routeDescription: string
  routeId?: string
}
>>>>>>> origin/feat-rpm
