export interface AlovaResponse<T> {
  code: number
  data: T
  message: string
}

export interface DepartmentList {
  label: string
  value: string
  children?: Array<DepartmentList>
}

export interface WebsiteBaseInfo {
  websiteId: string
  departmentName: string
  websiteUrl: string
  websiteName: string
  websiteLogo: string
}

export interface WebsiteDetailInfo extends WebsiteBaseInfo {
  apiNum: number
  routeNumber: number
}

export interface RoleListItem {
  roleId: string
  roleName: string
}
export interface GetRoleList {
  total: number
  row: RoleListItem[]
}

export interface WebsiteApiInfo {
  apiDescription: string
  apiId: string
  apiMethod: string
  apiType: 'globalApi' | 'pageApi'
  apiUrl: string
  routeId: string | null
  websiteId: string
}
export interface WebsiteRouteInfo {
  routeId: string
  routeDescription: string
  routeUrl: string
  websiteId: string
  pageApi: WebsiteApiInfo[]
  apiCount: number | null
}

export type WebsitePermissions = {
  globalApi: WebsiteApiInfo[]
  routes: WebsiteRouteInfo[]
}
export interface PermissionList {
  row?: ApiListItem[] | RouteListitem [];
  total?: number;
  api?: {
    row: ApiListItem[];
    total:number;
  }
  route?:{
    row: RouteListitem[];
    total: number;
  }
}

// ---------------------------------------
export interface RowData{
    username:string
    name:string
    phone:string
    nickName:string
    major:string
    grade:string
    classNumber:string
    dorm:string
    politicsStatus:string
    avatar:string
    position:string
    email:string
}
//分页获取成员列表返回的data对象的全部数据类型限定（包括不展示的）
export interface MembersInfo{
  total:number
  row:data[]
}

export interface InitMemberAllInfoClass{
  total:number
  row:RowData[]
  page:1
  pageSize:10
}

//获取成员角色返回数据的类型限定
export interface RoleResponse {
  timestamp: string,
  status: number,
  error: string,
  path: string
}
export interface roleName{
  roleId:string
  roleName:string
}

export interface data{
  username:string
  name:string
  phone:string
  nickName:string
  major:string
  grade:string
  classNumber:string
  dorm:string
  politicsStatus:string
  avatar:string
  position:string
  email:string
  roleName:string
}
