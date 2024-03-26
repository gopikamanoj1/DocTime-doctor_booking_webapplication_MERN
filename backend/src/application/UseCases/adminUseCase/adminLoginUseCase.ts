import { log } from "console";

export default function adminLoginUseCase  (dependencies:any){
    const {   adminRepository } = dependencies.repositery;

    const executeFunction=async (data:any)=>{
        
        console.log('this is dataa',data);

        const responce= await adminRepository.findAdmin(data.email)
        

        if(responce.status){
            return {status:true,data:responce.data}
        }else{
            return {status:false,message:responce.message}
        }
        
    }
    return {executeFunction}
}
