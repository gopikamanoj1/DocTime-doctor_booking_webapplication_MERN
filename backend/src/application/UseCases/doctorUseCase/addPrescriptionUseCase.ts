

export default function addPrescriptionUseCase(dependencies: any) {
    const { doctorRepositery } = dependencies.repositery;
  
    const executeFunction = async (data: any) => {
    
      const response = await doctorRepositery.addPrescription(data);
    
      if (response.status) {
          return { status: true, data: response.data };
  
      } else {
        return { status: false, message: response.message };
      }
    };
  
    return { executeFunction };
  }
  