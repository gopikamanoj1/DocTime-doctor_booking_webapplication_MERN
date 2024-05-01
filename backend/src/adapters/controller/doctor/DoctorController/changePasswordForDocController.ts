import { log } from "console";
import { Request, Response } from "express";
import { hashPassword } from "../../../../utils";

export default (dependencies: any) => {
    const { changePasswordForDocUseCase } = dependencies.useCase;

    const changePasswordForDocController = async (req: Request, res: Response) => {
        try {
            const { email, newPassword,currentPassword} = req.body
            const hashedNewPassword = await hashPassword(newPassword);
            const data = {
                email,currentPassword, hashedNewPassword
            }
            const response = await changePasswordForDocUseCase(dependencies).executeFunction(data)
            console.log(response,"contro res")
            if (response && response.status && response.data) {
                res.json({ status: true, data: response.data });
            } else {
                res.json({ status: false, data: response.data });
            }
        } catch (error) {

            res.json({ status: false, data: "somehting went wrong" });

        }
    };


    return changePasswordForDocController;
};
