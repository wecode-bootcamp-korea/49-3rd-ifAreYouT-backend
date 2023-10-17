const { promotionService } = require('../services');

const showPromotion = async (req, res) => {
  try {
    const data = await promotionService.showPromotion();
    res.status(201).json({
      message: 'PAYMENT METHOD SELECTED',
      data: data,
    });
  } catch (error) {
    console.log('error!', error);
    res.status(error.status).json({ message: error.message });
  }
};

module.exports = { showPromotion };
