const cloudinary = require('cloudinary').v2;
require('dotenv').config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
});
const signUpload = async () => {
  const timestamp = Math.round(new Date().getTime() / 1000);
  const signature = await cloudinary.utils.api_sign_request(
    {
      timestamp,
      eager: 'c_pad,h_300,w_400|c_crop,h_200,w_260',
      folder: 'my_products'
    },

    process.env.CLOUDINARY_SECRET
  );
  return { timestamp, signature };
};

module.exports = { cloudinary, signUpload };
