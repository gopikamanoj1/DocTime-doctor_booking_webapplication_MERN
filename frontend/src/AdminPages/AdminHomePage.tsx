import AdminSidebar from "../AdminComponent/SideNavBar/SideNavBar";
import AdminLayout from "../AdminComponent/LayoutComponent/AdminLayout";
import DonutChart from "../AdminComponent/Graph/DonutChart";
import PieChart from "../AdminComponent/Graph/PieChart";
import BarChart from "../AdminComponent/Graph/BarChart";

function AdminHomePage() {
  return (
    <div>
  
      <>
        <AdminLayout>
          <AdminSidebar />
         
          <div className="flex" >
          <DonutChart/>
          <PieChart/>
          </div>
        

        </AdminLayout>
      </>
    </div>
  );
}

export default AdminHomePage;
