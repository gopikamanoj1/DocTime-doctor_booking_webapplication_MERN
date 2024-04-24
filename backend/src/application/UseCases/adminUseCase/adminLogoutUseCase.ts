
export default function adminLogoutUseCase  (dependencies:any){
    const {   adminRepository } = dependencies.repositery;
    const executeFunction=async (data:any)=>{
        const responce= await adminRepository.adminLogout(data.email)
        if(responce.status){
            return {status:true,data:responce.data}
        }else{
            return {status:false,mmessege:responce.messege}
        }
    }
    return {executeFunction}
}
