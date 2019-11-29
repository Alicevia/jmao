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