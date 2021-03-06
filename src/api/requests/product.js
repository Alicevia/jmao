// import axios from '../axios'
import {axios,ajax} from '../config/axios'


export const login = (data)=>axios({
  url:'user/login',
  data,
  method:'post',
  flag:true
})
// 获取全部属性信息
export const reqAllAttributeData=(data)=>{
  return axios({
    url:'search/findAttributeAll',
    data,
    flag:true
  })
}
// 添加产品属性
export const reqAddAttributeData=(data)=>{
  return axios({
    url:'edit/addAutomobileAttribute',
    data,
    method:'post',
  })
}
// 删除属性信息
export const reqDeleteAttributeData = (data)=>axios({
  url:'edit/batchDeleteAttribute',
  method:'delete',
  data,
  flag:false
})

// 删除属性信息
export const reqModiAttributeData = (data)=>axios({
  url:'edit/updateAutomobileAttribute',
  method:'post',
  data,
})


// 获取产品信息
export const reqAllProductInfo = ()=>axios({
  url:'search/findProductAll',
  method:'get',
  flag:false
})
// 添加产品信息
export const reqAddProductCategory=(data)=>axios({
  url:'edit/addProduct',
  method:'post',
  data,
  flag:false
})
//删除产品信息
export const reqDeleteProductCategory = data=>axios({
  url:`edit/deleteProduct`,
  data,
  method:'delete',
  flag:true
})
// 修改产品信息
export const reqModiProductCategory = data=>axios({
  url:'edit/updateProduct',
  method:'post',
  data,
  flag:false,
})




// 获取车型车系信息
export const reqCarSeriesVehicleInfo=(data)=>axios({
  url:'search/findSeriesInformation',
  data,
  method:'get',
  flag:true
})
// 添加车型车系
export const reqAddCarCarSeriesVehicle=(data)=>axios({
  url:'edit/addAutomobileInformation',
  method:'post',
  data,
})
// 修改车型车系
export const reqModiCarCarSeriesVehicle=(data)=>axios({
  url:'edit/updateAutomobileInformation',
  method:'post',
  data,
})
// 删除车型车系
export const reqDeleteCarSeriesVehicle=(id)=>axios({
  url:`edit/deleteAutomobileInformation/${id}`,
  method:'delete',
})
// 获取全部车系
export const reqAllCarSeries=()=>axios({
  url:'search/findCarSeriesInformation',
  method:'get',
})