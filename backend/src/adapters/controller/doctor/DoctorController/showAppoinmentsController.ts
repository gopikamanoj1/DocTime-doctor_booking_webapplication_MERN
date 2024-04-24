import { Request, Response } from "express";
export default (dependecies: any) => {


  const { showAppoinmentsUseCase } = dependecies.useCase
  const showAppoinmentsController = async (req: Request, res: Response) => {

    try {
      const {doctorId } = req.body

      const data = {
        doctorId
      }
      

      const response = await showAppoinmentsUseCase(dependecies).executeFunction(data)

      console.log(response,"data cc");  

      if (response && response.status && response.data) {
        res.json({ status: true, data: response.data });

      } else {
        res.json({ status: false, message: "Data not found" });
      }
    } catch (error) {
      console.log(error, "error in viewDoctorDetailsController ")
    }

  };
  return showAppoinmentsController;
};
