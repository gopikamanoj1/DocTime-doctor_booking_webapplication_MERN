import { Request, Response } from "express";
export default (dependecies: any) => {
  

  const { getDoctorConverstationsUseCase}=dependecies.useCase
  const  getDoctorConverstationsController= async (req: Request, res: Response) => {
   
    try { 
            const {id}=req.query
            const data={
                id
            }
            console.log(data,"data");
            
        const response = await getDoctorConverstationsUseCase(dependecies).executeFunction(data);
        

        if (response && response.status && response.data) {
            res.json({ status: true, data: response.data });
    
        } else {
            res.json({ status: false, message: "Data not found" });
        }
    } catch (error) {
        console.error("Error in getConverstationsUseCase:", error);
        res.status(500).json({ status: false, message: "Internal server error" });
    }
    
  };
  return getDoctorConverstationsController;
};
