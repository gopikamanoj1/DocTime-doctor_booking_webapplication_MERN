// import {User} from './userSchema'
// import { Admin } from './adminSchema'
// import { Doctor } from './doctorSchema'
// import { Slot } from './slotSchema'
// import { Appointment } from './appoinmentSchema'
// import { Messages } from './messegesSchema'
// import { Chat} from './chatSchema'
// import {Conversation} from './Converstations'

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



import { User } from './userSchema';
import { Admin } from './adminSchema';
import { Doctor } from './doctorSchema';
import { Slot } from './slotSchema';
import { Appointment } from './appoinmentSchema';
import { Messages } from './messegesSchema';
import { Chat } from './chatSchema';
import { Conversation } from './Converstations';
import { Prescription } from './prescriptionSchema';

interface DatabaseSchemas {
    User: typeof User;
    Admin: typeof Admin;
    Doctor: typeof Doctor;
    Slot: typeof Slot;
    Appointment: typeof Appointment;
    Messages: typeof Messages;
    Chat: typeof Chat;
    Conversation: typeof Conversation;
    Prescription: typeof Prescription;
}

const databaseSchemas: DatabaseSchemas = {
    User,
    Admin,
    Doctor,
    Slot,
    Appointment,
    Messages,
    Chat,
    Conversation,
    Prescription
};

export default databaseSchemas;
