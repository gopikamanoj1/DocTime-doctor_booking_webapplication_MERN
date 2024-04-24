import React from 'react';
import { Link } from 'react-router-dom';
import './Cards.css';

function Cards() {
  return (
    <div className="cards-container">
      <div className="cards">
        <div className="card red">
          <Link to='/findDoctor'>
            <p className="tip">Find Your Doctor</p>
            <p className="second-text"><img src="" alt="" /></p>
          </Link>
        </div>
        <div className="card blue">
          <p className="tip">Book Appointment</p>
          <p className="second-text"></p>
        </div>
        <div className="card green">
          <Link to='/myprofile'>
            <p className="tip">Your Profile</p> 
            <p className="second-text"></p>
          </Link>
        </div>
      </div>  
    </div>
  );
}

export default Cards;
