DocTime is a doctor booking web application built with the MERN stack and designed using Clean Architecture principles.

Project Name: DocTime
-Aim: To develop a comprehensive doctor booking web application that streamlines the process for both patients and healthcare providers.
-Technology Stack: MERN (MongoDB, Express.js, React.js, Node.js)
-Architecture: Clean Architecture

Authentication System:
- Doctors, Patients, and Admin: Each user type has a tailored authentication process ensuring secure access and personalized experience.
- Doctor-specific KYC Authentication: Ensures the legitimacy and credentials of each doctor on the platform.

Doctor Features:
- Adding Slots: Doctors can manage their availability by adding and updating consultation slots.
- Profile Update: Allows doctors to maintain and update their professional profile.
- Video Consultation: Facilitates virtual consultations, enhancing convenience for both doctors and patients.
- Prescription Management: Doctors can easily add and manage prescriptions within the platform.

Patient Features:
- Seamless Booking Process: Patients can book appointments effortlessly, ensuring a hassle-free experience.
- Consultation Management: Simplifies the entire consultation process, from booking to follow-up.

Communication Tools:
- Real-time Chat: Utilizes Socket.io for instantaneous communication between patients and doctors, including sending text, audio, video, and emoji messages. S3 buckets for storing images and audio.
- Video Consultation: Powered by Zego Cloud, ensuring high-quality and reliable virtual consultations.

Additional Highlights:
- Admin Panel: Comprehensive management tools for admin users to oversee platform operations, manage users, and ensure smooth functioning.

Deployment Details:
-Domain: Hostinger
-AWS: Utilized for deployment, with services including EC2 for scalable compute capacity and Route 53 for domain name system management.
-Nginx: Used as a reverse proxy to manage traffic and enhance security.
-SSL: Implemented for secure connections, ensuring data protection and user privacy.

Future Enhancements:
- Data Encryption: Implementing advanced data encryption techniques to ensure the highest level of security and privacy for user data.
- Prescribed Medicine Purchasing: Enabling patients to purchase prescribed medicines directly through the platform for added convenience.
