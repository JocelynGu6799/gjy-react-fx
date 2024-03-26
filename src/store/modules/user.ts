import { IUserType, UserInfoType, roleGet, userLogin } from "@/api/user";
import { createSlice,Dispatch } from "@reduxjs/toolkit";
import { NavigateFunction } from "react-router-dom";
import store2 from "store2";
// export interface UserInfoType {
//   username: string;
//   objectId: string;
//   sessionToken: string;
//   avatar: string;
// }
export interface UserStateType {
    isLogin: boolean;
    isLoading: boolean;
    userInfo: UserInfoType | null;
  }
const initialState:UserStateType={
    isLogin:false,
        isLoading:false,
        userInfo:null
}
let info=store2.get("gjy-userinfo-store2")|| store2.session.get("gjy-userinfo-store2");
if(info){
    initialState.isLogin=true;
    initialState.userInfo=info
}
const userSlice=createSlice({
    name:'user',
    initialState:initialState,
    reducers:{
        loginStart(state){
            state.isLoading=true
        },
        loginSuccess(state,action){
            state.isLogin=true
            state.isLoading=false
            state.userInfo=action.payload.userInfo
            let {autoLogingjy}=action.payload
            let autogjy=autoLogingjy?true:false
            store2("autogjy",autogjy)
            console.log("state",state);
            console.log("action",action);
            if(autoLogingjy){
                store2("gjy-userinfo-store2",action.payload.userInfo)

            }else{
            store2.session("gjy-userinfo-store2",action.payload.userInfo)

            }
            
            
        },
        loginFailt(state){
            state.isLogin=false
            state.isLoading=false
            state.userInfo=null
            store2.remove("gjy-userinfo-store2")
        },
        loginUpdate(state,action){
            let ifautogjy=store2.get("autogjy")
            state.userInfo=action.payload
            if(ifautogjy){
                store2("gjy-userinfo-store2",action.payload)

            }else{
                store2.session("gjy-userinfo-store2",action.payload)
    
                }
        }
    }
})
export const userLoginAsync=(params:IUserType,dispatch:Dispatch,navigate:NavigateFunction)=>{
    dispatch(loginStart())
    setTimeout(()=>{
        userLogin(params).then(async(res)=>{
            console.log("login res",res);
            let role=await roleGet(res.data.roleId)
            console.log("role",role);
            
            dispatch(loginSuccess({userInfo:{...res.data,...role.data},autoLogingjy:params.autoLogin}))
            navigate("/")
        }).catch(err=>{
            dispatch(loginFailt())
           
        })
        
    },1000)
}
export default userSlice.reducer
export const {loginStart,loginSuccess,loginFailt,loginUpdate}=userSlice.actions