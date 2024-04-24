
export default function adminLoginUseCase  (dependencies:any){
    const {   adminRepository } = dependencies.repositery;
    const executeFunction=async (data:any)=>{
        const responce= await adminRepository.findAdmin(data.email)
        if(responce.status){
            return {status:true,data:responce.data}
        }else{
            return {status:false,message:responce.messege}
        }
    }
    return {executeFunction}
}
