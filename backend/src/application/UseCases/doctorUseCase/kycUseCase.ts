// kycUseCase.ts
export default function kycUseCase(dependencies: any) {
  const { doctorRepositery } = dependencies.repositery;

  const executeFunction = async (data: any) => {
      try {
          console.log('this is data', data);
          const response = await doctorRepositery.kycAuth(data);
          return response;
      } catch (error) {
          console.error("Error in kycUseCase:", error);
          return { status: false, message: "An error occurred in the use case" };
      }
  };

  return { executeFunction };
}
