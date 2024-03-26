import request  from "@/utils/request"
import Category from "@/views/Course/Category";
import { type } from "os";
// 默认导出,名字随意?

export const gjytestpost=()=>{
    return request.post("classes/gjyReactTest",{name:'jocelyn',score:100})
}
export interface ICategoryParams{
    objectId?: string; //类目ID
  cateName: string; //类目名称
  fatherId: string; //父级类目ID
  status: boolean; //分类上架状态
  children?:ICategoryParams[]
}
export const CategoryPost=(cateObj:ICategoryParams)=>{
    return request.post("classes/gjyReactCategory",cateObj)
}
// 提交父级类别
interface CateConditionType{
    fatherId?:string
}
export const CategoryGet=(where:CateConditionType={fatherId:'0-0'})=>{
    return request.get("classes/gjyReactCategory",{
        params:{
            where
            
        }
    })
}
export const categoryPut = (objectId: string, status: boolean) => {
    return request.put(`/classes/gjyReactCategory/${objectId}`, { status });
  };
  export interface ICourseType {
    name: string;
    info: string |{"$regex":string, "$options":"i"};
    poster: string;
    isvip: boolean;
    category: [string, string];
    catelv1: string;
    catelv2: string;
    desc: string;
  }
  export const coursePost = (courseObj: ICourseType) => {
    return request.post("/classes/gjyReactAricle", courseObj);
  };


  export interface CourseConditionType {
    current?: number;
    pageSize?: number;
    created_at?: string;
    isvip?: string | boolean;
    name?: string;
    info?: string | { $regex: string; $options: "i" };  //模糊查询
    
  }
  type CourseKeyType=keyof CourseConditionType
  export const courseGet = (params:CourseConditionType) => {
    delete params.pageSize
    delete params.current
    delete params.created_at
    for(let attr in params){
        if(params[attr as CourseKeyType] ===''){
            delete params[attr as CourseKeyType]
        }

    }
    if(params.isvip && params.isvip!=='2'){
        params.isvip=Boolean(Number(params.isvip))
       
    }
    if(params.isvip && params.isvip==='2'){
        delete params.isvip
       
    }
    if(params.info){
        params.info={"$regex":`${params.info}`, "$options":"i"}
    }
    let mySearch=JSON.stringify(params)
    return request.get(`/classes/gjyReactAricle?where=${mySearch}`);
  };