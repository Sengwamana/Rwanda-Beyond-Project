import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { Send, CheckCircle, Calendar, Phone, Mail, MapPin } from 'lucide-react';
import { Language, translations } from '../utils/translations';
import { contentService } from '../services/content';

interface ConsultationProps {
  language: Language;
}

export const Consultation: React.FC<ConsultationProps> = ({ language = 'en' }) => {
  const t = translations[language]?.consultation || {};
  const [form, setForm] = useState({ name: '', email: '', phone: '', topic: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const mutation = useMutation({
    mutationFn: (data: typeof form) => contentService.submitConsultation(data),
    onSuccess: () => setSubmitted(true),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate(form);
  };

  return (
    <div className="bg-background dark:bg-background min-h-screen pt-24 pb-20 animate-fade-in font-sans text-slate-800 dark:text-white transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary-tint text-primary rounded-md text-xs font-bold uppercase tracking-wider mb-6">
            {t.badge || 'Consultation'}
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-slate-900 dark:text-white mb-6 leading-tight tracking-tight">
            {t.title || 'Book a Free Consultation'}
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            {t.subtitle || 'Speak with our agricultural technology experts to learn how RwandaBeyond can transform your farming operations.'}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-6">
            <div className="bg-white dark:bg-card rounded-lg p-6 border border-border shadow-sm">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Get in Touch</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary-tint rounded-md flex items-center justify-center">
                    <Phone className="text-primary" size={18} />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Phone</p>
                    <p className="font-medium">+250 788 123 456</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary-tint rounded-md flex items-center justify-center">
                    <Mail className="text-primary" size={18} />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Email</p>
                    <p className="font-medium">hello@rwandabeyond.rw</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary-tint rounded-md flex items-center justify-center">
                    <MapPin className="text-primary" size={18} />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Field Office</p>
                    <p className="font-medium">Rwamagana District, Eastern Province</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-primary rounded-lg p-6 text-white">
              <h3 className="text-xl font-bold mb-4">What We'll Cover</h3>
              <ul className="space-y-3">
                {[
                  'Your current farming challenges and goals',
                  'How IoT sensors can monitor your specific crops',
                  'AI-powered irrigation and fertilization recommendations',
                  'Pest detection and early warning systems',
                  'Setup process, timeline, and pricing options',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-primary-tint">
                    <CheckCircle size={16} className="shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Form */}
          <div className="bg-white dark:bg-card rounded-lg p-8 border border-border shadow-sm">
            {submitted ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-success-tint rounded-md flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="text-success" size={32} />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Thank You!</h3>
                <p className="text-muted-foreground">We've received your consultation request. Our team will contact you within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Full Name</label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-md border border-border bg-white dark:bg-card text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 transition-colors"
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Email</label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-md border border-border bg-white dark:bg-card text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 transition-colors"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Phone</label>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className="w-full px-4 py-3 rounded-md border border-border bg-white dark:bg-card text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 transition-colors"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Topic</label>
                  <select
                    value={form.topic}
                    onChange={(e) => setForm({ ...form, topic: e.target.value })}
                    className="w-full px-4 py-3 rounded-md border border-border bg-white dark:bg-card text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 transition-colors"
                    required
                  >
                    <option value="">Select a topic...</option>
                    <option value="iot-sensors">IoT Sensor Setup</option>
                    <option value="ai-insights">AI Insights & Recommendations</option>
                    <option value="irrigation">Smart Irrigation</option>
                    <option value="pest-detection">Pest Detection</option>
                    <option value="general">General Inquiry</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Message</label>
                  <textarea
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    rows={4}
                    className="w-full px-4 py-3 rounded-md border border-border bg-white dark:bg-card text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 transition-colors resize-none"
                    placeholder="Tell us about your farm, crops, and what you'd like to achieve..."
                    required
                  />
                </div>
                <button
                  type="submit"
                  disabled={mutation.isPending}
                  className="w-full py-3 bg-primary text-white rounded-md font-bold hover:bg-primary-hover transition-colors flex items-center justify-center gap-2 disabled:opacity-70"
                >
                  {mutation.isPending ? (
                    <span className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full" />
                  ) : (
                    <>
                      <Send size={18} />
                      Request Consultation
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
