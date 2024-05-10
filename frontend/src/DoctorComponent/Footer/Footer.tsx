
function Footer() {
  return (
    <div>
    
    <footer className="bg-gray-100 text-center text-gray-600 dark:bg-cyan-950 dark:text-white">
      <div className="max-w-6xl mx-auto px-4 py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="mb-8">
            <h5 className="text-lg font-semibold mb-4">About Us</h5>
            <p className="text-sm">
              We are committed to providing the best experience for patients and doctors alike.
            </p>
          </div>
          <div className="mb-8">
            <h5 className="text-lg font-semibold mb-4">Quick Links</h5>
            <ul>
              <li className="mb-2">
                <a href="" className="text-sm hover:text-blue-600 transition-colors">Home</a>
              </li>
              <li className="mb-2">
                <a href="" className="text-sm hover:text-blue-600 transition-colors">Doctors</a>
              </li>
              <li className="mb-2">
                <a href="" className="text-sm hover:text-blue-600 transition-colors">Appointments</a>
              </li>
              <li className="mb-2">
                <a href="" className="text-sm hover:text-blue-600 transition-colors">Contact</a>
              </li>
            </ul>
          </div>
          <div className="mb-8">
            <h5 className="text-lg font-semibold mb-4">Services</h5>
            <ul>
              <li className="mb-2">
                <a href="" className="text-sm hover:text-blue-600 transition-colors">Cardiology</a>
              </li>
              <li className="mb-2">
                <a href="" className="text-sm hover:text-blue-600 transition-colors">Pediatrics</a>
              </li>
              <li className="mb-2">
                <a href="" className="text-sm hover:text-blue-600 transition-colors">Dermatology</a>
              </li>
              <li className="mb-2">
                <a href="" className="text-sm hover:text-blue-600 transition-colors">Orthopedics</a>
              </li>
            </ul>
          </div>
          <div className="mb-8">
            <h5 className="text-lg font-semibold mb-4">Contact Us</h5>
            <p className="text-sm mb-2">123 Main Street</p>
            <p className="text-sm mb-2">City, State 12345</p>
            <p className="text-sm mb-2">Email: info@example.com</p>
            <p className="text-sm mb-2">Phone: +1 234 567 8901</p>
          </div>
        </div>
      </div>
      <div className="bg-gray-200 dark:bg-cyan-950 py-4">
        <p className="text-sm text-gray-500 dark:text-gray-300 text-center">
          &copy; 2024 docTime. All rights reserved.
        </p>
      </div>
    </footer>
    </div>
  )
}

export default Footer
