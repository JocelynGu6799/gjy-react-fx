import request from "@/utils/request";

export interface IUserType{
    username:string;
    password:string;
    autoLogin:boolean;
}

export const userLogin=(params:IUserType)=>{
    return request.post("login",params)
}
export interface UserInfoType{
    username:string;
    objectId:string;
    avator?:string;
    roleId?:string
    roleName?:string
    checkedKeys?:Array<string>
}
export const userUpdate=(userId:string,params:UserInfoType)=>{
    return request.put(`users/${userId}`,params)
}
export interface RoleType{
    objectId:string;
    roleName:string;
    checkedKeys:Array<string>
    userindex:number
}
export const rolePost=(roleObj:RoleType)=>{
    return request.post("classes/ReactRole1",roleObj)
}
export const roleGet=(roleId:string='')=>{
    let params=roleId?`/${roleId}`:''
    return request.get(`classes/ReactRole1${params}`)
}
export const rolePut=(roleId:string,roleObj:RoleType)=>{
    return request.put(`classes/ReactRole1/${roleId}`,roleObj)
}
export const roleDelete=(roleId:string)=>{
    return request.delete(`classes/ReactRole1/${roleId}`)
}
//角色批量删除
export const roleBatchDel = (roleIds: React.Key[]) => {
    let requests = roleIds.map((id) => {
      return {
        method: "DELETE",
        path: `/1.1/classes/ReactRole1/${id}`,
      };
    });
    return request.post("batch", { requests });
  };
  //账号新增
export interface UserType {
    objectId: string;
    username: string;
    password: string;
    roleId: string;
    roleName: string;
  }
  export const userPost = (userObj: UserType) => {
    return request.post("users", userObj);
  };
  export const userGet = () => {
    return request.get("users");
  };