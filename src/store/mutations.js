import * as TYPES from './mutations-types'

export default {
    // [TYPES.RECEIVE_ADDRESS](state,{address}){
    //     state.address = address
    // },

    // 产品信息页面
    // 获取每一页的产品属性信息并存储
    [TYPES.UPDATE_PRODUCT_ATTRIBUTE_INFO](state,payload){
      let {allAttributeInfo,currentAttributeInfoPage} = state
      let {data:{total,list},page} = payload
      allAttributeInfo[page] = list
      allAttributeInfo.total = total
      currentAttributeInfoPage = page
      state.allAttributeInfo = JSON.parse(JSON.stringify(allAttributeInfo))
    },
    // 更新产品展示页面的页数
    [TYPES.UPDATE_CURRENT_ATTRIBUTE_INFO_PAGE](state,page){
      state.currentAttributeInfoPage = page
    },


    // 车系车型添加页面
    [TYPES.UPDATE_CAR_SERIES_VEHICLE_INFO](state,payload){
      let {allSeriesVhicleInfo,currentCarSeriesPage} = state
      let {data:{total,list},page} = payload
      allSeriesVhicleInfo[page] = list
      allSeriesVhicleInfo.total = total
      currentCarSeriesPage = page
      state.allSeriesVhicleInfo = JSON.parse(JSON.stringify(allSeriesVhicleInfo))
    },
        // 更新产品展示页面的页数
        [TYPES.UPDATE_CAE_SERIES_VEHICLE_PAGE](state,page){
          state.currentCarSeriesPage = page
        },

}