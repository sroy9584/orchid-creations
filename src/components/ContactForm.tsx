import React, { useState } from 'react';
import { Send, CheckCircle, AlertCircle, MessageSquare } from 'lucide-react';
import { siteConfig } from '../data/siteConfig';
import { servicesConfig } from '../data/servicesConfig';
import { getWhatsAppLink } from '../data/socialLinks';

interface FormData {
  fullName: string;
  email: string;
  whatsapp: string;
  service: string;
  projectDescription: string;
}

export const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    whatsapp: '',
    service: servicesConfig[0]?.title || 'Wedding Film Editing',
    projectDescription: '',
  });

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [feedbackMessage, setFeedbackMessage] = useState<string>('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Client-side validation
    if (!formData.fullName.trim() || !formData.email.trim() || !formData.projectDescription.trim()) {
      setStatus('error');
      setFeedbackMessage('Please enter your Name, Email, and Project Description.');
      return;
    }

    setStatus('submitting');
    setFeedbackMessage('');

    // Use user-configured endpoint or zero-config FormSubmit direct to studio email
    const endpoint =
      siteConfig.formspreeEndpoint && siteConfig.formspreeEndpoint.trim().length > 0
        ? siteConfig.formspreeEndpoint
        : `https://formsubmit.co/ajax/${siteConfig.contactEmail}`;

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name: formData.fullName,
          email: formData.email,
          phone: formData.whatsapp || 'Not provided',
          service: formData.service,
          message: formData.projectDescription,
          _subject: `New Project Enquiry: ${formData.service} (${formData.fullName})`,
          _captcha: 'false',
          _template: 'table',
        }),
      });

      if (response.ok) {
        setStatus('success');
        setFeedbackMessage(
          `Thank you, ${formData.fullName}! Your enquiry has been sent directly to ${siteConfig.contactEmail}. Sourav will get in touch with you shortly.`
        );
        setFormData({
          fullName: '',
          email: '',
          whatsapp: '',
          service: servicesConfig[0]?.title || 'Wedding Film Editing',
          projectDescription: '',
        });
      } else {
        throw new Error('Server response was not ok');
      }
    } catch {
      // If network is restricted or user wants instant WhatsApp delivery, provide seamless fallback
      setStatus('error');
      setFeedbackMessage(
        'Unable to send email right now. You can click below to send this enquiry directly to Sourav via WhatsApp.'
      );
    }
  };

  const handleWhatsAppSend = () => {
    const text = formData.fullName
      ? `Hello Sourav! My name is ${formData.fullName}.\n\nService: ${formData.service}\nEmail: ${formData.email || 'N/A'}\nWhatsApp/Phone: ${formData.whatsapp || 'N/A'}\n\nProject Overview:\n${formData.projectDescription || 'I would like to discuss video post-production.'}`
      : 'Hello Orchid Creations! I am interested in your video editing services. I would like to discuss a project.';
    window.open(getWhatsAppLink(text), '_blank');
  };

  return (
    <div className="w-full glass-card rounded-3xl p-6 sm:p-10 border border-white/10 shadow-2xl">
      {/* Success Alert */}
      {status === 'success' && (
        <div className="mb-6 p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/40 flex items-start gap-3 text-sm text-emerald-200">
          <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-white">Message Sent Successfully</p>
            <p className="text-emerald-300/90 text-xs mt-1 leading-relaxed">{feedbackMessage}</p>
          </div>
        </div>
      )}

      {/* Error Alert with instant WhatsApp action */}
      {status === 'error' && (
        <div className="mb-6 p-4 rounded-2xl bg-rose-950/40 border border-rose-500/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-sm text-rose-200">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
            <span className="text-xs sm:text-sm">{feedbackMessage}</span>
          </div>
          <button
            type="button"
            onClick={handleWhatsAppSend}
            className="px-4 py-2 rounded-xl bg-emerald-600/80 hover:bg-emerald-600 text-white font-semibold text-xs shrink-0 flex items-center gap-1.5 transition-colors"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Send via WhatsApp</span>
          </button>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {/* Full Name */}
          <div>
            <label htmlFor="fullName" className="block text-xs font-semibold uppercase tracking-wider text-neutral-300 font-mono mb-2">
              Full Name <span className="text-purple-400">*</span>
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              required
              value={formData.fullName}
              onChange={handleChange}
              placeholder="e.g. Rahul Sen"
              className="glass-input text-sm"
            />
          </div>

          {/* Email Address */}
          <div>
            <label htmlFor="email" className="block text-xs font-semibold uppercase tracking-wider text-neutral-300 font-mono mb-2">
              Email Address <span className="text-purple-400">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="rahul@example.com"
              className="glass-input text-sm"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {/* WhatsApp / Phone Number */}
          <div>
            <label htmlFor="whatsapp" className="block text-xs font-semibold uppercase tracking-wider text-neutral-300 font-mono mb-2">
              WhatsApp / Phone Number
            </label>
            <input
              type="tel"
              id="whatsapp"
              name="whatsapp"
              value={formData.whatsapp}
              onChange={handleChange}
              placeholder="+91 89279 16525"
              className="glass-input text-sm"
            />
          </div>

          {/* Service Required */}
          <div>
            <label htmlFor="service" className="block text-xs font-semibold uppercase tracking-wider text-neutral-300 font-mono mb-2">
              Service Required
            </label>
            <select
              id="service"
              name="service"
              value={formData.service}
              onChange={handleChange}
              className="glass-input text-sm bg-[#101219] text-white"
            >
              {servicesConfig.map((s) => (
                <option key={s.id} value={s.title} className="bg-[#101219] text-white">
                  {s.title}
                </option>
              ))}
              <option value="Custom Post-Production" className="bg-[#101219] text-white">
                Other / Custom Post-Production
              </option>
            </select>
          </div>
        </div>

        {/* Project Description */}
        <div>
          <label htmlFor="projectDescription" className="block text-xs font-semibold uppercase tracking-wider text-neutral-300 font-mono mb-2">
            Project Description &amp; Requirements <span className="text-purple-400">*</span>
          </label>
          <textarea
            id="projectDescription"
            name="projectDescription"
            rows={4}
            required
            value={formData.projectDescription}
            onChange={handleChange}
            placeholder="Tell us about the project: footage type, camera profiles, estimated length, music mood, target deadline, etc."
            className="glass-input text-sm resize-y"
          />
        </div>

        {/* Action Buttons */}
        <div className="pt-2 flex flex-col sm:flex-row items-center gap-4">
          <button
            type="submit"
            disabled={status === 'submitting'}
            className="glass-btn-primary w-full sm:w-auto text-sm font-semibold !py-3.5 !px-8 shadow-glow-accent"
          >
            {status === 'submitting' ? (
              <span>SENDING ENQUIRY...</span>
            ) : (
              <>
                <span>SEND MESSAGE (EMAIL)</span>
                <Send className="w-4 h-4 ml-1" />
              </>
            )}
          </button>

          <button
            type="button"
            onClick={handleWhatsAppSend}
            className="glass-btn-secondary w-full sm:w-auto text-sm font-semibold !py-3.5 !px-6 text-neutral-300 hover:text-white"
          >
            <MessageSquare className="w-4 h-4 text-emerald-400" />
            <span>Send via WhatsApp</span>
          </button>
        </div>
      </form>
    </div>
  );
};
