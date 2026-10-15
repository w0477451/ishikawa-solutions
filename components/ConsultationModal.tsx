import React, { createContext, useContext, useState, useEffect } from 'react';
import { X, CheckCircle, AlertCircle, Loader } from 'lucide-react';

export const SERVICES_LIST = [
  'Website Development Service',
  'E-commerce Solutions Service',
  'Mobile App Development Service',
  'Custom Software Development Service',
  'UI/UX Design Service',
  'Integration & Automation Service',
  'Cloud Solutions & Hosting Service',
  'Maintenance & Support Service'
];

interface ConsultationModalContextType {
  isOpen: boolean;
  openModal: (serviceName?: string) => void;
  closeModal: () => void;
}

const ConsultationModalContext = createContext<ConsultationModalContextType>({
  isOpen: false,
  openModal: () => {},
  closeModal: () => {}
});

export const useConsultationModal = () => useContext(ConsultationModalContext);

const API_URL = import.meta.env.VITE_API_URL || '/api';

export const ConsultationModalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(SERVICES_LIST[0]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const openModal = (serviceName?: string) => {
    if (serviceName && SERVICES_LIST.includes(serviceName)) {
      setSelectedService(serviceName);
    } else {
      setSelectedService(SERVICES_LIST[0]);
    }
    setStatus('idle');
    setErrorMessage('');
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  // Close modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        closeModal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name === 'service') {
      setSelectedService(value);
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    try {
      const response = await fetch(`${API_URL}/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          company: formData.company,
          service: selectedService,
          message: formData.message,
          source: 'consultation-popup'
        })
      });

      let data: any = {};
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        data = await response.json();
      } else {
        const text = await response.text();
        try {
          data = JSON.parse(text);
        } catch {
          data = { error: text || 'Submission received' };
        }
      }

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit enquiry. Please check your details and try again.');
      }

      setStatus('success');
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        message: ''
      });

      // Auto close after 3 seconds on success
      setTimeout(() => {
        setIsOpen(false);
        setStatus('idle');
      }, 3000);
    } catch (err: any) {
      console.error('Submission error:', err);
      setStatus('error');
      setErrorMessage(err.message || 'Something went wrong. Please check your network and try again.');
    }
  };

  return (
    <ConsultationModalContext.Provider value={{ isOpen, openModal, closeModal }}>
      {children}

      {/* --- MODAL DIALOG --- */}
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop with blur */}
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300"
            onClick={closeModal}
            aria-hidden="true"
          />

          {/* Modal Container */}
          <div
            className="relative w-full max-w-[460px] bg-[#f8f9fa] rounded-[32px] p-6 sm:p-8 shadow-2xl z-10 transition-all duration-300 transform scale-100 font-urbanist border border-gray-100"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
          >
            {/* Close Button 'X' */}
            <button
              onClick={closeModal}
              className="absolute top-5 right-5 text-red-500 hover:text-red-600 transition-colors p-1 rounded-full hover:bg-red-50"
              aria-label="Close modal"
            >
              <X size={22} strokeWidth={2.5} />
            </button>

            {/* Modal Title */}
            <h2
              id="modal-title"
              className="text-2xl sm:text-[26px] font-bold text-[#1f2937] text-center mb-6 tracking-tight"
            >
              Book Free Consultation
            </h2>

            {status === 'success' ? (
              <div className="py-8 text-center flex flex-col items-center">
                <CheckCircle className="w-16 h-16 text-green-500 mb-4 animate-bounce" />
                <h3 className="text-xl font-bold text-gray-800 mb-2">Thank you!</h3>
                <p className="text-gray-600 text-sm max-w-xs leading-relaxed">
                  Your enquiry has been received. Our team will contact you shortly at{' '}
                  <span className="font-semibold text-gray-800">{formData.email || 'your email'}</span>.
                </p>
                <button
                  onClick={closeModal}
                  className="mt-6 px-6 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold rounded-full text-sm transition-all"
                >
                  Close
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
                {status === 'error' && (
                  <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-xs flex items-center gap-2">
                    <AlertCircle size={16} className="shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                {/* Name */}
                <div>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Name"
                    required
                    className="w-full px-5 py-3 rounded-full bg-white border border-gray-300 text-gray-800 placeholder-gray-400 text-sm focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all shadow-sm"
                  />
                </div>

                {/* Email */}
                <div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email"
                    required
                    className="w-full px-5 py-3 rounded-full bg-white border border-gray-300 text-gray-800 placeholder-gray-400 text-sm focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all shadow-sm"
                  />
                </div>

                {/* Phone */}
                <div>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Phone"
                    required
                    className="w-full px-5 py-3 rounded-full bg-white border border-gray-300 text-gray-800 placeholder-gray-400 text-sm focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all shadow-sm"
                  />
                </div>

                {/* Company */}
                <div>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    placeholder="Company"
                    className="w-full px-5 py-3 rounded-full bg-white border border-gray-300 text-gray-800 placeholder-gray-400 text-sm focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all shadow-sm"
                  />
                </div>

                {/* Service Dropdown */}
                <div className="relative">
                  <select
                    name="service"
                    value={selectedService}
                    onChange={handleChange}
                    className="w-full px-5 py-3 rounded-full bg-white border border-gray-300 text-gray-700 text-sm focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all shadow-sm appearance-none pr-10 cursor-pointer"
                  >
                    {SERVICES_LIST.map(service => (
                      <option key={service} value={service}>
                        {service}
                      </option>
                    ))}
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                      <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                    </svg>
                  </div>
                </div>

                {/* Message Textarea */}
                <div>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={3}
                    placeholder="Please explain what you need in a few words."
                    className="w-full px-5 py-3.5 rounded-[22px] bg-white border border-gray-300 text-gray-800 placeholder-gray-400 text-sm focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all resize-none shadow-sm"
                  ></textarea>
                </div>

                {/* Submit Button ("Connect!") */}
                <div className="pt-2 text-center">
                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="w-full sm:w-auto min-w-[200px] px-12 py-3.5 rounded-full bg-[#BFE0FE] hover:bg-[#a5d2fc] active:bg-[#90c6fa] text-white font-bold text-base tracking-wide transition-all duration-300 shadow-md hover:shadow-lg disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 mx-auto"
                  >
                    {status === 'loading' ? (
                      <>
                        <Loader size={18} className="animate-spin text-white" />
                        <span>Sending...</span>
                      </>
                    ) : (
                      'Connect!'
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </ConsultationModalContext.Provider>
  );
};
