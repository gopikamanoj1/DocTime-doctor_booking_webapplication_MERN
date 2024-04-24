import { log } from "console";
import { Request, Response } from "express";
import { hashPassword } from "../../../../utils";

export default (dependencies: any) => {
    const { changePasswordUseCase } = dependencies.useCase;

    const changePasswordController = async (req: Request, res: Response) => {
        try {
            const { email, newPassword,currentPassword} = req.body

            const hashedCurrentPassword = await hashPassword(currentPassword);


            const hashedNewPassword = await hashPassword(newPassword);

            const data = {
                email,currentPassword, hashedNewPassword
            }


            const response = await changePasswordUseCase(dependencies).executeFunction(data)


            console.log(response,"contro res");
            

            if (response && response.status && response.data) {
                res.json({ status: true, data: response.data });

            } else {
                res.json({ status: false, message: "Data not found" });
            }

        } catch (error) {

        }
    };


    return changePasswordController;
};
