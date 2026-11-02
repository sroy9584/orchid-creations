import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle, AlertCircle, MessageSquare, Mail, Info } from 'lucide-react';
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

  const isBackendConfigured = Boolean(
    siteConfig.formspreeEndpoint && siteConfig.formspreeEndpoint.trim().length > 0
  );

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
      setFeedbackMessage('Please fill in your name, email, and project description.');
      return;
    }

    // Check if backend endpoint is configured
    if (!isBackendConfigured) {
      // Direct user cleanly to WhatsApp or Email
      const generatedMessage = `Hello Sourav! My name is ${formData.fullName}.\n\nService: ${formData.service}\nEmail: ${formData.email}\nPhone: ${formData.whatsapp || 'N/A'}\n\nProject Details:\n${formData.projectDescription}`;
      const fallbackUrl = getWhatsAppLink(generatedMessage);
      window.open(fallbackUrl, '_blank');
      return;
    }

    // Submit to configured backend (e.g. Formspree)
    setStatus('submitting');
    try {
      const response = await fetch(siteConfig.formspreeEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus('success');
        setFeedbackMessage('Thank you! Your project details have been successfully submitted. Sourav will reach out shortly.');
        setFormData({
          fullName: '',
          email: '',
          whatsapp: '',
          service: servicesConfig[0]?.title || 'Wedding Film Editing',
          projectDescription: '',
        });
      } else {
        const errorData = await response.json();
        throw new Error(errorData?.error || 'Submission failed.');
      }
    } catch (err: any) {
      setStatus('error');
      setFeedbackMessage(
        err.message || 'Unable to submit right now. Please reach out directly via WhatsApp or Email.'
      );
    }
  };

  const handleWhatsAppDirect = () => {
    const text = formData.fullName
      ? `Hello Sourav! My name is ${formData.fullName}.\n\nI am enquiring about ${formData.service}.\nEmail: ${formData.email || 'N/A'}\nWhatsApp: ${formData.whatsapp || 'N/A'}\n\nProject Overview:\n${formData.projectDescription || 'I would like to discuss video post-production.'}`
      : 'Hello Orchid Creations! I would like to discuss video editing and post-production services.';
    window.open(getWhatsAppLink(text), '_blank');
  };

  return (
    <div className="w-full glass-card rounded-3xl p-6 sm:p-10 border border-white/10 shadow-2xl">
      {/* Backend connection notice */}
      {!isBackendConfigured && (
        <div className="mb-8 p-4 rounded-2xl bg-purple-950/30 border border-purple-500/30 flex items-start gap-3 text-xs sm:text-sm text-purple-200">
          <Info className="w-5 h-5 text-purple-400 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <p className="font-semibold text-white">Direct Connect Mode Active</p>
            <p className="text-purple-300/90 leading-relaxed">
              Static GitHub Pages does not run a server. Submitting this form will automatically prepare a structured enquiry message directly to Sourav via WhatsApp. (To enable direct email forms, set your Formspree endpoint in <code className="text-white bg-black/40 px-1 py-0.5 rounded font-mono text-[11px]">siteConfig.ts</code>).
            </p>
          </div>
        </div>
      )}

      {/* Success Alert */}
      {status === 'success' && (
        <div className="mb-6 p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/40 flex items-center gap-3 text-sm text-emerald-200">
          <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />
          <span>{feedbackMessage}</span>
        </div>
      )}

      {/* Error Alert */}
      {status === 'error' && (
        <div className="mb-6 p-4 rounded-2xl bg-rose-950/40 border border-rose-500/40 flex items-center gap-3 text-sm text-rose-200">
          <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />
          <span>{feedbackMessage}</span>
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
              placeholder="+91 98765 43210"
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
            ) : isBackendConfigured ? (
              <>
                <span>SEND MESSAGE</span>
                <Send className="w-4 h-4 ml-1" />
              </>
            ) : (
              <>
                <span>CONTINUE VIA WHATSAPP</span>
                <MessageSquare className="w-4 h-4 ml-1" />
              </>
            )}
          </button>

          <button
            type="button"
            onClick={handleWhatsAppDirect}
            className="glass-btn-secondary w-full sm:w-auto text-sm font-semibold !py-3.5 !px-6 text-neutral-300 hover:text-white"
          >
            <MessageSquare className="w-4 h-4 text-emerald-400" />
            <span>Chat on WhatsApp Directly</span>
          </button>
        </div>
      </form>
    </div>
  );
};

