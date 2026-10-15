import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Check, AlertTriangle, RefreshCw } from 'lucide-react';
import { contentService } from '../services/content';

export const Pricing: React.FC = () => {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['content', 'pricing'],
    queryFn: () => contentService.getPricing(),
    staleTime: 60 * 1000,
    retry: false,
  });

  const hero = (data?.data as any)?.hero || {};
  const plans = (data?.data as any)?.plans || [];

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

        {isLoading && !isError && (
          <div className="text-center py-16">
            <div className="animate-spin h-8 w-8 border-2 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading pricing plans...</p>
          </div>
        )}

        {isError && (
          <div className="text-center py-16">
            <div className="w-16 h-16 bg-danger-tint rounded-md flex items-center justify-center mx-auto mb-4">
              <AlertTriangle className="text-danger" size={32} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Content Server Unavailable</h3>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              The backend server is not running. Start the backend server and click retry to load pricing information.
            </p>
            <button onClick={() => refetch()} className="inline-flex items-center gap-2 px-6 py-2 bg-primary text-white rounded-md font-medium hover:bg-primary-hover transition-colors">
              <RefreshCw size={16} />
              Retry
            </button>
          </div>
        )}

        {!isLoading && !isError && plans.length > 0 && (
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
                  {plan.cta || 'Get Started'}
                </button>
              </div>
            ))}
          </div>
        )}

        {!isLoading && !isError && plans.length === 0 && (
          <div className="text-center text-muted-foreground">No pricing content configured yet.</div>
        )}
      </div>
    </div>
  );
};
