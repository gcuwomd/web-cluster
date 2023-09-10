import axios from 'axios'
import { useStore } from '../../store'
import { websiteIds } from '../../localStore';
export const getUserInfo=()=>{
    const store=useStore();
    axios({
        method:'GET',
        url:'https://pass.bamdev.space/auth/user/info',
        headers:{
            'Authorization':`Bearer ${store.access_token}`
        },
        params:{
            websiteId:websiteIds.value
        }
    }).then(response=>{
        const res=response.data.data
        store.organizationId=res.organizationId
        store.departmentId=res.departmentId
        store.name=res.name
        store.avatar=res.avatar
        store.route=res.route
        store.api=res.api
        
    }).catch(()=>{
            // getAccessToken();
    })
}
