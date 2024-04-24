export default function getConvetsationIdForVideoCallUseCase(dependencies: any) {
    const { doctorRepositery } = dependencies.repositery;

    const executeFunction = async (data: any) => {
        try {
            
            const response = await doctorRepositery.getConvetsationIdForVideoCall(data);
            
            if (response.status) {
                return { status: true, data: response.data };
            } else {
                return { status: false, message: response.message };
            }
        } catch (error) {
            console.log(error);
            return { status: false, message: "Error in getConvetsationIdForVideoCallUseCase " };
        }
    };

    return { executeFunction };
}
