"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (dependencies) => {
    const { adminLoginUseCase } = dependencies.useCase;
    const adminLoginController = async (req, res) => {
        const { email, password } = req.body;
        const data = {
            email,
            password,
        };
        const responce = await adminLoginUseCase(dependencies).executeFunction(data);
        console.log(responce, "use ");
        if (responce.status) {
            res.json({ status: true, data: responce.data });
        }
        else {
            res.json({ status: false, message: responce.message });
        }
    };
    return adminLoginController;
};
