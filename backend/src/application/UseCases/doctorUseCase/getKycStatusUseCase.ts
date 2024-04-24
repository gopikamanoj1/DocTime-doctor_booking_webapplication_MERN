// kycUseCase.ts
export default function getKycStatusUseCase(dependencies: any) {
    const { doctorRepositery } = dependencies.repositery;
  
    const executeFunction = async (data: string) => {
        try {
           
            const response = await doctorRepositery.getkycStatus(data);
            return {status:true,data:response.data};
        } catch (error) {
            console.error("Error in getKycStatusUseCase:", error);
            return { status: false, message: "An error occurred in the use case" };
        }
    };
  
    return { executeFunction };
  }
  