import { useState } from 'react';
import Modal from './Modal';

export default function AffiliateFormModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    tiktok: '',
    instagram: '',
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
      const response = await fetch('/api/affiliate', {
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
        console.log('Affiliate form submitted:', formData);
        setIsSubmitted(true);

        // Reset form after 3 seconds
        setTimeout(() => {
          setIsSubmitted(false);
          setFormData({
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            tiktok: '',
            instagram: '',
          });
          onClose();
        }, 3000);
      } else {
        alert('Failed to submit application. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Failed to submit application. Please try again.');
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      {!isSubmitted ? (
        <div className="grid grid-cols-1 md:grid-cols-2 overflow-hidden">
          {/* Image Section */}
          <div className="relative bg-gradient-to-br from-[#2c5aa0] to-[#1a3a5c] hidden md:flex flex-col items-center justify-center p-12 text-white">
            <div className="text-center">
              <div className="mb-8">
                <svg
                  width="80"
                  height="80"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="0.5"
                  opacity="0.3"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 7v5l3 2" />
                </svg>
              </div>
              <h3 className="text-4xl font-light mb-4">We Want You</h3>
              <p className="text-white/80 text-sm tracking-wide">
                Join the SHYNE community
              </p>
              <div className="mt-12 space-y-3">
                <div className="flex items-center gap-3 text-sm">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Exclusive Benefits</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Competitive Commission</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Dedicated Support</span>
                </div>
              </div>
            </div>
          </div>

          {/* Form Section */}
          <div className="p-8 md:p-12">
            {/* Mobile Headline */}
            <div className="md:hidden mb-8 text-center">
              <h3 className="text-3xl font-light text-charcoal mb-2">We Want You</h3>
              <p className="text-[13px] text-[#9c9a96]">
                Join the SHYNE community
              </p>
            </div>

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

              {/* TikTok Handle */}
              <div>
                <label className="text-[12px] tracking-[0.1em] uppercase font-medium text-charcoal mb-3 block">
                  TikTok Handle
                </label>
                <div className="relative">
                  <span className="absolute left-5 top-3.5 text-[#9c9a96] text-[14px]">@</span>
                  <input
                    type="text"
                    name="tiktok"
                    value={formData.tiktok}
                    onChange={handleChange}
                    placeholder="yourusername"
                    className="w-full pl-9 pr-5 py-3.5 border border-[#e8e3dc] rounded-xl text-[14px] text-charcoal placeholder:text-[#b8b4ae] outline-none focus:border-charcoal focus:ring-1 focus:ring-charcoal/20 transition-all duration-300 bg-white"
                    required
                  />
                </div>
              </div>

              {/* Instagram Handle */}
              <div>
                <label className="text-[12px] tracking-[0.1em] uppercase font-medium text-charcoal mb-3 block">
                  Instagram Handle
                </label>
                <div className="relative">
                  <span className="absolute left-5 top-3.5 text-[#9c9a96] text-[14px]">@</span>
                  <input
                    type="text"
                    name="instagram"
                    value={formData.instagram}
                    onChange={handleChange}
                    placeholder="yourusername"
                    className="w-full pl-9 pr-5 py-3.5 border border-[#e8e3dc] rounded-xl text-[14px] text-charcoal placeholder:text-[#b8b4ae] outline-none focus:border-charcoal focus:ring-1 focus:ring-charcoal/20 transition-all duration-300 bg-white"
                    required
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-4 px-6 bg-charcoal text-white text-[12px] tracking-[0.12em] uppercase font-medium rounded-xl hover:bg-charcoal/90 transition-all duration-300 mt-8"
              >
                Join as Affiliate
              </button>
            </form>
          </div>
        </div>
      ) : (
        <div className="p-12 text-center min-h-[400px] flex flex-col items-center justify-center">
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
    </Modal>
  );
}
