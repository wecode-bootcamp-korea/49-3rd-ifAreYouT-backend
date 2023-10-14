const {paymentService} = require("../services");

const showPaymentMethods = async (req,res) => {
  try {
    
    const data = await productService.showMain();
    res.status(201).json({
       message:"PAYMENT METHOD SELECTED",
       data:data
    });
  } catch (error) {
    console.log("error", error);
    res.status(error.status).json({ message: error.message });
  }

};
// const showPaymentOptions = async (req,res) => {
//   try{
//   const { productId } = req.params;
//   console.log("콘솔",productId);
//   const data = await productService.showSpecificProduct(productId);

//   res.status(201).json({ 
//     message: "show specific product",
//     data:data });
//   }
 
//     catch (error) {
//       console.log("error", error);
//       res.status(error.status).json({ message: error.message });
//   }

//   };
//   const showCalcelFeeAgreement = async (req,res) => {
//     try{
//     const { category } = req.params;
   
//    const data = await productService.showCategory(category);
  
//     res.status(201).json({ 
//       message: "SHOW CATEGORY",
//       data:data });
//     }
   
//       catch (error) {
//         console.log("error", error);
//         res.status(error.status).json({ message: error.message });
//     }
  
//     };

module.exports = {
  showPaymentMethods,
//   showPaymentOptions,
//   showCalcelFeeAgreement
};
