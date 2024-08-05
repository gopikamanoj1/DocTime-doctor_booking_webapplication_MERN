"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (dependencies) => {
    const { addSlotUseCase } = dependencies.useCase;
    if (!addSlotUseCase) {
        console.log('EROOOOORRR addSlotController');
    }
    const addSlotController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { doctorId, startDate, endDate, slotTime } = req.body;
            const data = { doctorId, startDate, endDate, slotTime };
            const response = yield addSlotUseCase(dependencies).executeFunction(data);
            if (response.status) {
                res.status(200).json({ status: true, message: 'Slots added successfully' });
            }
            else {
                res.status(500).json({ status: false, message: response.message });
            }
        }
        catch (error) {
            console.log(error, "error in add slot controller");
            res.status(500).json({ status: false, message: 'Error in add slot controller' });
        }
    });
    return addSlotController;
};
