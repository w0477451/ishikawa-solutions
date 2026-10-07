import React, { useState, useEffect } from 'react';
import { CheckCircle, AlertCircle, Loader } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || '/api';

const CTA: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  // Get UTM parameters & GCLID from URL
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const utmSource = urlParams.get('utm_source');
    const utmMedium = urlParams.get('utm_medium');
    const utmCampaign = urlParams.get('utm_campaign');
    const utmKeyword = urlParams.get('utm_keyword'); // Added for SEO
    const gclid = urlParams.get('gclid'); // Added for Google Ads Offline Conversions

    // Store in sessionStorage for analytics/form submission
    if (utmSource) sessionStorage.setItem('utm_source', utmSource);
    if (utmMedium) sessionStorage.setItem('utm_medium', utmMedium);
    if (utmCampaign) sessionStorage.setItem('utm_campaign', utmCampaign);
    if (utmKeyword) sessionStorage.setItem('utm_keyword', utmKeyword);
    if (gclid) sessionStorage.setItem('gclid', gclid);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    // Get UTM & Tracking parameters
    const getParam = (key: string) => sessionStorage.getItem(key) || new URLSearchParams(window.location.search).get(key);

    const utmSource = getParam('utm_source');
    const utmMedium = getParam('utm_medium');
    const utmCampaign = getParam('utm_campaign');
    const utmKeyword = getParam('utm_keyword');
    const gclid = getParam('gclid');

    try {
      const response = await fetch(`${API_URL}/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          utm_source: utmSource,
          utm_medium: utmMedium,
          utm_campaign: utmCampaign,
          utm_keyword: utmKeyword,
          gclid: gclid
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit form');
      }

      setStatus('success');

      // Google Ads conversion tracking
      if (window.gtag) {
        window.gtag('event', 'conversion', {
          'send_to': 'AW-CONVERSION_ID/CONVERSION_LABEL', // Replace with your conversion ID
          'value': 1.0,
          'currency': 'USD'
        });
      }

      // Facebook Pixel conversion (if using)
      if (window.fbq) {
        window.fbq('track', 'Lead');
      }

      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        service: '',
        message: ''
      });

      // Track analytics
      fetch(`${API_URL}/analytics`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          event: 'form_submit',
          page: 'cta',
          utm_source: utmSource,
          utm_medium: utmMedium,
          utm_campaign: utmCampaign
        })
      }).catch(err => console.error('Analytics error:', err));

    } catch (error: any) {
      console.error('Form submission error:', error);
      setStatus('error');
      setErrorMessage(error.message || 'Something went wrong. Please try again.');
    }
  };

  return (
    <section id="cta" className="py-16 md:py-32 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center mb-8 md:mb-12">
          <span className="text-blue-500 font-bold tracking-widest uppercase text-xs md:text-sm">JOIN US</span>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-gray-900 mt-4 mb-4 md:mb-6">
            Take your business to <br className="hidden md:block" />
            the new level.
          </h2>
          <p className="text-sm md:text-base text-gray-500 max-w-2xl mx-auto">Join us and take your business to the next level with our affordable web development services.</p>
        </div>

        <div className="max-w-3xl mx-auto bg-gray-50 rounded-2xl md:rounded-[2.5rem] p-6 md:p-8 lg:p-12 shadow-inner relative">
          {/* Decorative doodle */}
          <div className="absolute -top-8 -right-8 md:-top-12 md:-right-12 lg:-right-20 w-24 md:w-32 rotate-12 text-xs md:text-sm font-handwriting text-gray-600 hidden md:block">
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Infobox_info_icon.svg/1200px-Infobox_info_icon.svg.png" className="w-6 h-6 md:w-8 md:h-8 mb-2 opacity-20" alt="" />
            <span className="font-cursive transform rotate-12 block">get 3 months free support</span>
          </div>

          {status === 'success' ? (
            <div className="text-center py-8">
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Thank You!</h3>
              <p className="text-gray-600 mb-6">We've received your message and will contact you soon.</p>
              <button
                onClick={() => setStatus('idle')}
                className="text-blue-600 hover:text-blue-700 font-semibold"
              >
                Submit Another
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="name"
                  placeholder="Name *"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 md:px-6 py-3 md:py-4 rounded-xl md:rounded-2xl border-none bg-gray-100 focus:ring-2 focus:ring-blue-300 outline-none text-sm md:text-base"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email *"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 md:px-6 py-3 md:py-4 rounded-xl md:rounded-2xl border-none bg-gray-100 focus:ring-2 focus:ring-blue-300 outline-none text-sm md:text-base"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number *"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 md:px-6 py-3 md:py-4 rounded-xl md:rounded-2xl border-none bg-gray-100 focus:ring-2 focus:ring-blue-300 outline-none text-sm md:text-base"
                />
                <input
                  type="text"
                  name="company"
                  placeholder="Company Name"
                  value={formData.company}
                  onChange={handleChange}
                  className="w-full px-4 md:px-6 py-3 md:py-4 rounded-xl md:rounded-2xl border-none bg-gray-100 focus:ring-2 focus:ring-blue-300 outline-none text-sm md:text-base"
                />
              </div>
              <select
                name="service"
                required
                value={formData.service}
                onChange={handleChange}
                className="w-full px-4 md:px-6 py-3 md:py-4 rounded-xl md:rounded-2xl border-none bg-gray-100 focus:ring-2 focus:ring-blue-300 outline-none text-sm md:text-base text-gray-700"
              >
                <option value="">Service Interested in *</option>
                <option value="Web Development">Web Development</option>
                <option value="Mobile App Development">Mobile App Development</option>
                <option value="Design">Design</option>
                <option value="Digital Marketing">Digital Marketing</option>
                <option value="Custom Software">Custom Software</option>
                <option value="Other">Other</option>
              </select>
              <textarea
                name="message"
                placeholder="Message"
                rows={4}
                value={formData.message}
                onChange={handleChange}
                className="w-full px-4 md:px-6 py-3 md:py-4 rounded-xl md:rounded-2xl border-none bg-gray-100 focus:ring-2 focus:ring-blue-300 outline-none text-sm md:text-base resize-none"
              ></textarea>

              {status === 'error' && (
                <div className="flex items-center gap-2 text-red-600 text-sm">
                  <AlertCircle size={16} />
                  <span>{errorMessage}</span>
                </div>
              )}

              <div className="text-center pt-4">
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="bg-blue-200 text-blue-700 font-bold px-8 md:px-12 py-3 md:py-4 rounded-full hover:bg-blue-600 hover:text-white transition-all duration-300 shadow-lg hover:shadow-blue-500/30 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 mx-auto"
                >
                  {status === 'loading' ? (
                    <>
                      <Loader className="w-5 h-5 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    'Join!'
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default CTA;
