import { log } from "console";

export default function getKycDetailsUseCase(dependencies: any) {
    const {   adminRepository } = dependencies.repositery;

    const executeFunction = async (doctorId: any) => {
       try {
        const response = await adminRepository.getKycDetails(doctorId);
        console.log(response,"kittioo");
        
        
            if (response.status) {
                return { status: true, data: response };
            } else {
                return { status: false, message: response.message };
            }

    } catch (error) {
        console.log(error);
        
       }

    };

    return { executeFunction };
}
