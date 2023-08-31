export interface OAuthToken {
  access_token: string
  refresh_token: string
  expires_in: number
  scope: string
  token_type: string
}

export interface WebsiteListItem {
  websiteId: string
  websiteName: string
  websiteUrl: string
  websiteLogo: string
}

export interface UserBasicInfo {
  avatar: string
  name: string
}

export interface DeptListItem {
  label: string
  value: string
  children?: Array<DeptListItem>
}