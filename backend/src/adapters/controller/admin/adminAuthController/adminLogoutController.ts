import { Request, Response } from "express";
export default (dependencies: any) => {


  const { adminLogoutUseCase } = dependencies.useCase
  const adminLogoutController = async (req: Request, res: Response) => {
    const { email } = req.body
    const data = {
      email
    }
    const responce = await adminLogoutUseCase(dependencies).executeFunction(data)

    if (responce.status) {
      res.json({ status: true, data: responce.data})
    } else {
      res.json({ status: false, mmessege: responce.message })
    }
  };
  return adminLogoutController;
};
