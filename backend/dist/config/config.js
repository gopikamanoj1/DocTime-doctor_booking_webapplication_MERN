"use strict";
// export default {
//     port :3000,
//     mongo:{
//         uri:'mongodb://127.0.0.1:27017/DocTime'
Object.defineProperty(exports, "__esModule", { value: true });
//     }
// }
exports.default = {
    port: process.env.PORT || 3000,
    mongo: {
        uri: process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/DocTime',
    },
};
