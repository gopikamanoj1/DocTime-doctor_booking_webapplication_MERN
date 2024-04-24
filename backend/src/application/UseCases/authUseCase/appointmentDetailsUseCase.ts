export default function appointmentDetailsUseCase(dependencies: any) {
    const { userRepositery } = dependencies.repositery;

    const executeFunction = async (data: any) => { 
        try {
            const response = await userRepositery.appointmentDetails(data);
            
            
            if (response.status) {
                return { status: true, data: response.data };
            } else {
                return { status: false, message: response.message };
            }
        } catch (error) {
            console.log(error);
            return { status: false, message: "Error in bookAppointmentUseCase" };
        }
    };

    return { executeFunction };
}
