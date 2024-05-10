import React from "react";
import { Disclosure } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/24/outline";

const FAQ: React.FC = () => {
  const faqData = [
    {
        question: 'How do I book an appointment?',
        answer:
          'To book an appointment, simply search for a doctor based on specialty, location, or availability. Once you find a doctor, select a time slot that suits you and confirm the booking. You will receive a confirmation email with all the details.',
      },
      {
        question: 'Is there a fee for booking through the platform?',
        answer:
          'No, our platform is free for patients. However, doctors may have their own fees for services, which will be disclosed before you confirm your appointment.',
      },
      {
        question: 'How do I create an account?',
        answer:
          'Creating an account is simple. Click on the "Sign Up" button, fill in the required information, and follow the prompts. Once you verify your email, your account will be activated.',
      },
      {
        question: 'What if I need to contact customer support?',
        answer:
          'If you need to contact customer support, you can use the "Contact Us" form on our website or email us at support@doctorbooking.com. Our team is available 24/7 to assist you with any questions or concerns.',
      },  ];

  return (
    <div className="w-full flex flex-col md:flex-row justify-center items-start">
      <section className="bg-gray-50 py-12 px-6 sm:px-8 lg:px-12 m-10 rounded-xl">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-start justify-between h-full">
          <div className="w-full md:w-1/2 px-6">
            {faqData.map((faq, index) => (
              <Disclosure key={index} as="div" className="mt-4">
                {({ open }) => (
                  <>
                    <Disclosure.Button
                      className={`flex justify-between items-center w-full px-4 py-4 text-left text-lg font-medium text-cyan-800 bg-gray-200 hover:bg-gray-300 focus:outline-none focus-visible:ring focus-visible:ring-cyan-500 focus-visible:ring-opacity-75 rounded-xl transition duration-300 ease-in-out`}
                    >
                      <span>{faq.question}</span>
                      <ChevronUpIcon
                        className={`${
                          open? "transform rotate-180" : ""
                        } w-5 h-5 text-cyan-800`}
                      />
                    </Disclosure.Button>
                    <Disclosure.Panel className="px-4 py-4 text-gray-700 text-md bg-white rounded-b-xl shadow-lg">
                      {faq.answer}
                    </Disclosure.Panel>
                  </>
                )}
              </Disclosure>
            ))}
          </div>
          {/* Responsive Image Section */}
          <div className="w-full md:w-1/2 px-6">
            <img
              src="https://img.freepik.com/premium-vector/faq-banner-icon-flat-style_157943-22.jpg"
              alt="FAQ illustration"
              className="rounded-lg shadow-lg w-full h-full object-cover md:h-auto md:w-full md:object-cover" // Adjustments for responsiveness
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default FAQ;
