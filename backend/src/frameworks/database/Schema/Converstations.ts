

import mongoose, { Schema } from 'mongoose';

const conversationSchema = new mongoose.Schema({
    members: [{
       doctorId:{ type: Schema.Types.ObjectId, required: true, ref: "Doctor" },
       userId:{ type: Schema.Types.ObjectId, required: true, ref: "User" },
    }],
    lastUpdate: {
        type: Date,
        default: Date.now()
    },
    unreadMessageCount: Number,
});

const Conversation = mongoose.model('conversation', conversationSchema);

export {
    Conversation
}
