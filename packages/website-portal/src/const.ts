export const REDIRECT_URL = 'https://nav.bamdev.space'
export const AUTH_URL = 'https://www.bamdev.space:9821'

export const LOGIN_URL = `${AUTH_URL}/login/oauth2/authorize?response_type=code&client_id=messaging-client&scope=message.read&redirect_uri=${REDIRECT_URL}`
