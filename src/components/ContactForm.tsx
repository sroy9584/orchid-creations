import React, { useState } from 'react';
import { Send, CheckCircle, AlertCircle, MessageSquare, Mail, ExternalLink, Loader2 } from 'lucide-react';
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
  const [lastSubmittedUrls, setLastSubmittedUrls] = useState<{
    mailto: string;
    gmail: string;
    clientName: string;
  } | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  /**
   * Generates formatted enquiry subject, body, mailto URL, and Gmail web compose URL.
   */
  const getFormattedEnquiry = (
    name: string,
    email: string,
    phone: string,
    service: string,
    desc: string
  ) => {
    const timestamp = new Date().toLocaleString('en-IN', {
      dateStyle: 'full',
      timeStyle: 'short',
      timeZone: 'Asia/Kolkata',
    });

    const subject = `🎬 [New Project Enquiry] ${service} — ${name}`;
    const body = 
`ORCHID CREATION STUDIO — PROJECT ENQUIRY
==================================================

CLIENT DETAILS:
• Full Name: ${name}
• Email Address: ${email}
• WhatsApp / Phone: ${phone || 'Not provided'}
• Service Required: ${service}

PROJECT DESCRIPTION & REQUIREMENTS:
--------------------------------------------------
${desc}
--------------------------------------------------

Submitted via: Orchid Creation Official Website
Recipient: ${siteConfig.contactEmail}
Date: ${timestamp} (IST)
==================================================`;

    const mailto = `mailto:${siteConfig.contactEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    const gmail = `https://mail.google.com/mail/?view=cm&fs=1&to=${siteConfig.contactEmail}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    return { subject, body, mailto, gmail };
  };

  /**
   * Generates a pre-formatted WhatsApp chat message.
   */
  const getWhatsAppMessage = () => {
    if (formData.fullName) {
      return (
        `*🎬 ORCHID CREATION — PROJECT ENQUIRY*\n\n` +
        `*Client:* ${formData.fullName}\n` +
        `*Email:* ${formData.email || 'N/A'}\n` +
        `*Phone:* ${formData.whatsapp || 'N/A'}\n` +
        `*Service:* ${formData.service}\n\n` +
        `*Project Overview:*\n${formData.projectDescription || 'I would like to discuss video post-production services.'}`
      );
    }
    return 'Hello Sourav! I am interested in Orchid Creation video editing and post-production services. I would like to discuss a project.';
  };

  const handleWhatsAppSend = () => {
    window.open(getWhatsAppLink(getWhatsAppMessage()), '_blank');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Client-side validation
    if (!formData.fullName.trim() || !formData.email.trim() || !formData.projectDescription.trim()) {
      setStatus('error');
      setFeedbackMessage('Please enter your Full Name, Email Address, and Project Description.');
      return;
    }

    const clientName = formData.fullName.trim();
    const clientEmail = formData.email.trim();
    const clientPhone = formData.whatsapp.trim();
    const clientService = formData.service;
    const clientDesc = formData.projectDescription.trim();

    const { subject, mailto, gmail } = getFormattedEnquiry(
      clientName,
      clientEmail,
      clientPhone,
      clientService,
      clientDesc
    );

    // If a custom Formspree or Web3Forms backend endpoint is configured in siteConfig
    const hasCustomBackend =
      siteConfig.formspreeEndpoint && siteConfig.formspreeEndpoint.trim().length > 0;

    if (hasCustomBackend) {
      setStatus('submitting');
      setFeedbackMessage('');

      try {
        const response = await fetch(siteConfig.formspreeEndpoint.trim(), {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({
            'Client Name': clientName,
            'Client Email': clientEmail,
            'WhatsApp / Phone': clientPhone || 'Not provided',
            'Service Required': clientService,
            'Project Description': clientDesc,
            _replyto: clientEmail,
            _subject: subject,
          }),
        });

        if (response.ok) {
          setStatus('success');
          setFeedbackMessage(
            `Thank you, ${clientName}! Your project enquiry has been automatically delivered to Sourav Roy at ${siteConfig.contactEmail}. We will review your requirements and respond shortly.`
          );
          setLastSubmittedUrls(null);
          setFormData({
            fullName: '',
            email: '',
            whatsapp: '',
            service: servicesConfig[0]?.title || 'Wedding Film Editing',
            projectDescription: '',
          });
          return;
        }
      } catch {
        // Continue to direct launch fallback
      }
    }

    // Default fast & reliable dispatch:
    // 1. Populates and opens the email client with the full structured table text
    // 2. Shows the green success notification with 1-click Web Gmail and Mail App buttons
    setStatus('success');
    setFeedbackMessage(
      `Thank you, ${clientName}! Your enquiry has been formatted and prepared for ${siteConfig.contactEmail}. Please confirm and send from your email app.`
    );
    setLastSubmittedUrls({ mailto, gmail, clientName });

    // Open user's email client directly
    try {
      window.location.href = mailto;
    } catch {
      // In case browser restricts direct location change, the links inside the success banner remain available
    }

    // Reset form fields
    setFormData({
      fullName: '',
      email: '',
      whatsapp: '',
      service: servicesConfig[0]?.title || 'Wedding Film Editing',
      projectDescription: '',
    });
  };

  return (
    <div className="w-full glass-card rounded-3xl p-6 sm:p-10 border border-white/10 shadow-2xl">
      {/* Success Notification */}
      {status === 'success' && (
        <div className="mb-6 p-5 rounded-2xl bg-emerald-950/50 border border-emerald-500/50 flex items-start gap-3.5 text-sm text-emerald-200">
          <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="font-bold text-white text-base">Enquiry Formatted Successfully!</p>
            <p className="text-emerald-300/90 text-xs sm:text-sm mt-1.5 leading-relaxed">
              {feedbackMessage}
            </p>

            {lastSubmittedUrls && (
              <div className="mt-4 pt-3.5 border-t border-emerald-500/20 flex flex-wrap items-center gap-3">
                <a
                  href={lastSubmittedUrls.gmail}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#BF54A3] to-[#592D4D] text-white font-semibold text-xs sm:text-sm flex items-center gap-2 shadow-lg hover:brightness-110 transition-all cursor-pointer"
                >
                  <Mail className="w-4 h-4" />
                  <span>Send via Web Gmail</span>
                  <ExternalLink className="w-3.5 h-3.5 opacity-80" />
                </a>

                <a
                  href={lastSubmittedUrls.mailto}
                  className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-semibold text-xs sm:text-sm flex items-center gap-2 border border-white/15 transition-colors cursor-pointer"
                >
                  <Mail className="w-4 h-4" />
                  <span>Open in Mail App</span>
                </a>

                <button
                  type="button"
                  onClick={handleWhatsAppSend}
                  className="px-4 py-2.5 rounded-xl bg-emerald-600/90 hover:bg-emerald-600 text-white font-semibold text-xs sm:text-sm flex items-center gap-2 transition-colors cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Also Send on WhatsApp</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Validation Error Notification */}
      {status === 'error' && (
        <div className="mb-6 p-4 rounded-2xl bg-rose-950/40 border border-rose-500/40 flex items-start gap-3 text-sm text-rose-200">
          <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
          <p className="text-xs sm:text-sm leading-relaxed">{feedbackMessage}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {/* Full Name */}
          <div>
            <label
              htmlFor="fullName"
              className="block text-xs font-semibold uppercase tracking-wider text-neutral-300 font-mono mb-2"
            >
              Full Name <span className="text-[#BF54A3]">*</span>
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
            <label
              htmlFor="email"
              className="block text-xs font-semibold uppercase tracking-wider text-neutral-300 font-mono mb-2"
            >
              Email Address <span className="text-[#BF54A3]">*</span>
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
            <label
              htmlFor="whatsapp"
              className="block text-xs font-semibold uppercase tracking-wider text-neutral-300 font-mono mb-2"
            >
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
            <label
              htmlFor="service"
              className="block text-xs font-semibold uppercase tracking-wider text-neutral-300 font-mono mb-2"
            >
              Service Required
            </label>
            <select
              id="service"
              name="service"
              value={formData.service}
              onChange={handleChange}
              className="glass-input text-sm bg-[#192526] text-[#F0F2F2]"
            >
              {servicesConfig.map((s) => (
                <option key={s.id} value={s.title} className="bg-[#192526] text-[#F0F2F2]">
                  {s.title}
                </option>
              ))}
              <option value="Custom Post-Production" className="bg-[#192526] text-[#F0F2F2]">
                Other / Custom Post-Production
              </option>
            </select>
          </div>
        </div>

        {/* Project Description */}
        <div>
          <label
            htmlFor="projectDescription"
            className="block text-xs font-semibold uppercase tracking-wider text-neutral-300 font-mono mb-2"
          >
            Project Description &amp; Requirements <span className="text-[#BF54A3]">*</span>
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
            className="glass-btn-primary w-full sm:w-auto text-sm font-semibold !py-3.5 !px-8 shadow-glow-accent cursor-pointer"
          >
            {status === 'submitting' ? (
              <span className="flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>SENDING ENQUIRY...</span>
              </span>
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
            className="glass-btn-secondary w-full sm:w-auto text-sm font-semibold !py-3.5 !px-6 text-neutral-300 hover:text-white cursor-pointer"
          >
            <MessageSquare className="w-4 h-4 text-[#107361]" />
            <span>Send via WhatsApp</span>
          </button>
        </div>

        {/* Informational micro-copy */}
        <p className="text-[11px] text-neutral-400 font-mono pt-1">
          ✓ Enquiries are formatted and delivered directly to{' '}
          <span className="text-[#BF54A3] font-semibold">{siteConfig.contactEmail}</span>.
        </p>
      </form>
    </div>
  );
};
