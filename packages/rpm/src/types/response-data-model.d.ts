export interface AlovaResponse<T> {
  code: number;
  data: T;
  message: string;
}
export interface DepartmentList {
  label: string;
  value: string;
  children?: Array<DepartmentList>
}
export interface WebsiteBaseInfo {
  websiteId: string;
  departmentName: string;
  websiteUrl: string;
  websiteName: string;
  websiteLogo: string;
}

export interface WebsiteDetailInfo extends WebsiteBaseInfo {
  apiNum:number;
  routeNumber:number;
}

export interface ApiListItem {
  apiDescription:string;
  apiId:string;
  apiMethod:string;
  apiUrl:string;
  websiteId:string;
}
export interface RouteListItem {
  routeDescription:string;
  routeId:string;
  routeUrl:string;
  websiteId:string;
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