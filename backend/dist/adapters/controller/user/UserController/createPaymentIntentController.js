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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const stripe_1 = __importDefault(require("stripe"));
const stripe = new stripe_1.default('sk_test_51P181XSHTQQP3YX0NMqb6E0oinTGgmWcjLB1dSgCoJJ3s1IlQLZwqgaVdmoPSSdo8xDiijCH3WMMFjBikxyqSwqu00aX5OqiAh', {
    apiVersion: '2023-10-16',
});
exports.default = (dependecies) => {
    const { createPaymentIntentUseCase } = dependecies.useCase;
    const createPaymentIntentController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { fees } = req.body;
            const data = { fees };
            const session = yield stripe.checkout.sessions.create({
                payment_method_types: ["card"],
                line_items: [
                    {
                        price_data: {
                            currency: 'inr',
                            product_data: {
                                name: "Your Appointment Fee",
                            },
                            unit_amount: parseInt(fees) * 100
                        },
                        quantity: 1,
                    }
                ],
                mode: "payment",
                success_url: `https://doctime.live/successAppointment`,
                cancel_url: "https://doctime.live/findDoctor",
                billing_address_collection: 'required',
                customer_email: 'customer@example.com',
            });
            res.json({ id: session.id });
        }
        catch (error) {
            console.log(error, "error in createPaymentIntentController ");
            res.json({ status: false, message: "Error in createPaymentIntentController" });
        }
    });
    return createPaymentIntentController;
};
