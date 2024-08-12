"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Slot = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const slotSchema = new mongoose_1.default.Schema({
    doctor: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'Doctor',
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date
    },
    isMultipleDays: {
        type: Boolean,
        default: false
    },
    daysOfWeek: [String],
    slots: [{
            time: String,
            duration: String,
            available: {
                type: Boolean,
                default: true
            }
        }],
});
const Slot = mongoose_1.default.model('Slot', slotSchema);
exports.Slot = Slot;
