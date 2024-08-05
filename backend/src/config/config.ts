import dotenv from 'dotenv'
dotenv.config()
export default {
  port: process.env.PORT || 3000,
  mongo: {
    uri: 'mongodb+srv://gopikamanoj001:Gopika%40123@doctime.eyvgrkj.mongodb.net/doctime?retryWrites=true&w=majority&appName=doctime',
  },
};
     