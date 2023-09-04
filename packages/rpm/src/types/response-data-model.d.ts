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

export interface RoleListItem {
  roleId: string
  roleName: string
}
export interface RoleList {
  total: number
  row: RoleListItem[]
}

export interface RoleInfo extends RoleListItem {
  apiNumber: number
  routeNumber: number
  userNumber: number
  websiteNumber: number
}

export type WebsiteOption = Pick<WebsiteBaseInfo, 'websiteId' | 'websiteName'> & {
  disabled?: boolean
}

export type AccessibleWebsite = Omit<WebsiteBaseInfo, 'departmentName'>
