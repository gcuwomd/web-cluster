export interface NewWebsiteForm {
  websiteName: string
  websiteUrl: string
  websiteLogo: string
  belongs: string[]
}
export interface ChangeWebsiteInfForm extends NewWebsiteForm {
  websiteId: string
}
export interface RouteForm {
  websiteId: string
  routeUrl: string
  routeDescription: string
  routeId?: string
}