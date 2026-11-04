import React, { useState } from 'react';
import { Send, CheckCircle, AlertCircle, MessageSquare, Mail, Info, Loader2 } from 'lucide-react';
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

type SubmissionStatus = 'idle' | 'submitting' | 'success' | 'info' | 'fallback' | 'error';

export const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    whatsapp: '',
    service: servicesConfig[0]?.title || 'Wedding Film Editing',
    projectDescription: '',
  });

  const [status, setStatus] = useState<SubmissionStatus>('idle');
  const [feedbackMessage, setFeedbackMessage] = useState<string>('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  /**
   * Generates a pre-formatted direct mailto URL populated with client and project details.
   */
  const getMailtoUrl = () => {
    const subject = `🎬 [New Project Enquiry] ${formData.service || 'Video Post-Production'} — ${formData.fullName || 'Client'}`;
    const body = 
`ORCHID CREATION STUDIO — PROJECT ENQUIRY
==================================================

CLIENT DETAILS:
• Full Name: ${formData.fullName || 'N/A'}
• Email Address: ${formData.email || 'N/A'}
• WhatsApp / Phone: ${formData.whatsapp || 'Not provided'}
• Service Required: ${formData.service}

PROJECT DESCRIPTION & REQUIREMENTS:
--------------------------------------------------
${formData.projectDescription || 'No description provided.'}
--------------------------------------------------

Submitted via: Orchid Creation Official Website
Recipient: ${siteConfig.contactEmail}
Date: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} (IST)
==================================================`;

    return `mailto:${siteConfig.contactEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
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
      setFeedbackMessage('Please fill in your Full Name, Email Address, and Project Description.');
      return;
    }

    setStatus('submitting');
    setFeedbackMessage('');

    const formattedTimestamp = new Date().toLocaleString('en-IN', {
      dateStyle: 'full',
      timeStyle: 'medium',
      timeZone: 'Asia/Kolkata',
    });

    const emailSubject = `🎬 [New Enquiry] ${formData.service} — ${formData.fullName}`;

    // Endpoint resolution:
    // 1. Web3Forms (if key configured)
    // 2. Custom Formspree endpoint (if configured)
    // 3. FormSubmit zero-config AJAX endpoint direct to ocofficialservice@gmail.com
    let endpoint = '';
    let payload: Record<string, unknown> = {};

    if (siteConfig.web3formsKey && siteConfig.web3formsKey.trim().length > 0) {
      endpoint = 'https://api.web3forms.com/submit';
      payload = {
        access_key: siteConfig.web3formsKey.trim(),
        subject: emailSubject,
        from_name: formData.fullName,
        replyto: formData.email,
        'Client Name': formData.fullName,
        'Client Email': formData.email,
        'WhatsApp / Phone': formData.whatsapp || 'Not provided',
        'Service Required': formData.service,
        'Project Requirements': formData.projectDescription,
        'Submission Timestamp': `${formattedTimestamp} (IST)`,
        'Target Inbox': siteConfig.contactEmail,
      };
    } else if (siteConfig.formspreeEndpoint && siteConfig.formspreeEndpoint.trim().length > 0) {
      endpoint = siteConfig.formspreeEndpoint.trim();
      payload = {
        name: formData.fullName,
        email: formData.email,
        phone: formData.whatsapp || 'Not provided',
        service: formData.service,
        message: formData.projectDescription,
        _subject: emailSubject,
        _replyto: formData.email,
      };
    } else {
      // Default: FormSubmit.co direct to studio email with structured HTML table template
      endpoint = `https://formsubmit.co/ajax/${siteConfig.contactEmail}`;
      payload = {
        'CLIENT NAME': formData.fullName,
        'CLIENT EMAIL': formData.email,
        'WHATSAPP / PHONE': formData.whatsapp || 'Not provided',
        'SERVICE REQUIRED': formData.service,
        'PROJECT DETAILS & REQUIREMENTS': formData.projectDescription,
        'SUBMISSION DATE (IST)': formattedTimestamp,
        'STUDIO RECIPIENT': siteConfig.contactEmail,
        _subject: emailSubject,
        _replyto: formData.email,
        _template: 'table',
        _captcha: 'false',
        _autoresponse: `Hello ${formData.fullName},\n\nThank you for reaching out to Orchid Creation Studio! We have received your project enquiry for "${formData.service}". Sourav Roy will review your requirements and get in touch with you shortly.\n\nWarm regards,\nOrchid Creation Studio\nAshoknagar, Building More, West Bengal\nWhatsApp: +91 89279 16525\nWebsite: https://orchidcreation.in`,
      };
    }

    // AbortController with 7-second timeout to prevent UI hanging if third-party server has high latency
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 7000);

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(payload),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      const data = await response.json().catch(() => ({}));

      // Check success flag
      const isSuccess =
        response.ok &&
        (data.success === 'true' ||
          data.success === true ||
          data.status === 'success' ||
          !('success' in data));

      if (isSuccess) {
        setStatus('success');
        setFeedbackMessage(
          `Thank you, ${formData.fullName}! Your project enquiry has been formatted and emailed directly to Sourav Roy at ${siteConfig.contactEmail}. We will review your details and respond shortly.`
        );
        setFormData({
          fullName: '',
          email: '',
          whatsapp: '',
          service: servicesConfig[0]?.title || 'Wedding Film Editing',
          projectDescription: '',
        });
      } else if (
        data.message &&
        typeof data.message === 'string' &&
        (data.message.toLowerCase().includes('activate') ||
          data.message.toLowerCase().includes('confirm') ||
          data.message.toLowerCase().includes('authorize'))
      ) {
        setStatus('info');
        setFeedbackMessage(
          `Form Activation Required: FormSubmit sent a one-time activation link to ${siteConfig.contactEmail}. Please open Gmail and click "Activate Form" once to complete setup for future automatic submissions.`
        );
      } else {
        throw new Error(data.message || 'Third-party dispatch response was not ok');
      }
    } catch {
      clearTimeout(timeoutId);
      // Fallback: Show friendly banner with instant 1-click Mail App & WhatsApp buttons
      setStatus('fallback');
      setFeedbackMessage(
        `Automated server dispatch is currently experiencing network latency or is blocked by a browser extension. You can send this enquiry directly to ${siteConfig.contactEmail} below:`
      );
    }
  };

  return (
    <div className="w-full glass-card rounded-3xl p-6 sm:p-10 border border-white/10 shadow-2xl">
      {/* Success Notification */}
      {status === 'success' && (
        <div className="mb-6 p-5 rounded-2xl bg-emerald-950/50 border border-emerald-500/50 flex items-start gap-3.5 text-sm text-emerald-200">
          <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="font-bold text-white text-base">Enquiry Sent Successfully!</p>
            <p className="text-emerald-300/90 text-xs sm:text-sm mt-1.5 leading-relaxed">
              {feedbackMessage}
            </p>
            <div className="mt-3 flex flex-wrap gap-2.5">
              <button
                type="button"
                onClick={handleWhatsAppSend}
                className="px-3.5 py-1.5 rounded-lg bg-emerald-600/80 hover:bg-emerald-600 text-white font-semibold text-xs flex items-center gap-1.5 transition-colors"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Also ping on WhatsApp</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Info / Activation Notification */}
      {status === 'info' && (
        <div className="mb-6 p-5 rounded-2xl bg-amber-950/50 border border-amber-500/50 flex items-start gap-3.5 text-sm text-amber-200">
          <Info className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="font-bold text-white text-base">One-Time Activation Needed</p>
            <p className="text-amber-300/90 text-xs sm:text-sm mt-1.5 leading-relaxed">
              {feedbackMessage}
            </p>
          </div>
        </div>
      )}

      {/* Fallback Notification with 1-Click Mailto & WhatsApp */}
      {status === 'fallback' && (
        <div className="mb-6 p-5 rounded-2xl bg-[#592D4D]/40 border border-[#BF54A3]/50 flex flex-col gap-4 text-sm text-[#F0F2F2]">
          <div className="flex items-start gap-3">
            <Mail className="w-5 h-5 text-[#BF54A3] shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-white">Direct Send Options</p>
              <p className="text-xs sm:text-sm text-neutral-300 mt-1 leading-relaxed">
                {feedbackMessage}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-1">
            <a
              href={getMailtoUrl()}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#BF54A3] to-[#592D4D] text-white font-semibold text-xs sm:text-sm flex items-center gap-2 shadow-lg hover:brightness-110 transition-all"
            >
              <Mail className="w-4 h-4" />
              <span>Send via Gmail / Mail App</span>
            </a>

            <button
              type="button"
              onClick={handleWhatsAppSend}
              className="px-4 py-2.5 rounded-xl bg-emerald-600/90 hover:bg-emerald-600 text-white font-semibold text-xs sm:text-sm flex items-center gap-2 transition-colors"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Send via WhatsApp</span>
            </button>
          </div>
        </div>
      )}

      {/* Standard Error Notification */}
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
