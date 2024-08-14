import React from 'react';

const DescriptionAddSlot: React.FC = () => {
  return (
    <div className="p-6 sm:p-12 bg-gradient-to-r from-white to-gray-100 min-h-screen">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="p-6 sm:p-12">
          <h4 className="text-3xl font-bold mb-6 text-center text-blue-700">Creating Your Availability Slots</h4>
          <p className="text-lg mb-8 text-gray-700 text-center">
            <strong>Welcome, Doctor!</strong><br />
            To help patients book appointments, you need to set up your availability slots. Follow the steps below to create single-day and multiple-day slots.
          </p>

          <div className="border-t-2 border-gray-300 my-8"></div>
          <h2 className="text-3xl font-semibold mb-4 text-gray-800">Single Day Slot</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>
              Go to the <strong>'Manage Slots'</strong> section: Navigate to the <strong>'Manage Slots'</strong> section in your dashboard.
            </li>
            <li>
              Select <strong>'Add Single Day Slot'</strong>: Click on the <strong>'Add Single Day Slot'</strong> button.
            </li>
            <li>
              Choose the Date: Select the date for which you want to create the slot.
            </li>
            <li>
              Set the Time:
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li><strong>Start Time:</strong> Choose the start time for your slot.</li>
                <li><strong>End Time:</strong> Choose the end time for your slots.</li>
                <li><strong>Consultation Duration (minutes):</strong> Choose the  Duration for your Consultation.</li>
                <li><strong>Break Duration (minutes)</strong> Choose the Duration for your Break .</li>
              </ul>
            </li>
          
            <li>
              Save: Click the <strong>'Save Slot'</strong> button to save your availability.
            </li>
          </ul>

          <div className="border-t-2 border-gray-300 my-8"></div>
          <h2 className="text-3xl font-semibold mb-4 text-gray-800">Multiple Day Slot</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>
              Go to the <strong>'Manage Slots'</strong> section: Navigate to the <strong>'Manage Slots'</strong> section in your dashboard.
            </li>
            <li>
              Select <strong>'Add Multiple Day Slot'</strong>: Click on the <strong>'Add Multiple Day Slot'</strong> button.
            </li>
            <li>
              Choose the <strong>Date Range</strong>: Select the <strong>start </strong> and <strong>end</strong> dates for the period you want to create slots.
            </li>
          
            <li>
              Set the Time:
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li><strong>Start Time:</strong> Choose the start time for your slots.</li>
                <li><strong>End Time:</strong> Choose the end time for your slots.</li>
                <li><strong>Consultation Duration (minutes):</strong> Choose the  Duration for your Consultation.</li>
                <li><strong>Break Duration (minutes)</strong> Choose the Duration for your Break .</li>

              </ul> 
            </li>
            <li>
              Calculate: Click the <strong>' Calculate The Consultation Count'</strong> button to check your availability.
            </li>
        
            <li>
               Select the <strong>'days'</strong>  to save your availability.
            </li>
            <li>
              Save: Click the <strong>'Save Slots'</strong> button to save your availability.
            </li>
          </ul>

          <div className="border-t-2 border-gray-300 my-8"></div>
          <p className="text-lg text-gray-700">
            <strong>Tips:</strong><br />
            - Make sure to regularly update your slots to reflect any changes in your schedule.<br />
            - Patients can only book appointments during the available slots you create, so it's essential to keep this information current.
          </p>
        </div>
      </div>
    </div>
  );
};

export default DescriptionAddSlot;
