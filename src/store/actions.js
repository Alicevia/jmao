import * as allReq from '@/api'
import * as TYPES from './mutations-types'
import { message } from 'ant-design-vue'
export default {
  // recordUser({commit,state,getters},userInfo){

  //     commit(TYPES.RECEIVE_USER_INFO,{userInfo})
  // },

  // 搜索判断
  searchFlag({commit},payload){
    commit(TYPES.SEARCH_FLAG,payload)
  },
  // 验证是否登陆
  
  async changeLogin({ commit }, payload) {
    let { data: { succeed, data } } = await allReq.login(payload)
    if (data) {
      message.success('登陆成功，欢迎上线')
      localStorage.setItem('login', true)
      commit(TYPES.CHANGE_LOGIN)
    } else {
      message.error('用户名或者密码错误')
    }
  },
  // 退出
  changeLogout({ commit }) {
    commit(TYPES.CHANGE_LOGOUT)
    message.success('退出成功')
  },
  // 显示当前的path
  modiActivePath({ commit }, payload) {
    commit(TYPES.MODI_ACTIVE_PATH, payload)
  },
  // 获取每一页的产品属性信息并存储
  async getProductAttributeInfo({ commit,state }, payload) {
    let { page,keywords } = payload
    let {allAttributeInfo} = state
    if (keywords&&(allAttributeInfo.total-1)/10===page-1) {
      payload.page--
    }
    let { data: { succeed, data } } = await allReq.reqAllAttributeData(payload)
    if (succeed) {
      if (data.total === 0) {
        message.warning('数据库中数据为空')
        return
      }
      commit(TYPES.UPDATE_PRODUCT_ATTRIBUTE_INFO, { data, page })
    } else {
      message.error('获取所有属性信息失败')
    }
  },
  // 搜索符合条件的数据
  async searchAttribute({commit,state},payload){
    let { page } = payload

    let { data: { succeed, data } } = await allReq.reqAllAttributeData(payload)
    if (succeed) {
      if (data.total === 0) {
        message.warning('搜索结果为空')
        return
      }
        commit(TYPES.UPDATE_PRODUCT_ATTRIBUTE_INFO, { data, page })
    }else{
      message.error('搜索失败，请联系管理员')
    }
  },


  // 添加产品属性信息
  async addProductAttributeInfo({ commit }, payload) {
    let { data: { succeed, data } } = await allReq.reqAddAttributeData(payload)
    if (succeed) {
      message.success('添加信息成功')
      // commit(TYPES.ADD_CAR_SERIES_VEHICLE_INFO,data)
    } else {
      message.error('添加信息失败')
    }
  },
  // 删除产品属性
  async deleteProductAttributeInfo({ commit }, payload) {
    let { data: { succeed, data } } = await allReq.reqDeleteAttributeData(payload)
    if (succeed) {
      message.success('删除属性信息成功')
    } else {
      message.error('删除属性信息失败')
    }
  },
  // 修改产品属性
  async modiProductAttributeInfo({ commit }, payload) {
    let { data: { succeed, data } } = await allReq.reqModiAttributeData(payload)
    if (succeed) {
      message.success('修改属性信息成功')
      // commit(TYPES.MODI_PRODUCT_ATTRIBUTE_INFO,data)
    } else {
      message.error('修改属性信息失败')
    }
  },


  // 修改当前显示的属性页码
  updateCurrentAttributeInfoPage({ commit }, page) {
    commit(TYPES.UPDATE_CURRENT_ATTRIBUTE_INFO_PAGE, page)
  },

  // 产品添加页面 -----------------------
  // 获取产品
  async getProductInfo({ commit }) {
    let { data: { succeed, data } } = await allReq.reqAllProductInfo()
    // console.log(data)
    if (succeed) {
      commit(TYPES.GET_PRODUCT_INFO, data)
    } else {
      message.error('获取产品信息失败')
    }
  },

  // 添加产品信息
  async addProductInfo({ commit }, payload) {
    let { data: { succeed, data } } = await allReq.reqAddProductCategory(payload)
    if (succeed) {
      message.success('产品添加成功')
      commit(TYPES.ADD_PRODUCT_INFO, data)
    } else {
      message.error('产品添加失败，请刷新页面')
    }
  },
  // 修改产品信息
  async modiProductInfo({ commit }, payload) {
    let { data: { succeed, data } } = await allReq.reqModiProductCategory(payload)
    if (succeed) {
      message.success('修改产品信息成功')
      commit(TYPES.MODI_PRODUCT_INFO, data)
    } else {
      message.error('修改产品信息失败')
    }
  },

  // 删除产品信息
  async deleteProductInfo({ commit }, payload) {
    let { data: { succeed, data } } = await allReq.reqDeleteProductCategory(payload)
    if (succeed) {
      message.success('删除产品信息成功')
      commit(TYPES.DELETE_PRODUCT_INFO, payload)
    } else {
      message.error('删除产品信息失败')
    }
  },



  // 车型车系页面 -----------------------



  // 获取车系车型的所有信息
  async getCarSeriesVehicleInfo({ commit }, payload) {
    let { page } = payload
    let { data: { succeed, data } } = await allReq.reqCarSeriesVehicleInfo(payload)
    if (succeed) {
      if (data.total === 0) {
        message.warning('车系车型数据为空')
        return
      }
      if (Math.ceil(data.total/10)<page) {
        page--
        commit(TYPES.UPDATE_CAR_SERIES_VEHICLE_INFO, { data, page })
        return 
      }
      commit(TYPES.UPDATE_CAR_SERIES_VEHICLE_INFO, { data, page })
    } else {
      message.error('获取车系车型信息失败')
    }
  },
  
  // 修改当前显示的属性页码
  updateCarSeriesVehicleInfo({ commit }, page) {
    commit(TYPES.UPDATE_CAE_SERIES_VEHICLE_PAGE, page)
  },
  // 获取全部车系
  async getAllCarSeries({ commit }) {
    let { data: { succeed, data } } = await allReq.reqAllCarSeries()
    if (succeed) {
      commit(TYPES.GET_ALL_CAR_SERIES, data)
    }
  },
  // 添加车系车系
  async addCarSeriesOrVehicle({ commit }, payload) {
    let { data: { succeed, data } } = await allReq.reqAddCarCarSeriesVehicle(payload)
    if (succeed) {
      message.success('添加车系车型成功')
      // commit(TYPES.ADD_CAR_SERIES_VEHICLE_INFO,data)
    } else {
      message.error('添加车系车型失败')
    }
  },
  // 修改车型车系
  async modiCarSeriesOrVehicle({ commit }, payload) {
    let { data: { succeed, data } } = await allReq.reqModiCarCarSeriesVehicle(payload)
    if (succeed) {
      message.success('修改车系车型成功')
      // commit(TYPES.MODI_CAR_SERIES_VEHICLE_INFO,data)
    } else {
      message.error('修改车系车型失败')
    }
  },
  // 删除车型车系
  async deleteCarSeriesOrVehicle({ commit }, payload) {
    let { data: { succeed, data } } = await allReq.reqDeleteCarSeriesVehicle(payload)
    if (succeed) {
      message.success('删除车系车型成功')
      // commit(TYPES.ADD_CAR_SERIES_VEHICLE_INFO,data)
    } else {
      message.error('删除车系车型失败')
    }
  },

}