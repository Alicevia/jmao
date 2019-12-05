import * as TYPES from './mutations-types'
import utils from '@/utils'
export default {
  // [TYPES.RECEIVE_ADDRESS](state,{address}){
  //     state.address = address
  // },
  // 修改最新path的信息
  [TYPES.MODI_ACTIVE_PATH](state,payload){
    state.activePath = payload
  },
  // 产品信息页面
  // 获取每一页的产品属性信息并存储
  [TYPES.UPDATE_PRODUCT_ATTRIBUTE_INFO](state, payload) {
    let { allAttributeInfo, currentAttributeInfoPage } = state
    let { data: { total, list }, page } = payload
    allAttributeInfo[page] = list
    allAttributeInfo.total = total
    state.currentAttributeInfoPage = page
    state.allAttributeInfo = JSON.parse(JSON.stringify(allAttributeInfo))
  },
  // 更新产品展示页面的页数
  [TYPES.UPDATE_CURRENT_ATTRIBUTE_INFO_PAGE](state, page) {
    state.currentAttributeInfoPage = page
  },
  






  // 添加产品页面-----------------
  //获取产品信息
  [TYPES.GET_PRODUCT_INFO](state,payload){
    state.productInfo = payload
  },
  // 添加产品
  [TYPES.ADD_PRODUCT_INFO](state,payload){
    let {productInfo} = state
    productInfo.push(payload)
    state.productInfo = productInfo
  },
  // 修改产品
  [TYPES.MODI_PRODUCT_INFO](state,payload){
    let {productInfo} = state
    productInfo = productInfo.map(item=>{
      if (item.id===payload.id) {
        item = payload
      }
      return item
    })
    state.productInfo = productInfo
  },
  // 删除产品信息
  [TYPES.DELETE_PRODUCT_INFO](state,payload){
    let {productInfo} = state
    let i = null
     productInfo.forEach((item,index)=>{
      if (item.id===payload.id) {
        i=index
      }
    })
    productInfo.splice(i,1)
    state.productInfo = productInfo
  },



  // 车系车型添加页面
  [TYPES.UPDATE_CAR_SERIES_VEHICLE_INFO](state, payload) {
    let { allSeriesVhicleInfo, currentCarSeriesPage } = state
    let { data: { total, list }, page } = payload
    allSeriesVhicleInfo[page] = list
    allSeriesVhicleInfo.total = total
    currentCarSeriesPage = page
    state.allSeriesVhicleInfo = JSON.parse(JSON.stringify(allSeriesVhicleInfo))
  },
  // 所有的车系信息
  [TYPES.GET_ALL_CAR_SERIES](state,payload){
    if (payload.length>0) {
      state.allCarSeries = payload 
    }
  },
  // 添加车系车型
  // [TYPES.ADD_CAR_SERIES_VEHICLE_INFO](state,payload){

  // }
  // 更新产品展示页面的页数
  [TYPES.UPDATE_CAE_SERIES_VEHICLE_PAGE](state, page) {
    state.currentCarSeriesPage = page
  },

}