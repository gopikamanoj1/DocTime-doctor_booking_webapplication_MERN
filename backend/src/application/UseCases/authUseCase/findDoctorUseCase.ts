
export default function findDoctorUseCase(dependencies: any) {
    const {   doctorRepositery } = dependencies.repositery;

    const executeFunction = async (requestData: any) => {
        try {
            console.log('haaaaaaaa');
            
            const response = await doctorRepositery.getAllDoctors(requestData);
            console.log(response,"finding card");
            
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
