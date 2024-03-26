import { log } from "console";

export default function adminDoctorUseCase(dependencies: any) {
    const {   adminRepository } = dependencies.repositery;

    const executeFunction = async (requestData: any) => {
        try {
            console.log('haaaaaaaa');
            
            const response = await adminRepository.getAllDoctors(requestData);
            // console.log(response,"ggggggggggggg");
            
            if (response.status) {
                return { status: true, data: response.doctors };
                
            } else {
                return { status: false, message: response.message };
            }
            
        } catch (error) {
            console.log(error);
            return { status: false, message: "Error in adminUserUseCase" };
        }

    };

    return { executeFunction };
}
