import React from 'react';

interface DoctorAnalyticsProps {
  patientsSeen: number;
  appointmentSuccessRate: number;
  patientDemographics: {
    gender: string;
    count: number;
  }[];
}

const DoctorAnalytics: React.FC<DoctorAnalyticsProps> = ({
  patientsSeen,
  appointmentSuccessRate,
  patientDemographics,
}) => {
  return (
    <div className="bg-white rounded shadow p-6">
      <h2 className="text-2xl font-semibold mb-4">Practice Analytics</h2>
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-gray-100 p-4 rounded">
          <h3 className="text-lg font-semibold mb-2">Patients Seen</h3>
          <p className="text-gray-800">{patientsSeen}</p>
        </div>
        <div className="bg-gray-100 p-4 rounded">
          <h3 className="text-lg font-semibold mb-2">Appointment Success Rate</h3>
          <p className="text-gray-800">{appointmentSuccessRate}%</p>
        </div>
      </div>
      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-2">Patient Demographics</h3>
        <ul className="grid grid-cols-2 gap-2">
          {patientDemographics.map((demographic, index) => (
            <li key={index} className="flex items-center">
              <span className="text-gray-600 mr-2">{demographic.gender}:</span>
              <span className="text-gray-800">{demographic.count}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DoctorAnalytics;
