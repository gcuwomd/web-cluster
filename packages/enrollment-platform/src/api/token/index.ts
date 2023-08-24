
import {getUserInfo} from '../userInfo'
import {useStore} from '../../store'
export const getAccessToken= ()=>{
    console.log("asda");
    
    const store=useStore();
    const urlParams = new URLSearchParams(window.location.search);
    const refresh_token = urlParams.get('refresh_token');
    if(refresh_token||store.refresh_token){
        const formData = new FormData();
        formData.append("grant_type", "refresh_token")
        if(refresh_token)

        formData.append("refresh_token",refresh_token)
        else if(store.refresh_token)
            formData.append("refresh_token",store.refresh_token)
        fetch(`/api/oauth2/token`, {
            method: 'POST',
            body: formData,
            headers: {
            "Authorization": "Basic bWVzc2FnaW5nLWNsaWVudDpzZWNyZXQ=",
            },
            redirect: 'follow'
            }).then((response) => response.json()).then((data) => {
             
                if(data.error)
        window.location.href = 'http://43.139.117.216:9821';
            store.access_token=data.access_token;
            store.refresh_token=data.refresh_token
            
            getUserInfo()

      })
      console.log(refresh_token||store.refresh_token);
      console.log();
      
      
    }
    window.location.href = 'http://43.139.117.216:9821';
    
}
