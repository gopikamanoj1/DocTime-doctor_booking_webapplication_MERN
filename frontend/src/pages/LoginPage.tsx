import React, { Fragment } from 'react';
import Login from '../components/Login/Login';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
function LoginPage() {
  return (
    <div>
      <Fragment>
        {/* <Navbar />  */}
        <Login />
        <Footer/>
      </Fragment>
    </div>
  );
}

export default LoginPage;
