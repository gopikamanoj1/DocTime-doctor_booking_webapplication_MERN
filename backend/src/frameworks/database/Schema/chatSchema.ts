
import mongoose, { Schema, Types } from "mongoose";

const chatSchema = new mongoose.Schema({

    participants: [{
        senderId: { type: Schema.Types.ObjectId, required: true },
        recieverId: { type: Schema.Types.ObjectId, required: true },
        senderUnReadMessages: { type: Number, required: true, default: 0 },
        recievertUnReadMessages: { type: Number, required: true, default: 0 }
    }],
    messages: [{ type: Schema.Types.ObjectId, ref: "Messages" }],
    lastMessage: { type: Schema.Types.ObjectId, ref: "Messages" },
    isOnline: {
        type: Boolean,
        default: false
    },
    lastSeen: {
        type: String,
        default: ""
    },
},
    {
        timestamps: true

    });

const Chat = mongoose.model("Chat", chatSchema);

export {
    Chat
};
