import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";

const DoctorProfile: React.FC = () => {

  const navigate=useNavigate()


  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [specialization, setSpecialization] = useState<string>("");
  const [street, setStreet] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [state, setState] = useState<string>("");
  const [zipcode, setZipcode] = useState<string>("");
  const [fees, setFees] = useState<string>("");
  const [image, setImage] = useState<string | ArrayBuffer | null>(null);
  const [age, setAge] = useState<string>("");
  const [dob, setDOB] = useState<Date | null>(null);
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
  const [zipcodeError, setZipcodeError] = useState<string | null>(null);
  const [feesError, setFeesError] = useState<string | null>(null);
  const [ageError, setAgeError] = useState<string | null>(null);
  const [dobError, setDOBError] = useState<string | null>(null);

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
  const handleCancel=async ()=>{
navigate('/doctorHome')
  }

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

  const validateDOB = (value: Date | null) => {
    if (!value) {
      setDOBError("Date of birth is required");
      return false;
    }
    setDOBError(null);
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

  const validateZipcode = (value: string) => {
    const zipcodeRegex = /^\d{5}$/;
    if (!value) {
      setZipcodeError("Zipcode is required");
      return false;
    }
    if (!zipcodeRegex.test(value)) {
      setZipcodeError("Invalid zipcode format");
      return false;
    }
    setZipcodeError(null);
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
    const isZipcodeValid = validateZipcode(zipcode);
    const isFeesValid = validateFees(fees);
    const isAgeValid=validateAge(age);
    const isDobValid=validateDOB(dob);

    if (
      isNameValid &&
      isEmailValid &&
      isPhoneValid &&
      isSpecializationValid &&
      isStreetValid &&
      isCityValid &&
      isStateValid &&
      isZipcodeValid &&
      isFeesValid&&
      isAgeValid&&
      isDobValid

    )

    {
      try {
        const data = {
          name: name,
          email: email,
          phone: phone,
          specialization: specialization,
          street: street,
          city: city,
          state: state,
          zipcode: zipcode,
          fees: fees,
          image: image,
          age:age,
          dob:dob
        };

        const response = await axios
          .create({ withCredentials: true })
          .post("http://localhost:3000/api/auth/updateDoctorProfile", data);

        console.log(response, "fronted res");

        if (response.data.data) {
          // Check the status property of the response data
          toast.success("Successfully Updated");
          localStorage.setItem("doctorProfile", JSON.stringify(response.data));

          // toast.success("hy");
        } else {
          toast.error("Error updating doctor profile");
        }
        console.log("updated");
      } 
      catch (error) {
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
      setZipcodeError(null);
      setFeesError(null);
      setAgeError(null);
      setDOBError(null);
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
    zipcodeError,
    feesError,
    ageError,
    dobError
  ]);

  useEffect(() => {
    // Fetch data from local storage
    const doctorProfileData = JSON.parse(localStorage.getItem("doctorProfile") || "{}");
    const storedName = doctorProfileData.data.name || '';
    const storedEmail = doctorProfileData.data.email || '';
    const storedPhone = doctorProfileData.data.phone || '';
    const storedSpecialization = doctorProfileData.data.specialization || '';
    const storedStreet = doctorProfileData.data.address.street || '';
    const storedCity = doctorProfileData.data.address.city || '';
    const storedState = doctorProfileData.data.address.state || '';
    const storedZipcode = doctorProfileData.data.address.zipCode || '';
    const storedFees = doctorProfileData.data.fees || '';
    const storedImage = doctorProfileData.data.image || '';
    const storedAge=doctorProfileData.data.age || '';
    const storedDob=doctorProfileData.data.dob || '';
  
    // Update state with fetched data
    setName(storedName);
    setEmail(storedEmail);
    setPhone(storedPhone);
    setSpecialization(storedSpecialization);
    setStreet(storedStreet);
    setCity(storedCity);
    setState(storedState);
    setZipcode(storedZipcode);
    setFees(storedFees);
    setImage(storedImage);
    setAge(storedAge);
    setDOB(storedDob)
  }, []);
  

  return (
    <div className="min-h-screen p-6 bg-gray-100 flex items-center justify-center">
      <div>
        <div>
          <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
            <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
              <div className="text-gray-900">
                <p className="font-medium text-lg">Personal Details</p>
                <p>Please fill out all the fields.</p>

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
              </div>

              <div className="lg:col-span-2">
                <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-2">
                  <div className="md:col-span-2">
                    <label htmlFor="full_name"> Name</label>
                    <input
                      style={{ fontWeight: "bold", color: "blue" }}
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
                      <p className="text-red-500 text-xs mt-1">{nameError}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="email">Email Address</label>
                    <input
                      style={{ fontWeight: "bold", color: "blue" }}
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
                      <p className="text-red-500 text-xs mt-1">{emailError}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="phone">Phone Number</label>
                    <input
                      style={{ fontWeight: "bold", color: "blue" }}
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
                      <p className="text-red-500 text-xs mt-1">{phoneError}</p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="age">Age</label>
                    <input
                                          style={{ fontWeight: "bold", color: "blue" }}

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
                      <p className="text-red-500 text-xs mt-1">{ageError}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="dob">Date of Birth</label>
                    <br />
                    
                    <DatePicker
                    
                      selected={dob}
                      onChange={(date: Date | null) => {
                        setDOB(date);
                        validateDOB(date);
                      }}
                      
                      dateFormat="yyyy-MM-dd"
                      className={`h-10 border mt-1 rounded px-4 w-full ${
                        dobError ? "border-red-500" : "bg-gray-50"
                      }`}
                    />
                    
                    {dobError && (
                      <p className="text-red-500 text-xs mt-1">{dobError}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="specialization">Specialization</label>
                    <select
                      name="specialization"
                      id="specialization"
                      className={`h-10 border mt-1 rounded px-4 w-full ${
                        specializationError ? "border-red-500" : "bg-gray-50"
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
                      <option value="Gastroenterology">Gastroenterology</option>
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
                    <label htmlFor="fees">Fees</label>
                    <input
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
                      <p className="text-red-500 text-xs mt-1">{feesError}</p>
                    )}
                  </div>

                  <div className="md:col-span-2">
                    <label htmlFor="address">Street</label>
                    <input
                      style={{ fontWeight: "bold", color: "blue" }}
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
                      <p className="text-red-500 text-xs mt-1">{streetError}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="city">City</label>
                    <input
                      style={{ fontWeight: "bold", color: "blue" }}
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
                      <p className="text-red-500 text-xs mt-1">{cityError}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="state">State</label>
                    <input
                      style={{ fontWeight: "bold", color: "blue" }}
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
                      <p className="text-red-500 text-xs mt-1">{stateError}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="zipcode">Zipcode</label>
                    <input
                      style={{ fontWeight: "bold", color: "blue" }}
                      type="text"
                      name="zipcode"
                      id="zipcode"
                      className={`h-10 border mt-1 rounded px-4 w-full ${
                        zipcodeError ? "border-red-500" : "bg-gray-50"
                      }`}
                      value={zipcode}
                      onChange={(e) => {
                        setZipcode(e.target.value);
                        validateZipcode(e.target.value);
                      }}
                    />
                    {zipcodeError && (
                      <p className="text-red-500 text-xs mt-1">
                        {zipcodeError}
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
  );
};

export default DoctorProfile;
