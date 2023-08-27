
import {getUserInfo} from '../userInfo'
import {useStore} from '../../store'
import {refresh_tokens,websiteIds} from '../../localStore'
export const getAccessToken= ()=>{
    const store=useStore();
    const urlParams = new URLSearchParams(window.location.search);
    const refresh_token = urlParams.get('refresh_token');
    const websiteId=urlParams.get('websiteId')
    if(websiteId)
    websiteIds.value=websiteId
    if(refresh_token||refresh_tokens.value){
        const formData = new FormData();
        formData.append("grant_type", "refresh_token")
        if(refresh_token)
        formData.append("refresh_token",refresh_token)
        else if(refresh_tokens.value)
            formData.append("refresh_token",refresh_tokens.value)
        console.log(refresh_token);
        console.log(refresh_tokens.value);
        
        
        fetch(`http://43.139.117.216:9821/oauth2/token`, {
            method: 'POST',
            body: formData,
            headers: {
            "Authorization": "Basic bWVzc2FnaW5nLWNsaWVudDpzZWNyZXQ=",
            },
            redirect: 'follow'
            }).then((response) => response.json()).then((data) => {
            
          /*       if(data.error){
                    refresh_tokens.value=null
                    window.location.href = 'http://43.139.117.216:6432';
                } */
            
            refresh_tokens.value=data.refresh_token;
            store.access_token=data.access_token
            
            getUserInfo()

        })
    }else{
          /*   window.location.href = 'http://43.139.117.216:6432'; */
    }
    
    
}
