import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { PublicRoute } from './PrivateRoute/PrivateRoute';

const App = () => {
  return (
    <>

      <ToastContainer  position="top-center" />
        <Outlet />
    </>
  );
};

export default App;