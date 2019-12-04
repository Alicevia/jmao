import utils from "@/utils"

export default {
    // pages(state,getters){
    //     let {iconList} = state
    //     let pages = []
    //     iconList.forEach((item,index)=>{
 
    //          let page = Math.floor(index/8)
    //          if (!pages[page]) {
    //              pages[page] =[]
    //          }
    //          pages[page].push(item)
    //     })
    //     return pages
    //  },
   



    // 显示产品属性页面
    showProductAttribute(state){
      let {
        currentAttributeInfoPage,
        allAttributeInfo,
        search,
        currentSearchPage,
        searchAttributeInfo
      } = state
      let attributeAry = allAttributeInfo[currentAttributeInfoPage]||[]
      if (search.trim()==='') {
        return attributeAry
      }

    },
    // 显示产品
    showProductList(state){
      let {productInfo} = state
      let productList = productInfo.productList
      productList = utils.changeAry(productList,10)
      return productList
    },
    // 显示车型车系
    showCarSeriesVehicle(state){
      let {allSeriesVhicleInfo,currentCarSeriesPage} = state
      let newAllSeriesVhicleInfo = allSeriesVhicleInfo[1]||[]
      newAllSeriesVhicleInfo = utils.changeAry(newAllSeriesVhicleInfo,10)
      let newAry = newAllSeriesVhicleInfo[currentCarSeriesPage-1]
      return newAry 
    }

}