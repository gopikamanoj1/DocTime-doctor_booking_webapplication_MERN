"use strict";
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
    const createPaymentIntentController = async (req, res) => {
        try {
            const { fees } = req.body;
            const data = { fees };
            const session = await stripe.checkout.sessions.create({
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
                success_url: `http://localhost:5173/successAppointment`,
                cancel_url: "http://localhost:5173/findDoctor",
                billing_address_collection: 'required',
                customer_email: 'customer@example.com',
            });
            res.json({ id: session.id });
        }
        catch (error) {
            console.log(error, "error in createPaymentIntentController ");
            res.json({ status: false, message: "Error in createPaymentIntentController" });
        }
    };
    return createPaymentIntentController;
};
