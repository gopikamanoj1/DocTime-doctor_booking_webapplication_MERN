"use strict";
// import {User} from './userSchema'
// import { Admin } from './adminSchema'
// import { Doctor } from './doctorSchema'
// import { Slot } from './slotSchema'
// import { Appointment } from './appoinmentSchema'
// import { Messages } from './messegesSchema'
// import { Chat} from './chatSchema'
// import {Conversation} from './Converstations'
Object.defineProperty(exports, "__esModule", { value: true });
// export default {
//     User,
//     Admin,
//     Doctor,
//     Slot,
//     Appointment,
//     Messages,
//     Chat,
//     Conversation
// }
const userSchema_1 = require("./userSchema");
const adminSchema_1 = require("./adminSchema");
const doctorSchema_1 = require("./doctorSchema");
const slotSchema_1 = require("./slotSchema");
const appoinmentSchema_1 = require("./appoinmentSchema");
const messegesSchema_1 = require("./messegesSchema");
const chatSchema_1 = require("./chatSchema");
const Converstations_1 = require("./Converstations");
const prescriptionSchema_1 = require("./prescriptionSchema");
const consultSchema_1 = require("./consultSchema");
const databaseSchemas = {
    User: userSchema_1.User,
    Admin: adminSchema_1.Admin,
    Doctor: doctorSchema_1.Doctor,
    Slot: slotSchema_1.Slot,
    Appointment: appoinmentSchema_1.Appointment,
    Messages: messegesSchema_1.Messages,
    Chat: chatSchema_1.Chat,
    Conversation: Converstations_1.Conversation,
    Prescription: prescriptionSchema_1.Prescription,
    Consult: consultSchema_1.Consult
};
exports.default = databaseSchemas;
