import React from 'react';
import './UserProfile.css'
function UserProfile() {
  return (
    <div className='user'>  
      <section className="container">
        <header>My Profile</header>
        <form className="form" action="#">
          <div className="input-box">
            <label> Name</label>
            <input required placeholder="Enter full name" type="text" />
          </div>
           <div className="input-box">
              <label>Phone Number</label>
              <input required placeholder="Enter phone number" type="tel" />
            </div>
          <div className="column">
           
            <div className="input-box">
              <label>Birth Date</label>
              <input required placeholder="Enter birth date" type="date" />
            </div>
            <div className="input-box">
              <label>Age</label>
              <input required placeholder="Enter age" type="tel" />
            </div>
            
          </div>
          <div className="gender-box">
            <label>Gender</label>
            <div className="gender-option">
              <div className="gender">
                <input checked name="gender" id="check-male" type="radio" />
                <label htmlFor="check-male">Male</label>
              </div>
              <div className="gender">
                <input name="gender" id="check-female" type="radio" />
                <label htmlFor="check-female">Female</label>
              </div>
             
            </div>
            
          </div>
          <div className="input-box address">
            <label>Address</label>
            <input required placeholder="Enter street address" type="text" />
            <div className="column">
              <div className="select-box">
                <select className='opt'>
                  <option hidden>State</option>
                  <option>Kerala</option>
                  <option>Karnataka</option>
                  <option>Tamilnadu</option>
                </select>
              </div>
              <input required placeholder="Enter your city" type="text" />
            </div>
          </div>
          <button type="submit">Submit</button>
        </form>
      </section>
    </div>
  );
}

export default UserProfile;
