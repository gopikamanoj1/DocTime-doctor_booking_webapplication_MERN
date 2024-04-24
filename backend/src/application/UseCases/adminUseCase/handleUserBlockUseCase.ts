export default function handleUserBlockUseCase(dependencies: any) {
    const {   adminRepository } = dependencies.repositery;

    const executeFunction = async (userId: any) => {
        try {
            const response = await adminRepository.handleUserBlock(userId);
            if (response.status) {
                return { status: true, data: response.data };
            } else {
                return { status: false, message: response.message || "User blocking/unblocking failed" };
            }
        } catch (error) {
            console.error("Error in handleUserBlockUseCase:", error);
            return { status: false, message: "Error in handleUserBlockUseCase" };
        }
    };

    return { executeFunction };
}
