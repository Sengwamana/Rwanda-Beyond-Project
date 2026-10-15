import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Wifi, Cpu, Smartphone, CloudRain, Zap, ShieldCheck, Layers, AlertTriangle, RefreshCw } from 'lucide-react';
import { contentService } from '../services/content';

const featureIcons: Record<string, React.ElementType> = {
  wifi: Wifi,
  cpu: Cpu,
  smartphone: Smartphone,
  rain: CloudRain,
  zap: Zap,
  shield: ShieldCheck,
  layers: Layers,
};

export const Features: React.FC = () => {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['content', 'features'],
    queryFn: () => contentService.getFeatures(),
    staleTime: 60 * 1000,
    retry: false,
  });

  const hero = (data?.data as any)?.hero || {};
  const cards = (data?.data as any)?.cards || [];
  const highlights = (data?.data as any)?.highlights || [];
  const integrations = (data?.data as any)?.integrations || [];

  return (
    <div className="bg-background dark:bg-background min-h-screen pt-24 pb-20 animate-fade-in font-sans text-slate-800 dark:text-white transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-4xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary-tint text-primary rounded-md text-xs font-bold uppercase tracking-wider mb-6">
            {hero.badge || 'Technology'}
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-slate-900 dark:text-white mb-8 leading-[1.1] tracking-tight">
            {hero.title || 'Platform Features'}
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            {hero.subtitle || 'Discover how RwandaBeyond combines IoT, AI, and mobile technology to transform farming.'}
          </p>
        </div>

        {isLoading && !isError && (
          <div className="text-center py-16">
            <div className="animate-spin h-8 w-8 border-2 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading features...</p>
          </div>
        )}

        {isError && (
          <div className="text-center py-16">
            <div className="w-16 h-16 bg-danger-tint rounded-md flex items-center justify-center mx-auto mb-4">
              <AlertTriangle className="text-danger" size={32} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Content Server Unavailable</h3>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              The backend server is not running. Start the backend server and click retry to load features.
            </p>
            <button onClick={() => refetch()} className="inline-flex items-center gap-2 px-6 py-2 bg-primary text-white rounded-md font-medium hover:bg-primary-hover transition-colors">
              <RefreshCw size={16} />
              Retry
            </button>
          </div>
        )}

        {!isLoading && !isError && cards.length > 0 && (
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {cards.map((card: any, idx: number) => {
              const iconKey = String(card.icon || '').toLowerCase();
              const Icon = featureIcons[iconKey] || Layers;
              return (
                <div key={card.id || idx} className="bg-white dark:bg-card rounded-lg p-8 border border-border shadow-sm hover:shadow-md transition-all">
                  <div className="w-14 h-14 bg-primary-tint rounded-md flex items-center justify-center text-primary mb-6">
                    <Icon size={28} />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">{card.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{card.description}</p>
                </div>
              );
            })}
          </div>
        )}

        {!isLoading && !isError && highlights.length > 0 && (
          <div className="bg-card dark:bg-card text-slate-900 dark:text-white rounded-lg p-10 mb-12 border border-border">
            <h3 className="text-3xl font-bold mb-6">Highlights</h3>
            <ul className="space-y-3 text-slate-700 dark:text-slate-300">
              {highlights.map((item: string, idx: number) => (
                <li key={idx} className="flex items-center gap-3">
                  <div className="bg-success rounded-sm p-1"><CheckIcon /></div>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {!isLoading && !isError && integrations.length > 0 && (
          <div className="bg-white dark:bg-card rounded-lg p-8 md:p-20 text-center border border-border shadow-sm">
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white mb-8">Integration Network</h2>
            <div className="flex flex-wrap justify-center gap-4 md:gap-8">
              {integrations.map((name: string, idx: number) => (
                <div key={idx} className="h-12 px-6 bg-muted rounded-md flex items-center font-bold text-slate-500 dark:text-slate-300 border border-border">
                  {name}
                </div>
              ))}
            </div>
          </div>
        )}

        {!isLoading && !isError && cards.length === 0 && highlights.length === 0 && integrations.length === 0 && (
          <div className="text-center text-muted-foreground">No feature content configured yet.</div>
        )}
      </div>
    </div>
  );
};

const CheckIcon = () => <span className="text-white text-[10px] font-bold">✓</span>;
