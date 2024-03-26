import * as React from 'react';
import { IMenuType } from './inter';
import {Route} from 'react-router-dom'

export interface IRenderRoutesProps {
}

export default function RenderRoutes (routes: IMenuType[]) {
  return routes.map((item)=>{
    if(item.children){
        return <React.Fragment key={item.key}>{RenderRoutes(item.children)}</React.Fragment>
    }else{
        return <Route key={item.key} path={item.key} element={item.element}></Route>
    }
  })
}
