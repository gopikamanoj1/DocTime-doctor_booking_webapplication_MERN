
export default function kycStatusUseCase(dependencies: any) {
    const {   adminRepository } = dependencies.repositery;

    const executeFunction = async (doctorId: string, newStatus: string) => {
        try {
            const response = await adminRepository.changeKycStatus(doctorId, newStatus);
            
            if (response.status) {
                return { status: true, data: response };
            } else {
                return { status: false, message: "Failed to change KYC status" };
            }
        } catch (error) {
            console.error(error);
            return { status: false, message: "An error occurred while changing KYC status" };
        }
    };

    return { executeFunction };
}
