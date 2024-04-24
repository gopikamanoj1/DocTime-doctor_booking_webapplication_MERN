import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate, Link } from "react-router-dom";
import Loading from "../../Loading/Loading";
import axiosInstance from "../../AxiosConfig/axiosInstance";
const PatientProfile: React.FC = () => {
  const navigate = useNavigate();

  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [street, setStreet] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [state, setState] = useState<string>("");
  const [image, setImage] = useState<string | ArrayBuffer | null>(null);
  const [age, setAge] = useState<string>("");
  const [dob, setDOB] = useState<Date | null>(null);
  const [bloodGroup, setBloodGroup] = useState<string>("");
  const [gender, setGender] = useState<string>("");
  const [loading, setLoading] = useState(false);

  // Validation error states
  const [nameError, setNameError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [phoneError, setPhoneError] = useState<string | null>(null);
  const [streetError, setStreetError] = useState<string | null>(null);
  const [cityError, setCityError] = useState<string | null>(null);
  const [stateError, setStateError] = useState<string | null>(null);
  const [ageError, setAgeError] = useState<string | null>(null);
  const [dobError, setDOBError] = useState<string | null>(null);
  const [bloodGroupError, setBloodGroupError] = useState<string | null>(null);
  const [genderError, setGenderError] = useState<string | null>(null);

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

  const handleCancel = () => {
    navigate("/home");
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
  const handleUpdateEmailClick = () => {
 navigate('/updateEmail')
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

  const validateBloodGroup = (value: string) => {
    if (!value) {
      setBloodGroupError("Blood group is required");
      return false;
    }
    setBloodGroupError(null);
    return true;
  };
  const validateGender = (value: string) => {
    if (!value) {
      setGenderError("Gender is required");
      return false;
    }
    setGenderError(null);
    return true;
  };

  const handleSubmit = async () => {
    const isNameValid = validateName(name);
    const isEmailValid = validateEmail(email);
    const isPhoneValid = validatePhone(phone);
    const isStreetValid = validateStreet(street);
    const isCityValid = validateCity(city);
    const isStateValid = validateState(state);
    const isAgeValid = validateAge(age);
    const isDobValid = validateDOB(dob);
    const isBloodValid = validateBloodGroup(bloodGroup);
    const isGenderValid = validateGender(gender);
    if (
      isNameValid &&
      isEmailValid &&
      isPhoneValid &&
      isStreetValid &&
      isCityValid &&
      isStateValid &&
      isAgeValid &&
      isDobValid &&
      isBloodValid &&
      isGenderValid
    ) {
      try {
        setLoading(true); // Set loading to true when the form is submitted

        const data = {
          name: name,
          email: email,
          phone: phone,
          street: street,
          city: city,
          state: state,
          image: image,
          age: age,
          dob: dob,
          bloodGroup: bloodGroup,
          gender: gender,
        };

        const response = await axiosInstance
          .post('/api/auth/updatePatientProfile', data);
        localStorage.removeItem("User");

        console.log(response, "fronted res");
        setLoading(false); // Set loading to false after receiving the response

        if (response.data.data) {
          // Check the status property of the response data
          toast.success("Successfully Updated");

          // localStorage.removeItem("User");

          localStorage.setItem("User", JSON.stringify(response.data));

          // toast.success("hy");
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
    // Clear validation errors after 5 seconds
    const timer = setTimeout(() => {
      setNameError(null);
      setEmailError(null);
      setPhoneError(null);
      setStreetError(null);
      setCityError(null);
      setStateError(null);
      setAgeError(null);
      setDOBError(null);
      setBloodGroupError(null);
      setGenderError(null);
    }, 5000);
    return () => clearTimeout(timer);
  }, [
    nameError,
    emailError,
    phoneError,
    streetError,
    cityError,
    stateError,
    ageError,
    dobError,
    bloodGroupError,
    genderError,
  ]);

  useEffect(() => {
    // Fetch data from local storage
    const patientProfileData = JSON.parse(localStorage.getItem("User") || "{}");
    const storedName = patientProfileData.data.name;
    const storedEmail = patientProfileData.data.email;
    const storedPhone = patientProfileData.data.phone;
    const storedGender = patientProfileData.data.gender;
    const storedImage = patientProfileData.data.image;

    // Check if address array exists and has at least one address object
    const firstAddress =
      patientProfileData.data.address &&
      patientProfileData.data.address.length > 0
        ? patientProfileData.data.address[0]
        : {};

    const storedStreet = firstAddress.street || "";
    const storedCity = firstAddress.city || "";
    const storedState = firstAddress.state || "";

    const storedBloodGroup = patientProfileData.data.bloodGroup || "";
    // const storedImage = patientProfileData.data.image || '';
    const storedAge = patientProfileData.data.age || "";
    const storedDob = patientProfileData.data.dob || "";

    // Update state with fetched data
    setName(storedName);
    setEmail(storedEmail);
    setPhone(storedPhone);
    setGender(storedGender);
    setStreet(storedStreet);
    setCity(storedCity);
    setState(storedState);
    setBloodGroup(storedBloodGroup);
    setImage(storedImage);
    setAge(storedAge);
    setDOB(storedDob);
  }, []);

  return (
    <div className="min-h-screen p-6 bg-transparent flex items-center justify-center">
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
                    <p>Please fill out all the fields.</p>

                    <div className="flex flex-col max-w-md p-6 dark:text-gray-100">
                      <label
                        htmlFor="imageInput"
                        className=" text-slate-400 cursor-pointer"
                      >
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
        Want to change your password?{' '}
        <button
         
          className="text-blue-500 hover:underline"
          onClick={(e) => {
            e.preventDefault();
            // Add your logic to handle password change here
            navigate('/changePassword')
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
                        <label className="text-slate-400" htmlFor="full_name">
                          {" "}
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
                        <label  className="text-slate-400"  htmlFor="email">Email Address</label>
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
                        <label className="text-slate-400" htmlFor="phone">
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
                        <label className="text-slate-400" htmlFor="age">
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
                        <label className="text-slate-400" htmlFor="dob">
                          Date of Birth
                        </label>
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
                          <p className="text-red-500 text-xs mt-1">
                            {dobError}
                          </p>
                        )}
                      </div>
                      <div>
                        <label className="text-slate-400" htmlFor="blood_group">
                          Blood Group
                        </label>
                        <select
                          name="blood_group"
                          id="blood_group"
                          className={`h-10 border mt-1 rounded px-4 w-full ${
                            bloodGroupError ? "border-red-500" : "bg-gray-50"
                          }`}
                          value={bloodGroup}
                          onChange={(e) => {
                            setBloodGroup(e.target.value);
                            validateBloodGroup(e.target.value);
                          }}
                        >
                          <option value="">Select Blood Group</option>
                          <option value="A+">A+</option>
                          <option value="A-">A-</option>
                          <option value="B+">B+</option>
                          <option value="B-">B-</option>
                          <option value="AB+">AB+</option>
                          <option value="AB-">AB-</option>
                          <option value="O+">O+</option>
                          <option value="O-">O-</option>
                        </select>
                        {bloodGroupError && (
                          <p className="text-red-500 text-xs mt-1">
                            {bloodGroupError}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="text-slate-400" htmlFor="gender">
                          Gender
                        </label>
                        <select
                          name="gender"
                          id="gender"
                          className={`h-10 border mt-1 rounded px-4 w-full ${
                            genderError ? "border-red-500" : "bg-gray-50"
                          }`}
                          value={gender}
                          onChange={(e) => {
                            setGender(e.target.value);
                            validateGender(e.target.value);
                          }}
                        >
                          <option value="">Select Gender</option>
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                        </select>
                        {genderError && (
                          <p className="text-red-500 text-xs mt-1">
                            {genderError}
                          </p>
                        )}
                      </div>

                      <div className="md:col-span-2">
                        <label className="text-slate-400" htmlFor="address">
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
                        <label className="text-slate-400" htmlFor="city">
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
                        <label className="text-slate-400" htmlFor="state">
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
                  {/* <button
                className="bg-cyan-950 hover:bg-cyan-900 text-white font-bold py-2 px-8 rounded"
                onClick={handleSubmit}
                disabled={loading} 
            >
                {loading ? <Loading /> : "SAVE CHANGES"} 
            </button> */}
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

export default PatientProfile;
