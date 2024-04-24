export default function handleDoctorBlockUseCase(dependencies: any) {
    const {   adminRepository } = dependencies.repositery;

    const executeFunction = async (doctorId: any) => {
        try {
            console.log(doctorId,"doctorIddoctorId");
            
            const response = await adminRepository.handleDoctorBlock(doctorId);
            if (response.status) {
                return { status: true, data: response.data };
            } else {
                return { status: false, message: response.message || "Doctor blocking/unblocking failed" };
            }
        } catch (error) {
            console.error("Error in handleDoctorBlockUseCase:", error);
            return { status: false, message: "Error in handleDoctorBlockUseCase" };
        }
    };

    return { executeFunction };
}
