import React, { useState } from 'react';
import { Mail, Phone, Send, MessageCircle } from 'lucide-react';
import SearchUserPage from './SearchUserPage';
const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    company: '',
    phone: ''
  });

  const [status, setStatus] = useState({
    loading: false,
    error: null,
    success: false
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, error: null, success: false });

    try {
      await emailjs.send(
        EMAIL_SERVICE_ID,
        EMAIL_TEMPLATE_ID,
        {
          from_name: formData.name,
          from_email: formData.email,
          subject: formData.subject,
          message: formData.message,
          company: formData.company,
          phone: formData.phone
        },
        EMAIL_PUBLIC_KEY
      );

      setStatus({ loading: false, error: null, success: true });
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
        company: '',
        phone: ''
      });
    } catch (error) {
      setStatus({ loading: false, error: 'Failed to send message', success: false });
    }
  };

  const handleWhatsAppClick = () => {
    const message = encodeURIComponent('Hello! I would like to get in touch.');
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, '_blank');
  };

  return (
    <div className="min-h-screen text-gray-900 bg-gradient-to-br from-gray-50 via-[#91A5CA] to-[#C8CDD4]
     dark:from-gray-800 dark:via-gray-900 dark:to-black dark:text-white">
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 pt-8 text-gray-800 dark:text-[#D2D9EF]">
            Having Trouble?
          </h1>
          <p className="max-w-2xl mx-auto text-gray-700 dark:text-[#D2D9EF]">
            any question or want to work together? We'd love to hear from you.
            Choose your preferred way to reach us.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          <div className="space-y-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all shadow-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all shadow-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-2">
                    Company
                  </label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all shadow-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-2">
                    Phone
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all shadow-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all shadow-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-2">
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all shadow-sm"
                />
              </div>

              <button
                type="submit"
                disabled={status.loading}
                className="w-full bg-gray-800 dark:bg-gray-900 hover:bg-blue-700 text-white font-medium py-3 rounded-lg transition-all flex items-center justify-center gap-2 shadow-md"
              >
                {status.loading ? (
                  'Sending...'
                ) : (
                  <>
                    <Send size={18} />
                    Send Message
                  </>
                )}
              </button>

              {status.error && (
                <p className="text-red-500 text-sm mt-2">{status.error}</p>
              )}
              {status.success && (
                <p className="text-green-500 text-sm mt-2">
                  Message sent successfully!
                </p>
              )}
            </form>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            <div className="bg-gray-100 dark:bg-gray-800 shadow-lg p-8 rounded-xl border border-gray-200 dark:border-gray-700">
              <h3 className="text-xl font-semibold mb-6 text-gray-800 dark:text-[#D2D9EF]">Other Ways to Connect</h3>

              <div className="space-y-6">
                {/* Email Contact */}
                <div className="flex items-start gap-4">
                  <div className="bg-gray-200 dark:bg-gray-700 p-3 rounded-lg">
                    <Mail className="w-6 h-6 text-blue-500" />
                  </div>
                  <div>
                    <h4 className="font-medium mb-1 text-gray-800 dark:text-[#D2D9EF]">Email</h4>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      contact@yourcompany.com
                    </p>
                    <a
                      href="mailto:contact@yourcompany.com"
                      className="text-blue-500 text-sm hover:text-blue-400 transition-colors mt-1 inline-block"
                    >
                      Send an email →
                    </a>
                  </div>
                </div>

                {/* WhatsApp Contact */}
                <div className="flex items-start gap-4">
                  <div className="bg-gray-200 dark:bg-gray-700 p-3 rounded-lg">
                    <MessageCircle className="w-6 h-6 text-green-500" />
                  </div>
                  <div>
                    <h4 className="font-medium mb-1 text-gray-800 dark:text-[#D2D9EF]">WhatsApp</h4>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      Available for quick chats and updates
                    </p>
                    <button
                      onClick={handleWhatsAppClick}
                      className="text-green-500 text-sm hover:text-green-400 transition-colors mt-1"
                    >
                      Start chat →
                    </button>
                  </div>
                </div>

                {/* Phone Contact */}
                <div className="flex items-start gap-4">
                  <div className="bg-gray-200 dark:bg-gray-700 p-3 rounded-lg">
                    <Phone className="w-6 h-6 text-purple-500" />
                  </div>
                  <div>
                    <h4 className="font-medium mb-1 text-gray-800 dark:text-[#D2D9EF]">Phone</h4>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">+1 (234) 567-8900</p>
                    <a
                      href="tel:+12345678900"
                      className="text-purple-500 text-sm hover:text-purple-400 transition-colors mt-1 inline-block"
                    >
                      Give us a call →
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-100 dark:bg-gray-800 p-8 rounded-xl border border-gray-200 dark:border-gray-700 shadow-lg">
              <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-[#D2D9EF]">Quick Info</h3>
              <ul className="space-y-3 text-gray-600 dark:text-gray-400">
                <li>• Typical response time: Within 24 hours</li>
                <li>• Available Monday - Friday</li>
                <li>• 9:00 AM - 6:00 PM (EST)</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;