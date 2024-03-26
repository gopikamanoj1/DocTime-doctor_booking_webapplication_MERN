export default function updateDoctorProfileUseCase(dependencies: any) {
  const { doctorRepositery } = dependencies.repositery;

  const executeFunction = async (data: any) => {
  try {
    
    const response=await doctorRepositery.updateDoctorProfile(data)
    
    if (response.status) {
        return { status: true, data: response.data };
      } else {
        return { status: false, message: response.message };
      }
  } catch (error) {
    console.log(error,"error in  updateDoctorProfileUseCase");
    
  }
  };

  return { executeFunction };
}



