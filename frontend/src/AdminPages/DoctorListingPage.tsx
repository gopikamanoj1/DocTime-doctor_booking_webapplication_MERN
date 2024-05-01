import AdminLayout from "../AdminComponent/LayoutComponent/AdminLayout";
import DoctorListing from "../AdminComponent/DoctorListing/DoctorListing";

const DoctorListingPage = () => {
  return (
    <>
      <AdminLayout>
        <DoctorListing />
      </AdminLayout>
    </>
  );
};

export default DoctorListingPage;
