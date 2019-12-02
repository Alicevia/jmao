// import axios from '../axios'
import {axios,ajax} from '../config/axios'

// 获取全部属性信息
export const reqAllAttributeData=(data)=>{
  return axios({
    url:'search/findAttributeAll',
    data,
    flag:true
  })
}

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
  url:''
})
// 修改产品信息
export const reqModiProductCategory = data=>axios({
  url:'edit/addProduct',
  method:'post',
  data,
  flag:false,
})




// 获取车型车系信息
export const reqCarSeriesVehicleInfo=(data)=>axios({
  url:'search/findSeriesInformation',
  data,
  flag:true
})
// 添加车型车系
// export const reqAddCarCarSeriesVehicle=(data)=>axios({
//   url:'edit/addAutomobileInformation',
//   method:'post',
//   data,
// })