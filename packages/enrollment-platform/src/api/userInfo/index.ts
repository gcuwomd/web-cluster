import axios from 'axios'
import { useStore } from '../../store'
import { websiteIds } from '../../localStore';
export const getUserInfo=()=>{
    const store=useStore();
<<<<<<< HEAD
    console.log(store.access_token);
    
    axios({
        method:'GET',
        url:'http://43.139.117.216:8080/auth/user/info',
=======
    axios({
        method:'GET',
        url:'https://pass.bamdev.space/auth/user/info',
>>>>>>> dab0b34b9a9510f895ccad50ab4183d17b9ed33d
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
<<<<<<< HEAD
        console.log(store.avatar);
=======
>>>>>>> dab0b34b9a9510f895ccad50ab4183d17b9ed33d
        
    }).catch(()=>{
            // getAccessToken();
    })
}
