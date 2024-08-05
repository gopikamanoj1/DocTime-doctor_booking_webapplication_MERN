import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";
import Loading from "../../Loading/Loading";
import axiosInstance from "../../AxiosConfig/axiosInstance";
import { useSelector } from "react-redux";

const DoctorProfile: React.FC = () => {
  const navigate = useNavigate();
  const Doctor = useSelector((state: any) => state.persisted.doctorAuth);

  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [specialization, setSpecialization] = useState<string>("");
  const [street, setStreet] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [state, setState] = useState<string>("");
  const [fees, setFees] = useState<string>("");
  const [image, setImage] = useState<string | ArrayBuffer | null>(null);
  const [age, setAge] = useState<string>("");
  const [loading, setLoading] = useState(false);

  // ===========================================================================
  // FOR VALIDATION ERROR STATES
  // ===========================================================================

  const [nameError, setNameError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [phoneError, setPhoneError] = useState<string | null>(null);
  const [specializationError, setSpecializationError] = useState<string | null>(
    null
  );
  const [streetError, setStreetError] = useState<string | null>(null);
  const [cityError, setCityError] = useState<string | null>(null);
  const [stateError, setStateError] = useState<string | null>(null);
  const [feesError, setFeesError] = useState<string | null>(null);
  const [ageError, setAgeError] = useState<string | null>(null);

  const handleImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ): Promise<void> => {
    const file: File | null = event.target.files ? event.target.files[0] : null;
    if (file) {
      const convertedFile: string | ArrayBuffer | null = await convertToBase64(
        file
      );
      if (event.target.id === "imageInput") {
        setImage(convertedFile);
      }
    }
  };
  const handleCancel = async () => {
    navigate("/doctorHome");
  };

  const handleUpdateEmailClick = () => {
    navigate("/UpdateEmailForDoc");
  };

  const convertToBase64 = (
    file: File
  ): Promise<string | ArrayBuffer | null> => {
    return new Promise((resolve) => {
      const reader: FileReader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        resolve(reader.result);
      };
      reader.onerror = () => {
        resolve(null);
      };
    });
  };

  const validateAge = (value: string) => {
    const ageRegex = /^\d{1,3}$/;
    if (!value) {
      setAgeError("Age is required");
      return false;
    }
    if (!ageRegex.test(value)) {
      setAgeError("Invalid age format");
      return false;
    }
    setAgeError(null);
    return true;
  };



  const validateName = (value: string) => {
    if (!value) {
      setNameError("Name is required");
      return false;
    }
    setNameError(null);
    return true;
  };

  const validateEmail = (value: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!value) {
      setEmailError("Email is required");
      return false;
    }
    if (!emailRegex.test(value)) {
      setEmailError("Invalid email format");
      return false;
    }
    setEmailError(null);
    return true;
  };

  const validatePhone = (value: string) => {
    const phoneRegex = /^\d{10}$/;
    if (!value) {
      setPhoneError("Phone number is required");
      return false;
    }
    if (!phoneRegex.test(value)) {
      setPhoneError("Invalid phone number format");
      return false;
    }
    setPhoneError(null);
    return true;
  };

  const validateSpecialization = (value: string) => {
    if (!value) {
      setSpecializationError("Specialization is required");
      return false;
    }
    setSpecializationError(null);
    return true;
  };

  const validateStreet = (value: string) => {
    if (!value) {
      setStreetError("Street is required");
      return false;
    }
    setStreetError(null);
    return true;
  };

  const validateCity = (value: string) => {
    if (!value) {
      setCityError("City is required");
      return false;
    }
    setCityError(null);
    return true;
  };

  const validateState = (value: string) => {
    if (!value) {
      setStateError("State is required");
      return false;
    }
    setStateError(null);
    return true;
  };



  const validateFees = (value: string) => {
    if (!value) {
      setFeesError("Fees is required");
      return false;
    }
    if (isNaN(parseFloat(value))) {
      setFeesError("Fees must be a valid number");
      return false;
    }
    setFeesError(null);
    return true;
  };
  const handleSubmit = async () => {
    const isNameValid = validateName(name);
    const isEmailValid = validateEmail(email);
    const isPhoneValid = validatePhone(phone);
    const isSpecializationValid = validateSpecialization(specialization);
    const isStreetValid = validateStreet(street);
    const isCityValid = validateCity(city);
    const isStateValid = validateState(state);
    const isFeesValid = validateFees(fees);
    const isAgeValid = validateAge(age);

    if (
      isNameValid &&
      isEmailValid &&
      isPhoneValid &&
      isSpecializationValid &&
      isStreetValid &&
      isCityValid &&
      isStateValid &&
      isFeesValid &&
      isAgeValid 
    ) {
      try {
        setLoading(true); // Set loading to true when the form is submitted

        const data = {
          name: name,
          email: email,
          phone: phone,
          specialization: specialization,
          street: street,
          city: city,
          state: state,
          fees: fees,
          image: image,
          age: age,
        };

        const response = await axiosInstance.post(
          "/api/auth/updateDoctorProfile",
          data
        );

        console.log(response, "fronted res");
        setLoading(false); // Set loading to true when the form is submitted

        if (response.data.data) {
          // Check the status property of the response data
          toast.success("Successfully Updated");
          localStorage.removeItem("doctorProfile");
          localStorage.setItem(
            "doctorProfile",
            JSON.stringify(response.data.data)
          );
        } else {
          toast.error("Error updating doctor profile");
        }
        console.log("updated");
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setNameError(null);
      setEmailError(null);
      setPhoneError(null);
      setSpecializationError(null);
      setStreetError(null);
      setCityError(null);
      setStateError(null);
      setFeesError(null);
      setAgeError(null);
    }, 5000);
    return () => clearTimeout(timer);
  }, [
    nameError,
    emailError,
    phoneError,
    specializationError,
    streetError,
    cityError,
    stateError,
    feesError,
    ageError,
  ]);

  useEffect(() => {
    // Fetch data from local storage
    const doctorProfileData = JSON.parse(
      localStorage.getItem("doctorProfile") || "{}"
    );
    console.log(doctorProfileData, "goooooooooooooo;opojzsp");

    if (doctorProfileData) {
      console.log("HERE", doctorProfileData);

      const storedSpecialization = doctorProfileData.specialization || "";
      const storedName = doctorProfileData.name || "";
      const storedEmail = doctorProfileData.email || "";
      const storedPhone = doctorProfileData.phone || "";
      if (doctorProfileData.address && doctorProfileData.address.length > 0) {
        const storedStreet = doctorProfileData?.address[0]?.street || "";
        const storedCity = doctorProfileData?.address[0]?.city || "";
        const storedState = doctorProfileData?.address[0]?.state || "";
        setStreet(storedStreet);
        setCity(storedCity);
        setState(storedState);
      }

      const storedFees = doctorProfileData.fees || "";
      const storedImage = doctorProfileData.image || "";
      const storedAge = doctorProfileData.age || "";
     

      // Update state with fetched data
      setName(storedName);
      setEmail(storedEmail);
      setPhone(storedPhone);
      setSpecialization(storedSpecialization);
      setFees(storedFees);
      setImage(storedImage);
      setAge(storedAge);
      console.log("updated");
    } else {
      console.warn("Address data is missing or undefined");
    }
  }, []);

  useEffect(() => {
  }, [name, email, phone, specialization, age, fees]);
  return (
    <div className="min-h-screen p-6 bg-gray-100 flex items-center justify-center">
      {loading ? (
        <Loading />
      ) : (
        <div className="min-h-screen p-6 bg-gray-100 flex items-center justify-center">
          <div>
            <div>
              <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
                <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
                  <div className="text-gray-900">
                    <p className="font-medium text-lg">Personal Details</p>

                    <div className="flex flex-col max-w-md p-6 dark:text-gray-100">
                      <label htmlFor="imageInput" className="cursor-pointer">
                        <input
                          type="file"
                          id="imageInput"
                          className="hidden"
                          accept="image/*"
                          onChange={handleImageChange}
                        />
                        <div className="relative">
                          <img
                            src={
                              (image as string) ||
                              "/imgs/istockphoto-1337144146-612x612.jpg"
                            }
                            alt=""
                            className="flex-shrink-0 object-cover h-64 rounded-sm sm:h-96 dark:bg-gray-500 aspect-square"
                          />
                          {image && (
                            <button
                              className="absolute top-0 right-0 p-2 bg-red-500 text-white rounded-full"
                              onClick={() => setImage(null)}
                            >
                              X
                            </button>
                          )}
                        </div>
                      </label>
                    </div>
                    <div>
                      <p className="text-xl text-gray-600">
                        Want to change your password?{" "}
                        <button
                          className="text-blue-500 hover:underline"
                          onClick={(e) => {
                            e.preventDefault();
                            // Add your logic to handle password change here
                            navigate("/changePasswordForDoc");
                          }}
                        >
                          Click here
                        </button>
                      </p>
                    </div>
                  </div>

                  <div className="lg:col-span-2">
                    <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-2">
                      <div className="md:col-span-2">
                        <label htmlFor="full_name" className="text-slate-400">
                          Name
                        </label>
                        <input
                          style={{ fontWeight: "bold", color: "black" }}
                          type="text"
                          name="full_name"
                          id="full_name"
                          className={`h-10 border mt-1 rounded px-4 w-full ${
                            nameError ? "border-red-500" : "bg-gray-50"
                          }`}
                          value={name}
                          onChange={(e) => {
                            setName(e.target.value);
                            validateName(e.target.value);
                          }}
                        />
                        {nameError && (
                          <p className="text-red-500 text-xs mt-1">
                            {nameError}
                          </p>
                        )}
                      </div>

                      {/* <div>
                      <label htmlFor="email" className="text-slate-400">
                        Email Address
                      </label>
                      <input
                        style={{ fontWeight: "bold", color: "black" }}
                        type="text"
                        name="email"
                        id="email"
                        className={`h-10 border mt-1 rounded px-4 w-full ${
                          emailError ? "border-red-500" : "bg-gray-50"
                        }`}
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          validateEmail(e.target.value);
                        }}
                      />
                      {emailError && (
                        <p className="text-red-500 text-xs mt-1">
                          {emailError}
                        </p>
                      )}
                    </div> */}

                      <div style={{ position: "relative" }}>
                        <div>
                          <label htmlFor="email">Email Address</label>
                          <div style={{ position: "relative" }}>
                            <input
                              style={{ fontWeight: "bold", color: "black" }}
                              type="text"
                              name="email"
                              id="email"
                              className={`h-10 border mt-1 rounded px-4 w-full ${
                                emailError ? "border-red-500" : "bg-gray-50"
                              }`}
                              value={email}
                              onChange={(e) => {
                                setEmail(e.target.value);
                                validateEmail(e.target.value);
                              }}
                              disabled // Disable the input field
                            />
                            {/* Absolute positioned link for updating email */}
                            <button
                              onClick={handleUpdateEmailClick}
                              className=" text-sm text-blue-500 mt-1 absolute right-4 top-1/2 transform -translate-y-1/2 underline"
                            >
                              Update Email
                            </button>
                          </div>
                          {emailError && (
                            <p className="text-red-500 text-xs mt-1">
                              {emailError}
                            </p>
                          )}
                        </div>
                      </div>

                      <div>
                        <label htmlFor="phone" className="text-slate-400">
                          Phone Number
                        </label>
                        <input
                          style={{ fontWeight: "bold", color: "black" }}
                          type="text"
                          name="phone"
                          id="phone"
                          className={`h-10 border mt-1 rounded px-4 w-full ${
                            phoneError ? "border-red-500" : "bg-gray-50"
                          }`}
                          value={phone}
                          onChange={(e) => {
                            setPhone(e.target.value);
                            validatePhone(e.target.value);
                          }}
                        />
                        {phoneError && (
                          <p className="text-red-500 text-xs mt-1">
                            {phoneError}
                          </p>
                        )}
                      </div>
                      <div>
                        <label htmlFor="age" className="text-slate-400">
                          Age
                        </label>
                        <input
                          style={{ fontWeight: "bold", color: "black" }}
                          type="text"
                          name="age"
                          id="age"
                          className={`h-10 border mt-1 rounded px-4 w-full ${
                            ageError ? "border-red-500" : "bg-gray-50"
                          }`}
                          value={age}
                          onChange={(e) => {
                            setAge(e.target.value);
                            validateAge(e.target.value);
                          }}
                        />
                        {ageError && (
                          <p className="text-red-500 text-xs mt-1">
                            {ageError}
                          </p>
                        )}
                      </div>

                      <div>
                        <label htmlFor="fees" className="text-slate-400">
                          Fees
                        </label>
                        <input
                          style={{ fontWeight: "bold", color: "black" }}
                          type="text"
                          name="fees"
                          id="fees"
                          className={`h-10 border mt-1 rounded px-4 w-full ${
                            feesError ? "border-red-500" : "bg-gray-50"
                          }`}
                          value={fees}
                          onChange={(e) => {
                            setFees(e.target.value);
                            validateFees(e.target.value);
                          }}
                        />
                        {feesError && (
                          <p className="text-red-500 text-xs mt-1">
                            {feesError}
                          </p>
                        )}
                      </div>

                      <div>
                        <label
                          htmlFor="specialization"
                          className="text-slate-400"
                        >
                          Specialization
                        </label>
                        <select
                          style={{ fontWeight: "bold", color: "black" }}
                          name="specialization"
                          id="specialization"
                          className={`h-10 border mt-1 rounded px-4 w-full ${
                            specializationError
                              ? "border-red-500"
                              : "bg-gray-50"
                          }`}
                          value={specialization}
                          onChange={(e) => {
                            setSpecialization(e.target.value);
                            validateSpecialization(e.target.value);
                          }}
                        >
                          <option value="">Select Specialization</option>
                          <option value="Cardiology">Cardiology</option>
                          <option value="Dermatology">Dermatology</option>
                          <option value="Endocrinology">Endocrinology</option>
                          <option value="Gastroenterology">
                            Gastroenterology
                          </option>
                          <option value="Neurology">Neurology</option>
                          <option value="Oncology">Oncology</option>
                          <option value="Orthopedics">Orthopedics</option>
                          <option value="Pediatrics">Pediatrics</option>
                          <option value="Psychiatry">Psychiatry</option>
                          <option value="Urology">Urology</option>
                          <option value="Ophthalmology">Ophthalmology</option>
                          <option value="Pulmonology">Pulmonology</option>
                          <option value="Hematology">Hematology</option>
                          <option value="Otolaryngology">Otolaryngology</option>
                          <option value="Nephrology">Nephrology</option>
                          <option value="Gynecology">Gynecology</option>
                          <option value="Radiology">Radiology</option>
                          <option value="Emergency Medicine">
                            Emergency Medicine
                          </option>
                        </select>
                        {specializationError && (
                          <p className="text-red-500 text-xs mt-1">
                            {specializationError}
                          </p>
                        )}
                      </div>
                    

                      <div className="md:col-span-2">
                        <label htmlFor="address" className="text-slate-400">
                          Street
                        </label>
                        <input
                          style={{ fontWeight: "bold", color: "black" }}
                          type="text"
                          name="street"
                          id="street"
                          className={`h-10 border mt-1 rounded px-4 w-full ${
                            streetError ? "border-red-500" : "bg-gray-50"
                          }`}
                          value={street}
                          onChange={(e) => {
                            setStreet(e.target.value);
                            validateStreet(e.target.value);
                          }}
                        />
                        {streetError && (
                          <p className="text-red-500 text-xs mt-1">
                            {streetError}
                          </p>
                        )}
                      </div>

                      <div>
                        <label htmlFor="city" className="text-slate-400">
                          City
                        </label>
                        <input
                          style={{ fontWeight: "bold", color: "black" }}
                          type="text"
                          name="city"
                          id="city"
                          className={`h-10 border mt-1 rounded px-4 w-full ${
                            cityError ? "border-red-500" : "bg-gray-50"
                          }`}
                          value={city}
                          onChange={(e) => {
                            setCity(e.target.value);
                            validateCity(e.target.value);
                          }}
                        />
                        {cityError && (
                          <p className="text-red-500 text-xs mt-1">
                            {cityError}
                          </p>
                        )}
                      </div>

                      <div>
                        <label htmlFor="state" className="text-slate-400">
                          State
                        </label>
                        <input
                          style={{ fontWeight: "bold", color: "black" }}
                          type="text"
                          name="state"
                          id="state"
                          className={`h-10 border mt-1 rounded px-4 w-full ${
                            stateError ? "border-red-500" : "bg-gray-50"
                          }`}
                          value={state}
                          onChange={(e) => {
                            setState(e.target.value);
                            validateState(e.target.value);
                          }}
                        />
                        {stateError && (
                          <p className="text-red-500 text-xs mt-1">
                            {stateError}
                          </p>
                        )}
                      </div>

                     
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <button
                    className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-8 rounded mr-4"
                    onClick={handleCancel}
                  >
                    CANCEL
                  </button>
                  <button
                    className="bg-cyan-950 hover:bg-cyan-900 text-white font-bold py-2 px-8 rounded "
                    onClick={handleSubmit}
                  >
                    SAVE CHANGES
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DoctorProfile;
