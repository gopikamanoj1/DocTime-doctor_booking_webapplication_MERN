// import React, { useEffect, useState } from "react";
// import backgroundImage from "../../../public/Banner/doctor-taking-notes-clipboard-welllit-hospital-corridor-providing-ample-space-additional-content.jpg"; // Adjust the path to your image file
// import axiosInstance from "../../AxiosConfig/axiosInstance";
// import { useNavigate } from "react-router-dom";
// const Banner: React.FC = () => {
//   const [search, setSearch] = useState("");
//   const [searchResult, setSearchResult] = useState([]);
//   const navigate = useNavigate();
//   useEffect(() => {
//     const getData = setTimeout(async () => {
//       const response = await axiosInstance.get(
//         `/api/auth/getSearchQuery?query=${search}`
//       );
//       if (response.data.status) {
//         setSearchResult(response.data.data);
//       }
//       console.log(response, "RESSS");
//     }, 50);
//     return () => clearTimeout(getData);
//   }, [search]);

//   const handleDoctorClick = (doctor: any) => {
//     navigate(`/viewDoctorDetails/${doctor._id}`);
//   };
//   return (
//     <div>
//       <section
//         className="relative   bg-cover bg-center bg-no-repeat "
//         style={{ backgroundImage: `url(${backgroundImage})` }}
//       >
//         <div className="absolute inset-0 bg-white/75 sm:bg-transparent sm:from-white/95 sm:to-white/25 ltr:sm:bg-gradient-to-r rtl:sm:bg-gradient-to-l"></div>
//         <div className="relative mx-auto max-w-screen-xl px-4 py-32 sm:px-6 lg:flex lg:h-screen lg:items-center lg:px-8">
//           <div className="max-w-xl text-center ltr:sm:text-left rtl:sm:text-right">
//             <h1 className="text-3xl font-extrabold sm:text-5xl">
//               Let us find your
//               <strong className="block font-extrabold text-cyan-950">
//                 Doctor{" "}
//               </strong>
//             </h1>
//             <p className="mt-4 max-w-lg sm:text-xl/relaxed">
//               "Your health is our priority. Find your perfect doctor, book an
//               appointment, and take the first step toward a healthier tomorrow."{" "}
//             </p>
//             <div className="mt-8 flex gap-0 text-center w-11/12  ">
//               {/* Input Field */}
//               <input
//                 type="text"
//                 placeholder="Search..."
//                 onChange={(e) => setSearch(e.target.value)}
//                 className="block  w-3/3 sm:w-2/3 bg-white px-12 py-3 text-sm font-medium text-black focus:outline-none "
//               />

//               <a
//                 // href=""
//                 className=" w-full sm:w-auto bg-cyan-950 px-16 flex  justify-center items-center  text-sm font-medium text-white shadow "
//               >
//                 Search
//               </a>
//             </div>
//             {searchResult && searchResult.length > 0 && (
//               <>
//                 <div className="w-11/12  h-36   flex flex-col overflow-y-auto gap-0.5 bg-white border border-solid ">
//                   {searchResult.map((doctor: any) => {

//                     return (
//                       <>
//                         {/* one  serch result */}
//                         <div
//                           className="flex-none w-full  h-16 flex cursor-pointer"
//                           onClick={() => handleDoctorClick(doctor)}
//                         >
//                           <div className="w-3/12  h-full flex justify-center items-center">
//                             {doctor.image ? (
//                               <>
//                                 <img
//                                   src={doctor.image}
//                                   className="w-14 h-14 rounded-full object-fill"
//                                   alt=""
//                                 />
//                               </>
//                             ) : (
//                               <>
//                                 <img
//                                   src="https://i.pinimg.com/564x/bf/b8/ce/bfb8ce06e5fe19bc0034b5a21c0ee178.jpg"
//                                   className="w-14 h-14 rounded-full object-fill"
//                                   alt=""
//                                 />
//                               </>
//                             )}
//                           </div>
//                           <div className="w-8/12  h-full flex flex-col ">
//                             <div className="w-full h-3/6  flex items-center justify-start ">
//                               <p className="text-md font-sans font-bold">
//                                 {doctor.name}
//                               </p>
//                             </div>
//                             <div className="w-full h-3/6   flex justify-start items-start ">
//                               <p className="text-md font-sans font-medium">
//                                 {doctor.specialization}
//                               </p>
//                             </div>
//                           </div>
//                         </div>
//                       </>
//                     );
//                   })}
//                 </div>
//               </>
//             )}
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default Banner;







import React, { useEffect, useState } from "react";
import backgroundImage from "../../../public/Banner/doctor-taking-notes-clipboard-welllit-hospital-corridor-providing-ample-space-additional-content.jpg"; // Adjust the path to your image file
import axiosInstance from "../../AxiosConfig/axiosInstance";
import { useNavigate } from "react-router-dom";
import './Banner.css'
const Banner = () => {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getData = setTimeout(async () => {
      const response = await axiosInstance.get(
        `/api/auth/getSearchQuery?query=${search}`
      );
      if (response.data.status) {
        setSearchResult(response.data.data);
      }
    }, 50);

    return () => clearTimeout(getData);
  }, [search]);

  const handleDoctorClick = (doctor:any) => {
    navigate(`/viewDoctorDetails/${doctor._id}`);
  };

  return (
    <div className="">
      <section
        className="relative   bg-cover bg-center bg-no-repeat "
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
 <div className="absolute inset-0  sm:bg-transparent sm:f sm:to-white/25 ltr:sm:bg-gradient-to-r rtl:sm:bg-gradient-to-l">          
        </div>
        <div className="relative mx-auto max-w-screen-xl px-4 py-32 sm:px-6 lg:flex lg:h-screen lg:items-center lg:px-8">
          <div className="max-w-xl text-center sm:text-left">
            <h1 className="text-3xl font-extrabold sm:text-5xl">
              Let us find your{" "}
              <strong className="block text-cyan-950">Doctor</strong>
            </h1>
            <p className="mt-4 sm:mt-6 max-w-lg text-sm sm:text-lg">
              "Your health is our priority. Find your perfect doctor, book an
              appointment, and take the first step toward a healthier tomorrow."
            </p>
            <div className="mt-6 flex gap-0">
              <input
                type="text"
                placeholder="Search..."
                onChange={(e) => setSearch(e.target.value)}
                className="w-2/3 sm:w-1/2 bg-white px-4 py-2 text-sm text-black"
              />
              <button className="bg-cyan-950 px-4 py-2 text-white font-medium">
                Search
              </button>
            </div>

            {searchResult.length > 0 && (
              <div className="mt-4 max-w-xl bg-white border border-gray-200 rounded-lg overflow-y-auto h-36">
                {searchResult.map((doctor:any) => (
                  <div
                    key={doctor._id}
                    className="flex items-center p-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleDoctorClick(doctor)}
                  >
                    <img
                      src={doctor.image || "https://via.placeholder.com/150"}
                      className="w-12 h-12 rounded-full mr-4"
                      alt={doctor.name}
                    />
                    <div>
                      <p className="font-bold">{doctor.name}</p>
                      <p className="text-sm text-gray-600">{doctor.specialization}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Banner;
