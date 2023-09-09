export const REDIRECT_URL = 'http://43.139.117.216:6432'
export const AUTH_URL = 'http://43.139.117.216:9821'

export const LOGIN_URL = `${AUTH_URL}/oauth2/authorize?response_type=code&client_id=messaging-client&scope=message.read&redirect_uri=${REDIRECT_URL}`
