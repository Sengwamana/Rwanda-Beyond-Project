import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Check } from 'lucide-react';
import { contentService } from '../services/content';

export const Pricing: React.FC = () => {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['content', 'pricing'],
    queryFn: () => contentService.getPricing(),
    staleTime: 60 * 1000,
  });

  const hero = (data?.data as any)?.hero || {};
  const plans = (data?.data as any)?.plans || [];
  const faq = (data?.data as any)?.faq || [];

  return (
    <div className="bg-background dark:bg-background min-h-screen pt-24 pb-20 animate-fade-in font-sans text-slate-800 dark:text-white transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-4xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary-tint text-primary rounded-md text-xs font-bold uppercase tracking-wider mb-6">
            {hero.badge || 'Pricing'}
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-slate-900 dark:text-white mb-8 leading-[1.1] tracking-tight">
            {hero.title || 'Simple, Transparent Pricing'}
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            {hero.subtitle || 'Choose the plan that fits your farm. All plans include access to the IoT platform, AI insights, and mobile apps.'}
          </p>
        </div>

        {isLoading && <div className="text-center text-muted-foreground mb-8">Loading pricing...</div>}
        {isError && (
          <div className="text-center mb-8">
            <p className="text-danger mb-3">Failed to load pricing content.</p>
            <button onClick={() => refetch()} className="px-4 py-2 rounded-md bg-primary text-white text-sm font-bold">
              Retry
            </button>
          </div>
        )}

        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {plans.map((plan: any, idx: number) => (
            <div key={plan.id || idx} className={`bg-white dark:bg-card rounded-lg p-8 border shadow-sm ${plan.featured ? 'border-primary ring-2 ring-primary/20' : 'border-border'}`}>
              {plan.featured && (
                <span className="inline-block px-3 py-1 bg-primary text-white text-xs font-bold rounded-sm mb-4">Most Popular</span>
              )}
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">{plan.name}</h3>
              <p className="text-muted-foreground mb-6">{plan.description}</p>
              <div className="mb-6">
                <span className="text-4xl font-bold text-slate-900 dark:text-white">{plan.price}</span>
                <span className="text-muted-foreground">/month</span>
              </div>
              <ul className="space-y-3 mb-8">
                {(plan.features || []).map((feature: string, i: number) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Check size={16} className="text-primary shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
              <button className={`w-full py-3 rounded-md font-bold transition-colors ${
                plan.featured
                  ? 'bg-primary text-white hover:bg-primary-hover'
                  : 'bg-white text-primary border border-primary hover:bg-primary/5'
              }`}>
                {plan.button || 'Get Started'}
              </button>
            </div>
          ))}
        </div>

        {faq.length > 0 && (
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-8 text-center">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {faq.map((item: any, idx: number) => (
                <details key={idx} className="bg-white dark:bg-card rounded-lg border border-border p-5 group">
                  <summary className="font-semibold text-slate-900 dark:text-white cursor-pointer list-none flex items-center justify-between">
                    {item.question}
                    <span className="text-muted-foreground group-open:rotate-180 transition-transform">▼</span>
                  </summary>
                  <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{item.answer}</p>
                </details>
              ))}
            </div>
          </div>
        )}

        {!isLoading && !isError && plans.length === 0 && (
          <div className="text-center text-muted-foreground">No pricing content configured yet.</div>
        )}
      </div>
    </div>
  );
};
