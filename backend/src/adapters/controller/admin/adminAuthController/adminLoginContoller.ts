import { Request, Response } from "express";
export default (dependencies: any) => {
  

  const {adminLoginUseCase}=dependencies.useCase
  const adminLoginController = async (req: Request, res: Response) => {
   
    const {email,password}=req.body
    console.log(req.body,"hfffffffffffh");

    const data={
      email,
      password,
    
    }
  const responce =await adminLoginUseCase(dependencies).executeFunction(data) 
  if(responce.status){
    res.json({status:true,data:responce.data})
  }else{
    res.json({status:false,message:responce.message})
  }
    
  };
  return adminLoginController;
};
