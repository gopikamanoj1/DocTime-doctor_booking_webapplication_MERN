import { Response,Request } from "express";

export default(dependencies:any)=>{
    const {addPrescriptionUseCase}=dependencies.useCase;
    const addPrescriptionController=async (req:Request,res:Response)=>{
      try {
        const {appointmentId,prescriptionDate, medicines }=req.body
        const data={
            appointmentId,prescriptionDate,medicines
        }
        console.log(data,"this is data");
        
        const response=await addPrescriptionUseCase(dependencies).executeFunction(data)
        if(response.status){
            res.status(200).json({ status: true, data:response.data  });

        }
        else {
            res.status(500).json({ status: false, message: response.message });
          }
      } catch (error) {
        console.log(error);
        res.status(500).json({ status: false, message: error });
      }
    }
    return addPrescriptionController;
}