import { useState } from 'react';
import Modal from './Modal';

export default function ContactFormModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    query: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send form data to your backend
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          timestamp: new Date().toISOString(),
        }),
      });

      if (response.ok) {
        console.log('Contact form submitted:', formData);
        setIsSubmitted(true);

        // Reset form after 3 seconds
        setTimeout(() => {
          setIsSubmitted(false);
          setFormData({
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            query: '',
          });
          onClose();
        }, 3000);
      } else {
        alert('Failed to send message. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Failed to send message. Please try again.');
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="p-8 md:p-12">
        {!isSubmitted ? (
          <>
            <h2 className="text-3xl md:text-4xl font-light text-charcoal mb-2">
              Contact Form
            </h2>
            <p className="text-[13px] text-[#9c9a96] mb-8">
              We'd love to hear from you. Fill out the form below and we'll get back to you shortly.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* First Name */}
                <div>
                  <label className="text-[12px] tracking-[0.1em] uppercase font-medium text-charcoal mb-3 block">
                    First Name
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="Enter your first name"
                    className="w-full px-5 py-3.5 border border-[#e8e3dc] rounded-xl text-[14px] text-charcoal placeholder:text-[#b8b4ae] outline-none focus:border-charcoal focus:ring-1 focus:ring-charcoal/20 transition-all duration-300 bg-white"
                    required
                  />
                </div>

                {/* Last Name */}
                <div>
                  <label className="text-[12px] tracking-[0.1em] uppercase font-medium text-charcoal mb-3 block">
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Enter your last name"
                    className="w-full px-5 py-3.5 border border-[#e8e3dc] rounded-xl text-[14px] text-charcoal placeholder:text-[#b8b4ae] outline-none focus:border-charcoal focus:ring-1 focus:ring-charcoal/20 transition-all duration-300 bg-white"
                    required
                  />
                </div>
              </div>

              {/* Email Address */}
              <div>
                <label className="text-[12px] tracking-[0.1em] uppercase font-medium text-charcoal mb-3 block">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email address"
                  className="w-full px-5 py-3.5 border border-[#e8e3dc] rounded-xl text-[14px] text-charcoal placeholder:text-[#b8b4ae] outline-none focus:border-charcoal focus:ring-1 focus:ring-charcoal/20 transition-all duration-300 bg-white"
                  required
                />
              </div>

              {/* Phone Number */}
              <div>
                <label className="text-[12px] tracking-[0.1em] uppercase font-medium text-charcoal mb-3 block">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter your phone number"
                  className="w-full px-5 py-3.5 border border-[#e8e3dc] rounded-xl text-[14px] text-charcoal placeholder:text-[#b8b4ae] outline-none focus:border-charcoal focus:ring-1 focus:ring-charcoal/20 transition-all duration-300 bg-white"
                  required
                />
              </div>

              {/* Query */}
              <div>
                <label className="text-[12px] tracking-[0.1em] uppercase font-medium text-charcoal mb-3 block">
                  Query
                </label>
                <textarea
                  name="query"
                  value={formData.query}
                  onChange={handleChange}
                  placeholder="Tell us what you'd like to know..."
                  rows="5"
                  className="w-full px-5 py-3.5 border border-[#e8e3dc] rounded-xl text-[14px] text-charcoal placeholder:text-[#b8b4ae] outline-none focus:border-charcoal focus:ring-1 focus:ring-charcoal/20 transition-all duration-300 bg-white resize-none"
                  required
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-4 px-6 bg-charcoal text-white text-[12px] tracking-[0.12em] uppercase font-medium rounded-xl hover:bg-charcoal/90 transition-all duration-300 mt-8"
              >
                Send Message
              </button>
            </form>
          </>
        ) : (
          <div className="py-12 text-center">
            <div className="mb-6">
              <div className="w-16 h-16 mx-auto bg-charcoal/10 rounded-full flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-charcoal"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
            </div>
            <h3 className="text-2xl md:text-3xl font-light text-charcoal mb-2">
              Thank you.
            </h3>
            <p className="text-[14px] text-[#67645e]">
              Your response has been sent.
            </p>
          </div>
        )}
      </div>
    </Modal>
  );
}
