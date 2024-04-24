export default function getAvailableSlotUseCase(dependencies: any) {
    const { userRepositery } = dependencies.repositery;

    const executeFunction = async (id: string) => { // Accept ID as a parameter
        try {
            // Pass the ID to the repository method
            const response = await userRepositery.getAvailableSlot(id);
            
            if (response.status) {
                return { status: true, data: response.data };
            } else {
                return { status: false, message: response.message };
            }
        } catch (error) {
            console.log(error);
            return { status: false, message: "Error in viewDoctorDetailsUseCase" };
        }
    };

    return { executeFunction };
}
