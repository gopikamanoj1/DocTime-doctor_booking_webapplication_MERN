import mongoose, { Schema, Types } from "mongoose";

const messageSchema=new Schema ({

    senderId:{type:Schema.Types.ObjectId,required:true},
    receiverId:{type:Schema.Types.ObjectId,required:true},
    content:{type:String,required:true},
    type: { type: String, enum: ['text', 'image', 'video', 'voice_note'], required: true },
    read:{type:Boolean , required:true ,default:false},
    converstationId:{type:String },
    timestamp: { type: Date, default: Date.now },

})

const Messages = mongoose.model("Messages", messageSchema);

export {
    Messages,
};