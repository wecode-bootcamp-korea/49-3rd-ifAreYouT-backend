const {promotionDao} = require("../models");

const showMain = async() => {
  
  const data = await productDao.showMain();
  // if (!res) {
  //   const error = new Error("NO PRODUCT");
  //   error.status = 400;
  //   throw error;
  // }
  console.log("service-he")
  // const ans = await productDao.showMain(req,res);//231002return을 어떻게 하는지
  return data;
};
const showSpecificProduct = async(productId) => {
 
  if(!productId){
    const error = new Error("NO_PRODUCT_ID");
    error.status = 400;
    throw error;
  }
  const data = await productDao.showSpecificProduct(productId);
  return data;

};
const showCategory = async(category) => {
 
  if(!category){
    const error = new Error("NO_EXISITNG_CATEGORY");
    error.status = 400;
    throw error;
  }
  const data = await productDao.showCategory(category);
  return data;

};

module.exports = { 
  showMain,
  showSpecificProduct,
  showCategory
 };