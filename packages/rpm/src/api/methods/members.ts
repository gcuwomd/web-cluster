import { testAlova } from '..'

import { MembersInfo, AlovaResponse,RoleResponse,roleName } from "../../types/response-data-model";

import { paramsGetMemberList, paramsEditMembers } from "../../types/request-model";


// get  分页获取成员列表 
export const getNembersList=(params:paramsGetMemberList)=>{
  return testAlova.Get<AlovaResponse<MembersInfo>>("/auth/member/list",{
    params
  })
}


//获取成员角色
// export const getMembersRole=(websiteId:string)=>{
//   return testAlova.Get<RoleResponse>(`/autn/member/role?websiteId=${websiteId}`)
// }
export const getMembersRole=(websiteId:string)=>{
  return testAlova.Get<AlovaResponse<roleName[]>>(`/auth/member/role?websiteId=${websiteId}`)
}

//put 修改成员信息
export const editMembersList=(params:paramsEditMembers)=>{
  return testAlova.Put<AlovaResponse<null>>('/auth/member',
   {
    username:params.username,
    name:params.name,
    politicsStatus:params.politicsStatus,
    nickName:params.nickName,
    avatar:params.avatar,
    dorm:params.dorm,
    major:params.major,
    grade:params.grade,
    classNumber:params.classNumber,
    position:params.position,
    phone:params.phone,
    email:params.email
   }
  )
}


//post 指定成员角色
export const roleMembers=(username:string,roles:string)=>{
  return testAlova.Post<AlovaResponse<null>>("/auth/member/role",{
    username,
    roles:[`${roles}`]
  })
}



//del 删除成员
export const deleteMembers=(members:Array<string>)=>{
  return testAlova.Delete<AlovaResponse<null>>(`/auth/member?members=${members}`,{
  })
}